import * as actionTypes from '../actionTypes'

const filterReducer = (state="all", action) => {
    switch(action.type) {
        case actionTypes.FILTER_ALL:
            return "all";
        case actionTypes.FILTER_TOP:
            return "top";
        case actionTypes.FILTER_HOT:
            return "hot";
        default:
            return "hot";
    }
};

export default filterReducer;