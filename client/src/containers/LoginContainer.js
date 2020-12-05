import React from 'react';
import Login from '../components/Login';
import { Formik } from 'formik';
import { connect } from 'react-redux';
// import { loginRequest, loginSuccess, loginFailure } from '../actions';
// import axios from 'axios';
// import history from './history';
// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../middleware';

const LoginContainer = props => (
    <Formik
    initialValues={{
        username: "",
        password: ""
    }}
    validate={values => {
        const errors = {}
        
        // username
        if (!values.username) {
            errors.username = "Username not entered";
        }
        else if (values.username.length > 20) {
            errors.username = "Username cannot be more than 20 characters"
        }

        // password
        if (!values.password) {
            errors.password = "Password missing";
        }

        return errors;
    }}
    onSubmit={
        async (values, { setSubmitting }) => {
            props.dispatchLoginUser(values);
            
            setSubmitting(false);
            console.log("Login form submitted ", values)
        }
    }
    >
        <div>
        <Login />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
