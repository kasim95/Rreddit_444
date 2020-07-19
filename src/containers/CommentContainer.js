import React, { useEffect } from 'react';
// eslint-disable-next-line
import Comment from '../components/Comment';
import { connect }  from 'react-redux';
import { fetchComments } from '../middleware'

const CommentContainer = props => {
    const postId = props.postId;
    
    // const comment_url = "https://www.reddit.com/r/news/comments/hr7vza/.json?";
    const url = `https://www.reddit.com/r/${props.subreddit}/comments/${postId}/.json?`;
    
    // eslint-disable-next-line
    useEffect(() => props.fetchCommentsForPostId(postId, url), [])    
    // console.log("CommentContainer = postId ", postId)
    let commentData = []
    if (postId in props.comments) {
        commentData = props.comments[postId].commentData;
    }

    return (
        <div>
            <Comment commentData={commentData} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        subreddit: state.subreddit,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchCommentsForPostId: (postId, url) => {
            dispatch(fetchComments(postId, url))
        }    
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
