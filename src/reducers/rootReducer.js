import loggedReducer from './loggedReducer'
import counterReducer from './counterReducer'
import postsReducer from './postsReducer'
import {combineReducers} from 'redux'

// only passing loggedReducer in ES6 interprets to loggedReducer: loggedReducer

const rootReducer = combineReducers({
    counter: counterReducer,
    logged: loggedReducer,
    posts: postsReducer
});

export default rootReducer;