import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../middleware';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from '../../components/Subreddit';

function SubredditContainer(props) {
    // dispatch fetch Post req here
    // const url = "https://www.reddit.com/r/news/top/.json?";
    // const params = "limit=10";
    const url = `https://www.reddit.com/r/${useSelector(state => state.subreddit)}/${useSelector(state => state.filter)}/.json?`;
    const params = "limit=10";
    const dispatch = useDispatch();
    dispatch(fetchPosts(url, params));
    return (
        props.logged ?
         <div><h3>Subreddit posts loaded</h3><Subreddit /></div> 
         : <h3>Subreddit Data not loaded</h3>
    )
}

const mapStateToProps = function(state) {
    return {
        data: state.data,
        isLogged: state.logged
    }
}


export default connect(mapStateToProps)(SubredditContainer);
