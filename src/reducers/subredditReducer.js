import * as actionTypes from '../actionTypes'

const subredditReducer = (state="news", action)  => {
    switch(action.type) {
        case actionTypes.SET_SUBREDDIT:
            return action.payload.subreddit;
        default:
            return state
    }
}

export default subredditReducer;
