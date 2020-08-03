import React from 'react';
import { connect, getIn } from 'formik';
import { Link } from 'react-router-dom';

import {
    TextField,
    FormControl, 
    FormControlLabel, 
    Radio, 
    RadioGroup
} from '@material-ui/core';

const Register = props => {
    /*
    const {
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;
    */
    const values = getIn(props.formik.values);
    const touched = getIn(props.formik.values);
    const errors = getIn(props.formik.dirty);
    const dirty = getIn(props.formik.dirty);
    const isSubmitting = getIn(props.formik.isSubmitting);
    const handleChange = getIn(props.formik.handleChange);
    const handleBlur = getIn(props.formik.handleBlur);
    const handleSubmit = getIn(props.formik.handleSubmit);
    const handleReset = getIn(props.formik.handleReset);
    // const dispatch = getIn(props.formik.dispatch);

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row justify-content-center">
                <div 
                className="
                    col-xs-5
                    d-flex 
                    justify-content-center 
                    flex-column 
                    m-5
                    border 
                    border-dark 
                    rounded
                    w-xs
                    "
                >
                    <div className="col-xs-12 m-0 p-1 text-center">
                        <h4>
                            Sign up
                        </h4>
                    </div>

                    <div className="col-xs-12 m-0 p-2">
                        {/* Email */}
                        <TextField
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="abc@xyz.com"
                        error={touched.email}
                        helperText={touched.email && errors.email}
                        className="w-100"
                        variant="filled"
                        autoComplete="email"
                        />
                    </div>
                    
                    <div className="row m-0">
                        <div className="col-xs-12 col-sm-6 p-2">
                            {/* Username */}
                            <TextField
                            label="Username"
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Upto 20 characters"
                            error={touched.username}
                            helperText={touched.username && errors.username}
                            variant="filled"
                            className="w-100"
                            color="secondary"
                            autoComplete="username"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 p-2">
                            {/* Password */}
                            <TextField
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder=""
                            error={touched.password}
                            helperText={touched.password && errors.password}
                            variant="filled"
                            className="w-100"
                            autoComplete="password"
                            />
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-xs-12 col-sm-6 p-2" >
                            {/* First Name */}
                            <TextField
                            label="First Name"
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder="John"
                            error={touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                            className="w-100"
                            variant="filled"
                            autoComplete="given-name"
                            />
                        </div>
                        <div  className="col-xs-12 col-sm-6 p-2">
                            {/* Last Name */}
                            <TextField
                            label="Last Name"
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder="Smith"
                            error={touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                            className="w-100"
                            variant="filled"
                            autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div className="row align-self-center m-0">
                        <div className="col-xs-12 col-sm-4 p-2 align-self-center">
                            {/* Birthdate */}
                            <div className="">
                                    BirthDate
                            </div>
                            <div>
                                <TextField
                                label=""
                                type="date"
                                name="birthdate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.birthdate}
                                placeholder="Birthdate"
                                error={touched.birthdate}
                                helperText={touched.birthdate && errors.birthdate}
                                className="w-100"
                                variant="filled"
                                autoComplete="bday"
                                />                    
                            </div>
                        </div>

                        {/* Sex */}
                        <div className="col-xs-12 col-sm-1 align-self-center p-2 pl-4">
                            Sex
                        </div>

                        <div className="col-xs-12 col-sm-2 align-self-end p-2">
                            <FormControl name="sex">
                                <RadioGroup 
                                className="d-flex flex-row"
                                >
                                    <FormControlLabel 
                                    control={
                                        <Radio
                                        name="sex" 
                                        value="male"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="sex"
                                        />
                                    }
                                    label="Male"
                                    labelPlacement="end"
                                    className="m-0 p-0"
                                    />
                                    <FormControlLabel 
                                    control={
                                        <Radio
                                        name="sex"
                                        value="female"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="sex"
                                        />
                                    }
                                    label="Female"
                                    labelPlacement="end"
                                    className="m-0 p-0"
                                    />
                                    <FormControlLabel 
                                    control={
                                        <Radio
                                        name="sex"
                                        value="other"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="sex"
                                        />
                                    }
                                    label="Other"
                                    labelPlacement="end"
                                    className="m-0 p-0"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="col-xs-12 col-sm-5 align-self-center p-2">
                            {/* Reddit Username */}
                            <TextField
                            label="Reddit Username"
                            type="text"
                            name="redditUsername"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.redditUsername}
                            placeholder="Optional"
                            error={touched.redditUsername}
                            helperText={touched.redditUsername && errors.redditUsername}
                            className="w-100"
                            variant="filled"
                            />                    
                        </div>
                    </div>

                    <div className="row justify-content-center m-0">                            
                        <div className="col-xs-12 col-sm-6 p-2">
                            {/* Submit Button */}

                            <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-danger w-100"
                            >
                                Sign Up
                            </button>
                        </div>
                        
                        <div className="col-xs-12 col-sm-6 p-2">
                        {/* Clear Button */}
                        <button
                        type="button"
                        disabled={!dirty || isSubmitting}
                        onClick={handleReset}
                        className="btn btn-info w-100"
                        >
                            Clear
                        </button>
                        </div>
                    </div>
                    <div className="row justify-content-end m-0 p-2">                            
                    Already have an account?<Link href="/login" className="pl-1">Log In</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

// this is formik connect and not react-redux connect
export default connect(Register);