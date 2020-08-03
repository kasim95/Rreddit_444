import React from 'react';
import Register from '../components/Register';
import axios from 'axios';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { loginUser } from '../middleware';
import { Redirect } from 'react-router-dom';
// change this to loginUser

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
                errors[field] = 'Required'
            }
        })
    
        // username
        if (values.username && values.username.length > 20) {
            errors.username = "Username must be maximum 20 characters";
        }
        else if (values.username) {
            
            // // old username validation (same error as this one)
            // const usernameResponse = await axios.get(`/checkField?username=${values.username}`)
            // if (usernameResponse.data && usernameResponse.data.fieldExists) {
            //     errors.username = `${values.username} is already taken`;
            // }

            axios.get(`/checkField?username=${values.username}`)
            .then(response => {
                console.log("Username validation response", response);
                if (response.data && response.data.fieldExists) {
                    errors.username = `${values.username} is already taken`;
                }
            })
            .catch(error => console.log("Email validation error", error))
    
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
            
            // // old validation (this didnt work too)
            // const emailResponse = await axios.get(`/checkField?email=${values.email}`);
            // console.log(emailResponse)
            // if (emailResponse.data && emailResponse.data.fieldExists) {
            //     errors.email = `An account already exists with the email ${values.email}`;
            // }
            //

            axios.get(`/checkField?email=${values.email}`)
            .then(response => {
                console.log("Email validation response", response);
                if (response.data && response.data.fieldExists) {
                    errors.email = `An account already exists with the email ${values.email}`;
                }
            })
            .catch(error => console.log("Email validation error", error))
        }
        
        // add code here for asyncValidation
        return errors;
    }}
    onSubmit = {async (values, { setSubmitting }) => {
        //await new Promise(resolve => setTimeout(resolve, 500));
        
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
