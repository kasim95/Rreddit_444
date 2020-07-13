
// change default value of state to false after 
// implementing log in use case

const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return !state;
        default:
            return state;
    }
};

export default loggedReducer;
