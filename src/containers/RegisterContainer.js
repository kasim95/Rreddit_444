import { withFormik } from 'formik';
import Register from '../components/Register';
import axios from 'axios';
import history from './history';

const RegisterContainer = withFormik({
    
    // Initialize values for form fields
    mapPropsToValues: () => ({ 
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        sex: "",
        redditUsername: ""
    }),

    // Form Validation
    validate: values => {
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

        // password
        if (values.password && values.password.length < 8 && values.password.length > 16) {
            errors.password = "Password must be between 8 and 16 characters in length";
        }
    
        // email address
        if (values.email && ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";    
        }
    
        // add code here for asyncValidation
        return errors;
    },
    
    // handleSubmit code
    handleSubmit: async (values, { setSubmitting }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setSubmitting(false);
        
        // save to mongodb
        axios.post('/registerUser', values)
        .then(response=> {
            console.log("Register User success ", response);
        })
        .catch(error => {
            console.error("Register user failed ", error);
        })

        console.log("Register form submmitted ", values)
        
        // route to homepage
        history.push('/');
        // dispatch fetchposts here to rerender Subreddit component (mimic ComponentDidUpdate)
    },
    
    displayName: "RegisterForm"
})(Register)

export default RegisterContainer;
