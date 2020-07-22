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

// Filter Actions
export const filterBest = () => {
    return ({
        type: actionTypes.FILTER_BEST,
        filter: "best"
    })
}

export const filterHot = () => {
    return ({
        type: actionTypes.FILTER_HOT,
        filter: "hot"
    })
}

export const filterNew = () => {
    return ({ 
        type: actionTypes.FILTER_NEW,
        filter: "new"
    })
};

export const filterTop = () => {
    return ({
        type: actionTypes.FILTER_TOP,
        filter: "top"

    })
}
