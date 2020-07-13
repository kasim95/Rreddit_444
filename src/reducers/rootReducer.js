import loggedReducer from './loggedReducer'
import counterReducer from './counterReducer'
// import postReducer from './postReducer'
import {combineReducers} from 'redux'

// only passing loggedReducer in ES6 interprets to loggedReducer: loggedReducer

const rootReducer = combineReducers({
    counter: counterReducer,
    logged: loggedReducer
});

export default rootReducer;