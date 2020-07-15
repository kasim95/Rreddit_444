import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../actions';
import axios from 'axios';
import { parseJson } from '../helpers';

export const fetchPosts = (url, params) => {
    // use middleware here i.e. dispatch actionCreators
    return function(dispatch) {
        dispatch(fetchPostsRequest());
        axios.get(url+params)
        .then(response => {
            if (response.status === 200) {
                console.log("Success fetching Reddit API");
                console.log(response);
                
                // parse Json to get posts as an array and dispatch Success action
                let result = parseJson(response);
                dispatch(fetchPostsSuccess(result));
            }
            else {
                // dispatch Failure action
                console.log("Failed fetching Reddit API ");
                console.log(response);
                dispatch(fetchPostsFailure(response.error));
            }
        })
        .catch(err => {
            dispatch(fetchPostsFailure(err))
        })
    }
};
