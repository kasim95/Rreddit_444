// Actions for postsReducer
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";

export const fetchPosts = (subreddit, data=null, error=null) => {
    return ({
        type: FETCH_POSTS,
        subreddit: subreddit,
        data: null,
        error: null
    });
};

export const fetchPostsSuccess = (subreddit, data, error=null) => {
    return ({
        type: FETCH_POSTS_SUCCESS,
        subreddit: subreddit,
        data: data,
        error: null
    })
};

export const fetchPostsError = (subreddit, data=null, error) => {
    return ({
        type: FETCH_POSTS_ERROR,
        subreddit: subreddit,
        data: null,
        error: error
    })
}

// Login Actions (use only if required)
export const logIn = () => ({ type: 'LOG_IN' });
export const logOut =  () => ({ type: 'LOG_OUT' });


// Counter Actions (not required)
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
