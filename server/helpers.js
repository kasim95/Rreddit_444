// hash passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;
const encryptPassword = async password => {
    // use bcrypt here to hash passwords
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            // console.log(hash);
            resolve(hash);
        })
    })
    return hashedPassword;
}

const comparePasswords = async (plainPassword, hash) => {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hash, (err, result) => {
            if (err) reject(err)
            resolve(result);
        })
    })
    return result;
}

// helper to check sanity of email
const checkEmail = email => {
    if (email &&/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }
    return false;
}

const checkUsername = username => {
    if (username && username.length <= 20) {
        return true;
    }
    return false;
}

// helper function to validate and return User Data for register req
const getUserDataFromReq = values => {
    let result = {};
    if (values) {
        // email
        result.email = checkEmail(values.email) ? values.email : null;

        // username
        result.username = checkUsername(values.username) ? values.username : null;

        // birthdate
        //if (values.birthdate && values.birthdate.length != 10) {
        if (values.birthdate) {
        result.birthdate = new Date(values.birthdate).getTime();
        }

        // sex
        if (values.sex && ["male", "femmale", "other"].includes(values.sex)) {
            result.sex = values.sex;
        }

        const otherFields = [
            "password",
            "firstName",
            "lastName",
            "redditUsername"
        ]
        otherFields.forEach(key => {
            result[key] = values[key] ? values[key] : undefined;
        })
        console.log(result)
        return result;
    }
}

exports.encryptPassword = encryptPassword;
exports.comparePasswords = comparePasswords;
exports.checkEmail = checkEmail;
exports.checkUsername = checkUsername;
exports.getUserDataFromReq = getUserDataFromReq;
