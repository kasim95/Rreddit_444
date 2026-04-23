/**
 * @fileoverview Utility helpers for authentication, validation, and user data
 * extraction used by the Rreddit 444 backend server.
 */

const bcrypt = require('bcrypt');

/** Number of bcrypt salt rounds. Higher values increase security but slow hashing. */
const SALT_ROUNDS = 10;

/** Minimum allowed password length in characters. */
const PASSWORD_MIN_LENGTH = 8;
/**
 * Maximum allowed password length.
 * bcrypt silently truncates input at 72 bytes.  This check is character-based;
 * passwords with multi-byte UTF-8 characters may be truncated at fewer than
 * 72 characters.  72 is a safe conservative upper bound for ASCII passwords.
 */
const PASSWORD_MAX_LENGTH = 72;

/** Maximum allowed username length. */
const USERNAME_MAX_LENGTH = 20;

/**
 * Hashes a plain-text password using bcrypt.
 *
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} A promise that resolves to the bcrypt hash.
 * @throws {Error} If bcrypt hashing fails.
 */
const encryptPassword = async password => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain-text password against a stored bcrypt hash.
 *
 * @param {string} plainPassword - The plain-text password provided by the user.
 * @param {string} hash - The stored bcrypt hash to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if they match.
 * @throws {Error} If bcrypt comparison fails.
 */
const comparePasswords = async (plainPassword, hash) => {
    return bcrypt.compare(plainPassword, hash);
};

/**
 * Validates an email address format using a standard RFC-style regex.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const checkEmail = email => {
    if (email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }
    return false;
};

/**
 * Validates a username: must be non-empty and at most USERNAME_MAX_LENGTH characters.
 *
 * @param {string} username - The username string to validate.
 * @returns {boolean} True if the username is valid, false otherwise.
 */
const checkUsername = username => {
    if (username && typeof username === 'string' && username.length <= USERNAME_MAX_LENGTH) {
        return true;
    }
    return false;
};

/**
 * Validates a plain-text password length (between PASSWORD_MIN_LENGTH and PASSWORD_MAX_LENGTH).
 *
 * @param {string} password - The plain-text password to validate.
 * @returns {boolean} True if the password length is valid, false otherwise.
 */
const checkPassword = password => {
    if (
        password &&
        typeof password === 'string' &&
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH
    ) {
        return true;
    }
    return false;
};

/**
 * Extracts and validates user registration fields from a request body object.
 * Returns null if no values are provided.
 *
 * @param {Object} values - The raw request body from a registration POST request.
 * @param {string} [values.email] - User's email address.
 * @param {string} [values.username] - Desired username (max 20 characters).
 * @param {string} [values.password] - Plain-text password.
 * @param {string} [values.firstName] - User's first name.
 * @param {string} [values.lastName] - User's last name.
 * @param {string} [values.birthdate] - Birthdate string parseable by Date constructor.
 * @param {string} [values.sex] - Gender: "male", "female", or "other".
 * @param {string} [values.redditUsername] - Optional Reddit username.
 * @returns {Object|null} Validated user data object, or null if values is falsy.
 */
const getUserDataFromReq = values => {
    if (!values) {
        return null;
    }

    let result = {};

    // Validate and assign email
    result.email = checkEmail(values.email) ? values.email : null;

    // Validate and assign username
    result.username = checkUsername(values.username) ? values.username : null;

    // Convert birthdate string to Unix timestamp in milliseconds
    if (values.birthdate) {
        result.birthdate = new Date(values.birthdate).getTime();
    }

    // Only accept recognised sex values (fix: "femmale" → "female")
    if (values.sex && ['male', 'female', 'other'].includes(values.sex)) {
        result.sex = values.sex;
    }

    // Copy remaining optional fields as-is (undefined when absent)
    const otherFields = ['password', 'firstName', 'lastName', 'redditUsername'];
    otherFields.forEach(key => {
        result[key] = values[key] ? values[key] : undefined;
    });

    return result;
};

module.exports = {
    encryptPassword,
    comparePasswords,
    checkEmail,
    checkUsername,
    checkPassword,
    getUserDataFromReq,
    // Expose constants for use in tests and server validation
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    USERNAME_MAX_LENGTH
};
