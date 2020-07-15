import loggedReducer from './loggedReducer'
import postsReducer from './postsReducer'
import subredditReducer from './subredditReducer'
import filterReducer from './filterReducer'
import {combineReducers} from 'redux'

// only passing loggedReducer in ES6 interprets to loggedReducer: loggedReducer

const rootReducer = combineReducers({
    logged: loggedReducer,
    posts: postsReducer,
    subreddit: subredditReducer,
    filter: filterReducer
});

export default rootReducer;
