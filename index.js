/**
 * @fileoverview Rreddit 444 – Express backend server.
 *
 * Provides REST endpoints for user registration and login, backed by a
 * MongoDB Atlas cluster via Mongoose.  Security hardening is applied with
 * Helmet (HTTP headers) and express-rate-limit (brute-force protection).
 */

const helpers = require('./helpers');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables from .env into process.env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Security middleware
// ---------------------------------------------------------------------------

/**
 * Set secure HTTP response headers (X-Frame-Options, X-Content-Type-Options,
 * Strict-Transport-Security, Content-Security-Policy, etc.).
 */
app.use(helmet());

/**
 * Rate-limit authentication endpoints to reduce brute-force risk.
 * Allows 20 requests per 15-minute window per IP address.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

// ---------------------------------------------------------------------------
// Body-parsing middleware
// ---------------------------------------------------------------------------

/** Parse JSON request bodies (e.g. POST /registerUser, POST /loginUser). */
app.use(express.json());

/** Parse URL-encoded request bodies with extended mode disabled (safer). */
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// Static file serving (React client build)
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'client/build')));

// ---------------------------------------------------------------------------
// Database connection
// ---------------------------------------------------------------------------

/**
 * MongoDB Atlas connection URI built from environment variables.
 * Credentials are never hard-coded; they must be set in a .env file or the
 * host environment.
 */
const uri = `mongodb+srv://${process.env.MDBUSERNAME}:${process.env.MDBPASSWORD}@cluster0.rfkby.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

/**
 * Establishes the Mongoose connection to MongoDB Atlas.
 * Exits the process on a fatal connection error so the container/process
 * manager can restart it rather than serving requests without a database.
 *
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

connectDB();

// ---------------------------------------------------------------------------
// Mongoose schema and model
// ---------------------------------------------------------------------------

const Schema = mongoose.Schema;

/**
 * Mongoose schema for registered users.
 * Email uniqueness is enforced via a sparse index so that users who sign up
 * without an email address are not all treated as duplicates of each other.
 */
const UserSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    username: {
        type: String,
        match: /^[a-zA-Z0-9_-]{1,20}$/
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        match: /[a-zA-Z]/
    },
    lastName: {
        type: String,
        match: /[a-zA-Z]/
    },
    sex: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    birthdate: {
        type: Number,
        default: 0
    },
    redditUsername: {
        type: String
    }
});

/** Mongoose model representing the `users` collection. */
const User = mongoose.model('User', UserSchema);

// ---------------------------------------------------------------------------
// Helper: database existence check
// ---------------------------------------------------------------------------

/**
 * Checks whether a given field/value pair already exists in the database.
 * For `username` and `email`, the value is validated with the corresponding
 * helper before querying.  For other fields a basic non-null guard is applied.
 *
 * @param {string} key   - The document field name to search (e.g. "email").
 * @param {*}      value - The value to look up.
 * @returns {Promise<boolean>} Resolves to true if a matching document exists.
 */
const checkFieldValueExistsDB = (key, value) => {
    let searchQuery = {};

    if (key === 'username') {
        if (value && helpers.checkUsername(value)) {
            searchQuery[key] = value;
        }
    } else if (key === 'email') {
        if (value && helpers.checkEmail(value)) {
            searchQuery[key] = value;
        }
    } else {
        // Generic field: ensure both key and value are present and non-null
        if (key !== null && key !== undefined && value !== null && value !== undefined) {
            searchQuery[key] = value;
        }
    }

    return User.countDocuments(searchQuery)
        .exec()
        .then(count => count > 0)
        .catch(err => {
            console.error('checkFieldValueExistsDB failed:', err.message);
            return false;
        });
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /checkField
 *
 * Checks whether a username or email address is already registered.
 * Accepts a single query parameter: `username` or `email`.
 *
 * @example GET /checkField?username=johndoe
 * @example GET /checkField?email=john@example.com
 *
 * Response 200 – { fieldExists: boolean, searchQuery: object }
 * Response 400 – { error: string } when neither param is provided
 */
app.get('/checkField', async (req, res) => {
    const responseBody = {
        fieldExists: false,
        searchQuery: undefined,
        message: '',
        error: null
    };

    if (req.query.username) {
        responseBody.fieldExists = await checkFieldValueExistsDB('username', req.query.username);
        responseBody.searchQuery = { username: req.query.username };
        return res.status(200).json(responseBody);
    }

    if (req.query.email) {
        responseBody.fieldExists = await checkFieldValueExistsDB('email', req.query.email);
        responseBody.searchQuery = { email: req.query.email };
        return res.status(200).json(responseBody);
    }

    responseBody.error = 'Username or email query parameter is required';
    return res.status(400).json(responseBody);
});

/**
 * POST /registerUser
 *
 * Registers a new user.  The request body must be JSON with at least
 * `username`, `email`, and `password` fields.
 *
 * Business rules enforced:
 *  - Username must be unique
 *  - Email must be unique
 *  - Password is hashed with bcrypt before storage
 *
 * Response 200 – registration successful
 * Response 400 – missing or invalid request body
 * Response 409 – username or email already in use
 * Response 500 – unexpected server/database error
 */
app.post('/registerUser', authLimiter, async (req, res) => {
    const responseBody = {
        message: null,
        isRegistered: false,
        userData: null,
        error: null
    };

    // Guard: request body must be present and non-empty
    if (!req.body || Object.keys(req.body).length === 0) {
        responseBody.error = 'No data provided in request body';
        responseBody.message = 'No data provided in request body';
        return res.status(400).json(responseBody);
    }

    // Validate and extract fields from the request body
    const values = helpers.getUserDataFromReq(req.body);

    // Validate password length separately (password is not stored in values yet)
    if (!helpers.checkPassword(req.body.password)) {
        responseBody.error = `Password must be between ${helpers.PASSWORD_MIN_LENGTH} and ${helpers.PASSWORD_MAX_LENGTH} characters`;
        responseBody.message = responseBody.error;
        return res.status(400).json(responseBody);
    }

    try {
        const [userExists, emailExists] = await Promise.all([
            checkFieldValueExistsDB('username', values.username),
            checkFieldValueExistsDB('email', values.email)
        ]);

        if (userExists) {
            responseBody.message = 'Username already exists';
            responseBody.error = 'Username already exists';
            return res.status(409).json(responseBody);
        }

        if (emailExists) {
            responseBody.message = 'Email already exists';
            responseBody.error = 'Email already exists';
            return res.status(409).json(responseBody);
        }

        // Hash the password before persisting
        values.password = await helpers.encryptPassword(req.body.password);

        const user = new User(values);
        await user.save();

        console.log('User added to database');
        responseBody.isRegistered = true;
        return res.status(200).json(responseBody);
    } catch (err) {
        // Log full error server-side; return a generic message to the client
        console.error('registerUser error:', err.message);
        responseBody.error = 'Registration failed due to a server error';
        responseBody.message = 'Registration failed due to a server error';
        return res.status(500).json(responseBody);
    }
});

/**
 * POST /loginUser
 *
 * Authenticates a user by username and bcrypt password comparison.
 *
 * Request body: { username: string, password: string }
 *
 * Response 200 – { isLogged: true, userData: { username, loggedInTime } }
 * Response 200 – { isLogged: false, message: "..." } on bad credentials
 * Response 400 – missing username or password in request
 * Response 500 – server error
 */
app.post('/loginUser', authLimiter, async (req, res) => {
    const responseBody = {
        message: null,
        error: null,
        isLogged: false,
        userData: null
    };

    // Guard: both username and password are required
    if (!req.body || !req.body.username || !req.body.password) {
        responseBody.message = 'Username and password are required';
        return res.status(400).json(responseBody);
    }

    // Validate username format before querying the database
    const username = helpers.checkUsername(req.body.username) ? req.body.username : null;
    if (!username) {
        responseBody.message = 'Invalid username format';
        return res.status(400).json(responseBody);
    }

    try {
        const userDoc = await User.findOne({ username }).exec();

        if (!userDoc) {
            // Return the same message as a bad password to avoid user enumeration
            responseBody.message = 'Username or password is incorrect';
            return res.status(200).json(responseBody);
        }

        const passwordMatch = await helpers.comparePasswords(req.body.password, userDoc.password);

        if (passwordMatch) {
            const userData = {
                username: userDoc.username,
                loggedInTime: new Date().getTime()
            };
            responseBody.isLogged = true;
            responseBody.message = 'Login successful';
            responseBody.userData = userData;
            return res.status(200).json(responseBody);
        }

        // Intentionally vague to avoid user enumeration
        responseBody.message = 'Username or password is incorrect';
        return res.status(200).json(responseBody);

    } catch (err) {
        // Log full error server-side; never leak DB error details to the client
        console.error('loginUser error:', err.message);
        responseBody.message = 'An error occurred during login';
        return res.status(500).json(responseBody);
    }
});

/**
 * GET /server
 *
 * Health-check endpoint – returns a simple HTML confirmation that the server
 * is running.  Useful for load-balancer and uptime checks.
 */
app.get('/server', (req, res) => {
    console.log('/server endpoint called');
    res.send('<h4>Rreddit 444 server</h4>');
});

/**
 * GET * – Catch-all route that serves the React client's index.html for
 * client-side routing to work correctly in production builds.
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Rreddit 444 server listening on port ${PORT}`);
});

// Export app for integration testing (supertest does not require a live server)
module.exports = app;

