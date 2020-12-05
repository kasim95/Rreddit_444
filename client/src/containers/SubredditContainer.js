import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../middleware';
import PostContainer from '../containers/PostContainer';
// import axios from 'axios';
// import { parseJson } from '../helpers';

// todo: once Comment fetch is completed and render is completed for Posts and Comments, remove subreddit name from store to prevent false API calls during store/state changes
// another fix: call all dispatches for fetch using useEffect and exclude subreddit in dependancy

function SubredditContainer(props) {
    //  one good change  is to also move the fetchPosts function here cause this is the only container that will ever call it
    // this also makes it easier to remove subreddit from store which means no repetitive fetch requests for every state change
    
    // Hardcoded post url and params (delete later)
    // const url = "https://www.reddit.com/r/news/top/.json?";
    // const params = "limit=10";
    
    //const url = `https://www.reddit.com/r/${useSelector(state => state.subreddit)}/${useSelector(state => state.filter)}/.json?`;
    const url = `https://www.reddit.com/r/${props.subreddit}/${props.filter}/.json?`;
    //const params = "limit=10";
    const params = `limit=${props.numPosts}`;
    const fullUrl = url+params;
    
    // useEffect is used to mimic ComponentDidMount lifecycle method
    // It also prevents fetchPosts being called unnecessarily when other state values change
    //  the 2nd argument to useEffect contains the dependancies so it will be called whenever any value in it changes
    //useEffect(() => props.fetchPosts(url+params), [])
    // useEffect(() => props.fetchPosts(url+params), [props.fetchPosts])

    const fetchPostsDispatch = fullUrl => props.fetchPosts(fullUrl);
    // disable useEffect missing dependancies warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchPostsDispatch(fullUrl), [props.subreddit, props.filter, props.numPosts]);

    let arrPosts = [];
    for (let i=0; i < props.allPosts.length; i++) {
        arrPosts.push(<PostContainer showAll={props.showAll} key={i} postId={props.allPosts[i].reddit_id} />)
    }

    return (
        <div className="row align-content-center" style={{flexDirection: "column"}}>
            {/*arrPosts.length > 0 && arrPosts[0]*/}
            {arrPosts}
        </div>
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
        error: state.posts.error,
        //logged: state.logged, //do not include logged here as using props in useEffect dependancies calls fetchPosts infinite times
        subreddit: state.subreddit,
        filter: state.filter,
        numPosts: state.numPosts,
        allPosts: result
    }
}

const mapDispatchToProps = function(dispatch) {
    return ({
        fetchPosts: (fullUrl) => {dispatch(fetchPosts(fullUrl))}
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditContainer);
