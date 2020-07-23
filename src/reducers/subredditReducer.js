import * as actionTypes from '../actionTypes'

const subredditReducer = (state="csuf", action)  => {
    switch(action.type) {
        case actionTypes.SET_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

export default subredditReducer;
