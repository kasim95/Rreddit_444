import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../middleware';
import Post from '../components/Post';
// import axios from 'axios';
// import { parseJson } from '../helpers';

// todo: once Comment fetch is completed and render is completed for Posts and Comments, remove subreddit name from store to prevent false API calls during store/state changes

function SubredditContainer(props) {
    //  one good thought is to also move the fetchPosts function here cause this is the only container that will ever call it
    // this also makes it easier to remove subreddit from store which means no repetitive fetch requests for every state change


    //const url = `https://www.reddit.com/r/${useSelector(state => state.subreddit)}/${useSelector(state => state.filter)}/.json?`;
    const url = `https://www.reddit.com/r/${props.subreddit}/${props.filter}/.json?`;
    const params = "limit=30";
    const fullUrl = url+params;
    
    // useEffect is used to mimic ComponentDidMount lifecycle method
    // It also prevents fetchPosts being called unnecessarily when other state values change
    //  the 2nd argument to useEffect contains the dependancies so it will be called whenever any value in it changes
    //useEffect(() => props.fetchPosts(url+params), [])
    // useEffect(() => props.fetchPosts(url+params), [props.fetchPosts])
    const fetchPostsDispatch = fullUrl => props.fetchPosts(fullUrl);
    useEffect(() => fetchPostsDispatch(fullUrl), [])

    // Hardcoded comment url
    // comment url is https://www.reddit.com/r/news/comments/hr7vza/.json?
    // Hardcoded post url and params (delete later)
    // const url = "https://www.reddit.com/r/news/top/.json?";
    // const params = "limit=10";
    //
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
    //     console.log("Reddit Comment API values", comment_response);
    //     // end test
    let arrPosts = [];
    for (let i=0; i < props.allPosts.length; i++) {
        arrPosts.push(<Post key={i} postData={props.allPosts[i]} />)
    }
    return (
        <div className="row justify-content-center">{arrPosts}</div>
    );
}

const mapStateToProps = function(state) {
    let result = []
    state.posts.data.forEach(element => {
        result.push(element);
    });
    // console.log("I am in mapStatetoProps", result)
    return {
        data: state.data,
        //logged: state.logged, //do not include logged here as using props in useEffect dependancies calls fetchPosts infinite times
        subreddit: state.subreddit,
        filter: state.filter,
        allPosts: result
    }
}

const mapDispatchToProps = function(dispatch) {
    return ({
        fetchPosts: (fullUrl) => {dispatch(fetchPosts(fullUrl))}
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditContainer);
