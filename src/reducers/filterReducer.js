import * as actionTypes from '../actionTypes'

const filterReducer = (state="hot", action) => {
    switch(action.type) {
        case actionTypes.FILTER_BEST:
            return "best";
        case actionTypes.FILTER_HOT:
            return "hot";    
        case actionTypes.FILTER_NEW:
            return "new";
        case actionTypes.FILTER_TOP:
            return "top";
        default:
            return state;
    }
};

export default filterReducer;
