import React from 'react';
import './Login.css'
import { TextField } from '@material-ui/core';


const Login = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;
    
    return (
        <form onSubmit={handleSubmit}>
            <div 
            className="
                d-flex 
                flex-row
                justify-content-center
                "
            >
                <div
                className="
                    d-flex
                    flex-column
                    justify-cotent-center
                    w-xs
                    "
                >
                    <div className="m-0 p-1 text-center">
                        <h4>
                            Login page
                        </h4>
                    </div>
                    <div className="m-0 p-2 align-self-center">
                        <TextField
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username}
                        helperText={touched.username && errors.username}
                        variant='outlined'
                        className="w-100"
                        autoComplete="username"
                        />
                    </div>
                    <div className="m-0 p-2 align-self-center">
                        <TextField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Username"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username}
                        helperText={touched.username && errors.username}
                        variant="outlined"
                        className="w-100"
                        autoComplete="password"
                        />
                    </div>
                    <div className="m-0 p-2 align-self-center">
                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-success w-100"
                        >
                            Login
                        </button>
                    </div>
                    <div className="m-0 p-2 text-center">
                        Don't have an account. 
                        <a href="\register" className="p-1">Register</a>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default Login;