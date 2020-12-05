import { 
    fetchPostsRequest, 
    fetchPostsSuccess, 
    fetchPostsFailure, 
    fetchCommentsRequest, 
    fetchCommentsFailure, 
    fetchCommentsSuccess, 
    loginRequest,
    loginSuccess,
    loginFailure
} from '../actions';
import axios from 'axios';
import { parseJson, parseJsonComments } from '../helpers';

export const fetchPosts = (url) => {
    // use middleware here i.e. dispatch actionCreators
    return function(dispatch) {
        dispatch(fetchPostsRequest());
        axios.get(url)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                // console.log("Success fetching Reddit API", response);
                
                // parse Json to get posts as an array and dispatch Success action
                let result = parseJson(response);
                console.log('Output from parseJson is ', result)
                dispatch(fetchPostsSuccess(result));
            }
            else {
                // dispatch Failure action
                // console.log("Failed fetching Reddit API ", response);
                dispatch(fetchPostsFailure(response.error));
            }
        })
        .catch(err => {
            dispatch(fetchPostsFailure(err))
        })
    }
};

export const fetchComments = (postId, url) => {
    // console.log("fetchComments called - url:", url, " postId: ", postId);
    return function(dispatch) {
        dispatch(fetchCommentsRequest(postId));
        axios.get(url)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                const commentData = parseJsonComments(response);
                // console.log("Comments fetch success ", response, " parsedJson: ", commentData, "postId: ", postId);
                dispatch(fetchCommentsSuccess(postId, commentData));                
                // dispatch(fetchCommentsSuccess([]))
            }
            else {
                // console.log("Comments fetch failed")
                const error = response.error;
                dispatch(fetchCommentsFailure(postId, error));
            }
        })
        .catch(err => {
            dispatch(fetchCommentsFailure);
        })
    }
};

export const loginUser = user => {
    return function(dispatch) {
        console.log("I am inside loginUser dispatch fn");
        dispatch(loginRequest(user));

        const loginUrl = "/loginUser";
        axios.post(loginUrl, user)
        .then(response => {
            console.log("I am inside Post req .then", response);
            if (response.status >= 200 && response.status <= 299 && response.data.isLogged) {
                console.log("Login User success ", response);
                let userData;
                if (response.data.userData) {
                    userData = response.data.userData;
                }
                dispatch(loginSuccess(userData));
            }
            else {
                console.log("Login user authentication failure");
                dispatch(loginFailure("Login user authentication failure"));
            }            
        })
        .catch(error => {
            console.log('I am inside Post req .catch')
            console.error("Login user failed ", error);
            dispatch(loginFailure(error));
        });
    }
}