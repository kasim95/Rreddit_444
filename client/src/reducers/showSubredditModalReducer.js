import * as actionTypes from '../actionTypes';

const showSubredditModalReducer = (state=false, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SUBREDDIT_MODAL:
            return true;
        case actionTypes.HIDE_SUBREDDIT_MODAL:
            return false;
        default:
            return false;
    }
}

export default showSubredditModalReducer;
