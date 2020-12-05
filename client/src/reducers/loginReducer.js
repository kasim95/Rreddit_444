import * as actionTypes from '../actionTypes';

let user = JSON.parse(localStorage.getItem('user'));

const initialLoginState = user ? { 
    isLogging: false,
    isLogged: false,
    error: null,
    user,
    userData: null
} :
{}

const loginReducer = (state=initialLoginState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return ({
                isLogging: true,
                isLogged: false,
                user: action.user,
                userData: null
            })
        case actionTypes.LOGIN_SUCCESS:
            return ({
                isLogging: false,
                isLogged: true,
                userData: action.userData
            })
        case actionTypes.LOGIN_FAILURE:
            return ({
                isLogging: false,
                isLogged: false,
                error: action.error
            })
        case actionTypes.LOGOUT:
            return ({
                isLogging: false,
                isLogged: false,
                user: null,
                userData: null
            })
        default:
            return state;
    }
}

export default loginReducer;
