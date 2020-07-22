// actionTypes used to maintain consistency in type for Redux action objects

// actionTypes for fetchPost
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

// actionTypes for fetchComments
export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

// actionType for setSubreddit
export const SET_SUBREDDIT = "SET_SUBREDDIT";

// actionTypes for filterReducer
export const FILTER_TOP = "FILTER_TOP";
export const FILTER_NEW = "FILTER_NEW";
export const FILTER_HOT = "FILTER_HOT";
export const FILTER_BEST = "FILTER_BEST";

// actionTypes for logUser
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
