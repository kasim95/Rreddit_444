import * as actionTypes from '../actionTypes';

const numPostsReducer = (state=10, action) => {
    switch(action.type) {
        case actionTypes.SET_NUMPOSTS:
            return action.numPosts;
        default:
            return state;
    }
}

export default numPostsReducer;
