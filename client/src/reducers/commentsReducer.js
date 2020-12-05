import * as actionTypes from '../actionTypes';

const commentsReducer = (state={}, action) => {
    let postComments;
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS_REQUEST:
            postComments = {}
            postComments[action.postId] = {
                commentData: [],
                error: null,
                isLoading: true
            }
            return Object.assign({}, state, postComments)
        
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            postComments = {}
            postComments[action.postId] = {
                commentData: action.commentData,
                error: null,
                isLoading: false
            }
            return Object.assign({}, state, postComments)
        
        case actionTypes.FETCH_COMMENTS_FAILURE:
            postComments = {}
            postComments[action.postId] = {
                commentData: [],
                error: action.error,
                isLoading: false
            }
            return Object.assign({}, state, postComments)
        
        default:
            return state;
    }
}

export default commentsReducer;
