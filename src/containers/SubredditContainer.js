import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../middleware';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from '../components/Subreddit';
// import axios from 'axios';
// import { parseJson } from '../helpers';

// todo:
// todo: once Comment fetch is completed and render is completed for Posts and Comments, remove subreddit name from store to prevent false API calls during store/state changes
//

function SubredditContainer(props) {

    // Hardcoded comment url
    // comment url is https://www.reddit.com/r/news/comments/hr7vza/.json?
    
    // Hardcoded post url and params (delete later)
    // const url = "https://www.reddit.com/r/news/top/.json?";
    // const params = "limit=10";
    //

    const url = `https://www.reddit.com/r/${useSelector(state => state.subreddit)}/${useSelector(state => state.filter)}/.json?`;
    const params = "limit=30";
    const dispatch = useDispatch();
    
    dispatch(fetchPosts(url, params));


    // todo: work on comment fetch and presentation at the end
    // test for Comments API (delete later)
    // const comment_url = "https://www.reddit.com/r/news/comments/hr7vza/.json?";
    // let comment_response = axios.get(comment_url+"")
    //     .then(response => {
    //         if (response.status === 200) {
    //             console.log("Success: Reddit Comment API");
    //             console.log(response);
                
    //             // parse Json to get posts as an array and dispatch Success action
    //             let result = parseJson(response);
    //             return result;
    //         }
    //         else {
    //             // dispatch Failure action
    //             console.log("Failed: Reddit Comment API ");
    //             console.log(response);
    //             return {};
    //         }
    //     })
    //     .catch(err => {
    //         console.log("Error Reddit Comment API"+err)
    //     })
    //     console.log("Reddit Commnet API values", comment_response);
    //     // end test

    return (
        props.logged ? <div><h3>Subreddit posts loaded</h3> <SubredditContainer /></div> : <h3>Subreddit Data not loaded</h3>
    )
}

const mapStateToProps = function(state) {
    return {
        data: state.data,
        logged: state.logged
    }
}


export default connect(mapStateToProps)(SubredditContainer);
