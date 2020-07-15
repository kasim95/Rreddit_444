// Redux action creators

import * as actionTypes from '../actionTypes'

// Actions for postsReducer
export const fetchPosts = (subreddit, data=null, error=null) => {
    // use middleware here i.e. dispatch actionCreators
    return ({
        type: actionTypes.FETCH_POSTS_REQUEST,
        subreddit: subreddit,
        data: null,
        error: null
    });
};

export const fetchPostsSuccess = (subreddit, data, error=null) => {
    return ({
        type: actionTypes.FETCH_POSTS_SUCCESS,
        subreddit: subreddit,
        data: data,
        error: null
    })
};

export const fetchPostsError = (subreddit, data=null, error) => {
    return ({
        type: actionTypes.FETCH_POSTS_FAILURE,
        subreddit: subreddit,
        data: null,
        error: error
    })
};

// Login Actions (use only if required)
export const logIn = () => ({ type: actionTypes.LOG_IN });
export const logOut =  () => ({ type: actionTypes.LOG_OUT });
