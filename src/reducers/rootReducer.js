import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import subredditReducer from './subredditReducer';
import filterReducer from './filterReducer';
import showSubredditModalReducer from './showSubredditModalReducer';
import loginReducer from './loginReducer';
import numPostsReducer  from './numPostsReducer';
import {combineReducers} from 'redux';

// only passing loggedReducer in ES6 interprets to loggedReducer: loggedReducer

const rootReducer = combineReducers({
    // logged: loggedReducer,
    posts: postsReducer,
    subreddit: subredditReducer,
    filter: filterReducer,
    comments: commentsReducer,
    showSubredditModal: showSubredditModalReducer,
    login: loginReducer,
    numPosts: numPostsReducer
});

export default rootReducer;
