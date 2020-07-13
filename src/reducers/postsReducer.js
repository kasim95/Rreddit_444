import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from '../actions'

const postsReducer = (state={data: {}}, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                data: {},
                error: null,
                isLoading: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                data: action.data,
                error: null,
                isLoading: false
            }
        case FETCH_POSTS_ERROR:
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