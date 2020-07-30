// RegisterContainer using Redux-form (discarded)

import React from 'react';
import './RegisterContainer.css';
import { Form, Field, reduxForm } from 'redux-form';
import {
    TextField, 
    FormControl, 
    FormControlLabel, 
    Radio, 
    RadioGroup
} from '@material-ui/core';


// Synchronous Form Validation for Client Side Validation
const validate = values => {
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

    // email address
    if (values.email && ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";    
    }

    return errors;
}


// Asynchronours form validation for Server side validation
// write code to fetch from node js api if this email exits, same if username is taken or not
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const asyncValidate = (values) => {
    return sleep(1000).then(
        () => {
            if (["abc@xyz.com", "foo@foo.com", "bar@bar.com"].includes(values.email)) {
                // eslint-disable-next-line no-throw-literal
                throw { email: "Email already exists" };
            }
            if (["john123", "paul"].includes(values.username)) {
                // eslint-disable-next-line no-throw-literal
                throw { username: 'Username is taken' };
            }
        }
    )
}

// Submit Validation during after submit key is clicked
// const submitValidate = values => {
//     return sleep(100).then(() => {
//         let errors = 
//     }
    
//     )
// }

// Renders for Redux-form Field component
const renderTextField = ({
    input, 
    label, 
    type,
    className,
    meta: { touched, invalid, error  }, 
    ...custom
}) => (
    <TextField
    label={label}
    type={type}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    className={className}
    />
)

const renderRadioField = ({
    input,
    className,
    ...rest
}) => (
    <FormControl>
        <RadioGroup {...input} {...rest} className="d-flex flex-row">
            <FormControlLabel 
            value="male"
            control={<Radio />}
            label="Male"
            className={className}
            />
            <FormControlLabel 
            value="female"
            control={<Radio />}
            label="Female"
            className={className}
            />
            <FormControlLabel 
            value="other"
            control={<Radio />}
            label="Other"
            className={className}
            />
        </RadioGroup>
    </FormControl>
)

const RegisterContainer = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    
    const submit = event => {
        console.log('Register Submit clicked');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="
                justify-content-center
                align-items-center
                rounded border 
                bg-light 
                d-flex 
                flex-column 
                justify-content-center
                "
            >

                {/* Page Title */}
                <div className="registerField ">
                    <h4>Register Account</h4>
                </div>
                
                {/* Username */}
                <div className="registerField">
                    <Field
                    name="username"
                    component={renderTextField}
                    type="text"
                    label="Username"
                    className="ml-1 mr-1"
                    />
                </div>

                {/* Password */}
                <div className="registerField">
                    <Field
                    name="password"
                    component={renderTextField}
                    type="password"
                    label="Password"
                    className="ml-1 mr-1"
                    />
                </div>

                {/* Email */}
                <div className="registerField">
                    <Field 
                    name="email" 
                    component={renderTextField}
                    type="email"
                    label="Email address"
                    className="ml-1 mr-1"
                    />
                </div>

                
                <div className="registerField d-flex flex-row">
                    <div>
                        {/* First Name */}
                        <Field
                        name="firstName"
                        component={renderTextField}
                        type="text"
                        label="First Name"
                        className="ml-1 mr-1"
                        />
                    </div>
                    <div>
                        {"  "}
                    </div>
                    <div>
                        {/* Last Name */}
                        <Field 
                        name="lastName" 
                        component={renderTextField}
                        type="text"
                        label="Last Name"
                        className="ml-1 mr-1"
                        />
                    </div>
                </div>

                {/* BirthDate */}
                <div className="registerField">
                    <Field
                    name="birthDate"
                    label="Birthday"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    component={renderTextField}
                    />
                
                </div>

                {/* Sex */}
                <div className="registerField">
                    <label>Sex</label><br />
                    <div className="d-flex flex-row">
                        <Field
                        name="sex"
                        component={renderRadioField}
                        className="ml-1 mr-1"
                        />
                    </div>
                </div>

                {/* Form Buttons */}
                <div className="d-flex flex-row justify-content-center">
                    
                    {/* Submit */}
                    <button 
                    className="btn btn-danger m-2 w-50"
                    type="button" 
                    disabled={submitting}
                    onClick={submit}
                    >
                        Submit
                    </button>
                    
                    {/* Clear */}
                    <button 
                    className="btn btn-info m-2 w-50"
                    type="button" 
                    disabled={pristine || submitting} 
                    onClick={reset}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </Form>
    )
}

export default reduxForm(
        {
            form: 'register',
            validate,
            asyncValidate,
            asyncChangeFields: ['email', 'username']
        }
    )
    (RegisterContainer);
