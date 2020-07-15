import * as actionTypes from '../actionTypes'

const postsReducer = (state={data: {}}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_REQUEST:
            return {
                data: {},
                error: null,
                isLoading: true
            }
        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                data: action.data,
                error: null,
                isLoading: false
            }
        case actionTypes.FETCH_POSTS_FAILURE:
            return {
                data: {},
                error: action.error,
                isLoading: false
            }
        default:
            return state
    }
}

export default postsReducer;
