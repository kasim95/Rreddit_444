import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure, fetchCommentsRequest, fetchCommentsFailure, fetchCommentsSuccess } from '../actions';
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
