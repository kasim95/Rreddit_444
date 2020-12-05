import * as actionTypes from '../actionTypes'

const subredditReducer = (state="funny", action)  => {
    switch(action.type) {
        case actionTypes.SET_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

export default subredditReducer;
