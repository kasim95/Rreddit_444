const helpers = require('./helpers');
const express = require('express');
const mongoose = require('mongoose');

// Add .env variables in process.env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;


// parse incoming Post Request Object as Json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configure MongoDB database connection
// Using MongoDB Atlas Cloud Service with Cluster on AWS for NoSQL database
const uri = `mongodb+srv://${process.env.MDBUSERNAME}:${process.env.MDBPASSWORD}@cluster0.rfkby.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
    await mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to MDB");
        }    
    )
    .catch(err => {
        console.log("MDB Connection failed")
    })
}
connectDB();
const Schema = mongoose.Schema;

// user model
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
        match: /[a-zA-Z0-9]/
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
        type: String
    },
    birthdate: {
        type: Number,
        default: 0
    },
    redditUsername: {
        type: String
    }
})
const User = mongoose.model('User', UserSchema);

// helper to check if a field value exists in db 
// suggested to use only for fields with index
const checkFieldValueExistsDB = (key, value) => {
    let searchQuery = {};
    if (key === "username") {
        if (value && helpers.checkUsername(value)) {
            searchQuery[key] = value;
        }
    }
    else if  (key === "email") {
        if (value && helpers.checkEmail(value)) {
            searchQuery[key] = value;
        }
    }
    else {
        if (
            key !== null && 
            typeof(key) !== undefined && 
            value !== null &&
            typeof(value) !== undefined
            ) {
            searchQuery[key] = value;
        }
    }
    return User.countDocuments(searchQuery)
    .exec()
    .then(count => {
        if (count && count > 0) {
            return true;
        }
        return false;
    })
    .catch(err => {
        console.log('checkFieldValueExistsDB failed', err);
        // throw new Error("checkFieldValueExistsDB failed")
        return false;
    })
}

// route to check if field value (Username or email) exists
app.get('/checkField', async (req, res) => {
    let responseBody = {
        "fieldExists": false,
        "searchQuery": undefined,
        "numUsersFound": 0,
        "message": "",
        "error": null
    }
    let searchQuery = {};
    if (req.query.username) {
        responseBody["fieldExists"] = await checkFieldValueExistsDB("username", req.query.username)
        searchQuery.username = req.query.username;
        responseBody["searchQuery"] = searchQuery;
        res.status(200).send(responseBody);
    }
    else if (req.query.email) {
        responseBody["fieldExists"] = await checkFieldValueExistsDB("email", req.query.email)
        searchQuery.email = req.query.email;
        responseBody["searchQuery"] = searchQuery;
        res.status(200).send(responseBody);
    }
    else {
        responseBody["error"] = "Username/Email not found"
        res.status(404).send(responseBody);
    }
})

// route to register user
app.post('/registerUser', async (req, res) => {
    let responseBody = {
        "message": null,
        "isRegistered": false,
        "userData": null,
        "error": null
    };

    if (!req.body) {
        responseBody["error"] = "No data in /registerUser Post Request";
        responseBody["message"] = "No data in /registerUser Post Request";
        res.status(404).send(responseBody);
    }
    
    // validate and get values from Post Request Body
    let values = helpers.getUserDataFromReq(req.body);
    
    const userExists = await checkFieldValueExistsDB(key="username", value=values.username);
    console.log("userExists ", userExists);
    
    const emailExists = await checkFieldValueExistsDB(key="email", value=values.email);
    console.log("emailExists ", emailExists);
            
    if (typeof(userExists) === Boolean && userExists) {
        console.log("User Promise exists");
        responseBody["message"] = "Username already exists";
        responseBody["error"] = "Username already exists";
        res.status(409).send(responseBody);
    }
    else if (typeof(emailExists) === Boolean && emailExists) {
        console.log("Email Promise exists");
        responseBody["message"] = "Email already exists";
        responseBody["error"] = "Email already exists";
        res.status(409).send(responseBody);
    }
    else if (!userExists && !emailExists) {
        console.log("Adding user to db");

        const userPassword = await helpers.encryptPassword(req.body.password);
        values.password = userPassword;
        const user = new User(values);
        console.log("User instance: ", user);
        await user.save(err => {
            if (err) console.log("User save failed ", err);
        });
        console.log("Used added to db");
        res.status(200).send();
    }
    else {
        console.log("nothing called");
    }
})

// route to login user
app.post('/loginUser', async (req, res) => {
    // responseBody
    let responseBody = {
        "message": null,
        "error": null,
        "isLogged": null,
        "userData": null
    }
    
    // base case
    if (!req.body || !req.body.username || !req.body.password) {
        responseBody["message"] = "Username/Password not found";
        res.status(404).send(responseBody);
    }
    // check sanity of login info and authenticate
    let loginInfo = {};
    loginInfo.username = helpers.checkUsername(req.body.username) ? req.body.username : null;
    
    // plain password is compared in bcrypt.compare
    loginInfo.password = req.body.password;
    
    const searchQuery = {
        "username": loginInfo.username
    }
    console.log("Login searchQuery ", searchQuery)
    await User.findOne(searchQuery)
    .then(async value => {
        console.log("Login success ", value);
        const comparison = await helpers.comparePasswords(loginInfo.password, value.password);
        console.log("Password comparison result", comparison)
        responseBody["isLogged"] = comparison;
        if (comparison) {
            const userData = {
                username: value.username,
                loggedInTime: new Date().getTime()
            }
            responseBody["message"] = "Username / Password matched";
            responseBody["userData"] = userData;
            res.status(200).send(responseBody);
        }
        else {
            responseBody["message"] = "Username & Password did not match";
            res.status(200).send(responseBody);
        }
    })
    .catch(err => {
        console.log("Login error ", err)
        responseBody["error"] = err;
        responseBody["message"] = "Some error occured";
        res.status(404).send(responseBody);
    })
})

// test if server is working
app.get('/server', (req, res) => {
    res.send("<h4>Rreddit 444 server</h4>");
    console.log("/server endpoint called")
})


// // copy build and uncomment in prod
// // Serve the client build
// app.use(express.static( __dirname + "/build"));
// app.get("*", function(req, res){
//   res.sendFile(__dirname + "/build/index.html");
// });


// listen on port
app.listen(4000, () => {
    console.log(`Rreddit 444 server listening on Port ${PORT}`)
})