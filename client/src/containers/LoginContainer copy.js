import Login from '../components/Login';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../actions';
import axios from 'axios';
import history from './history';
// import { useHistory } from 'react-router-dom';

// FILE NOT USED (JUST HERE FOR LATER CONSIDERATION IF IT BREAKS)

const loginUser = user => {
    return function(dispatch) {
        dispatch(loginRequest(user));
        
        // remove this line later
        dispatch(loginSuccess({}));
        if (1 === 2) {
            dispatch(loginFailure("some error"));
        }
        //

        // construct a post request to nodejs api and 
        // check if user creds are correct or not
        // if correct logins, get userData from api and dispatch loginSuccess
        // axios.get(url).
        // .then(response => {
        // if (response.status >= 200 && response.status <= 299) {
        //     if (response.loginStatus === true) {
        //         dispatch(loginSuccess(response.userData))    
        //     }
        //     else {
        //         dispatch(loginFailure(response.error))
        //     }
        // }
        // })
    }
}


const LoginContainer = withFormik({
    
    // Initialize Login form values
    mapPropsToValues: () => ({
        username: "",
        password: ""
    }),

    // Synchronous Validation
    validate: values => {
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
    },
    
    // handleSubmit code
    handleSubmit: async (values, { props, setSubmitting }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setSubmitting(false);
        props.dispatch(loginUser(values));
        // call this code using a middleware
        axios.post('/loginUser', values)
        .then(res=> {
            if (res.data && res.data.status === 200) {
                console.log("Login User success ", res);
                
            }
            else {
                console.log("Login user authentication failure");
            }            
        })
        .catch(err => {
            console.error("Login user failed ", err);
        })
        //

        // route to homepage
        history.push('/');
        
        console.log("Login form submitted ", values)
    },

    displayName: "LoginForm"

})(Login);

export default connect()(LoginContainer);
