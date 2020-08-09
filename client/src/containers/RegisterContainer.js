import React from 'react';
import Register from '../components/Register';
import axios from 'axios';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { loginUser } from '../middleware';
import { Redirect } from 'react-router-dom';

const RegisterContainer = props => (

    <Formik
    initialValues={{
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        sex: "",
        redditUsername: ""
    }}
    validate={async values => {
        const errors = {};
        
        // required fields
        const requiredFields = [
            'username',
            'password',
            'email',
            'firstName',
            'lastName',
            'birthdate'
        ]
        requiredFields.forEach(field => {
            if (!values[field]) {
                errors[field] = 'Required';
            }
        })
    
        // username
        if (values.username && values.username.length > 20) {
            errors.username = "Username must be maximum 20 characters";
        }
        else if (values.username) {
            
            const usernameResponse = await axios.get(`/checkField?username=${values.username}`)
            // console.log("Username validation response", usernameResponse)
            if (usernameResponse.status=== 200 && usernameResponse.data && usernameResponse.data.fieldExists) {
                console.log("I am here");
                errors.username = `${values.username} is already taken`;
            }    
        }
        
        // password
        if (values.password && values.password.length < 8 && values.password.length > 16) {
            errors.password = "Password must be between 8 and 16 characters in length";
        }
    
        // email address
        if (values.email && ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";    
        }
        else if (values.email) {
            
            // to use promise, use callback before axios.get with errors as argument to update errors and return it at the end
            const emailResponse = await axios.get(`/checkField?email=${values.email}`);
            // console.log("Email Validation Response", emailResponse)
            if (emailResponse.status === 200 && emailResponse.data && emailResponse.data.fieldExists) {
                errors.email = `An account already exists with the email ${values.email}`;
            }
            
        }
        
        return errors;
    }}
    onSubmit = {async (values, { setSubmitting }) => { 
        // save to mongodb
        axios.post('/registerUser', values)
        .then(response=> {
            console.log("Register User success ", response);
            props.dispatchLoginUser({
                "username": values.username,
                "password": values.password
            })
            console.log("Logged in after Registration");
        })
        .catch(error => {
            console.error("Register user failed ", error);
        })

        setSubmitting(false);
        console.log("Register form submmitted ", values)
    }}
    >
        <div>
            <Register></Register>
            {props.loginInfo.isLogged ? <Redirect push to="/" /> : null}
        </div>
    </Formik>
)

const mapStateToProps = state => ({
    loginInfo: state.login
})

const mapDispatchToProps = dispatch => ({
    dispatchLoginUser: values => dispatch(loginUser(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
