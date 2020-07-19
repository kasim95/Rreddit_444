// Redux action creators
import * as actionTypes from '../actionTypes';

// Actions for postsReducer
export const fetchPostsRequest = () => {
    return ({
        type: actionTypes.FETCH_POSTS_REQUEST
    })
};

export const fetchPostsSuccess = (data) => {
    return ({
        type: actionTypes.FETCH_POSTS_SUCCESS,
        data
    })
};

export const fetchPostsFailure = (error) => {
    return ({
        type: actionTypes.FETCH_POSTS_FAILURE,
        error
    })
};

// Actions for commentReducer
export const fetchCommentsRequest = (postId) => {
    return ({
        type: actionTypes.FETCH_COMMENTS_REQUEST,
        postId
    })
}

export const fetchCommentsSuccess = (postId, commentData) => {
    return ({
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        postId,
        commentData
    })
}

export const fetchCommentsFailure = (postId, error) => {
    return ({
        type: actionTypes.FETCH_COMMENTS_FAILURE,
        postId,
        error
    })
}

// Login Actions (use only if required)
export const logIn = () => ({ type: actionTypes.LOG_IN });
export const logOut =  () => ({ type: actionTypes.LOG_OUT });
