import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../middleware';
// import CommentContainer from '../containers/CommentContainer';
import Post from '../components/Post';

const PostContainer = props => {
    const postId = props.postId;
    let postData;
    for (let i=0; i<props.allPosts.length; i++) {
        if (postId && props.allPosts[i].reddit_id === postId) {
            postData = props.allPosts[i];
            break;
        }
    }

    return (
        <div>
            <Post key={postId} postData={postData} />
        </div>
    )
}

const mapStateToProps = state => {
    let result = []
    state.posts.data.forEach(element => {
        result.push(element);
        
    })
    return {
        subreddit: state.subreddit,
        allPosts: result    
    }
}

const mapDispatchToProps =  dispatch => ({
    dispatchFetchComments: dispatch(fetchComments)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
