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
    
    let commentData = []
    if (postId in props.comments) {
        commentData = props.comments[postId].commentData;
    }
    // console.log("CommentContainer - postId", postId, ", commentData ",commentData);

    let allCommentDivs = []
    commentData.forEach(element => {
        allCommentDivs.push(<Comment showAll={props.showAll} key={element.id} commentData={element} />);
    });
    return (
        <div style={{display: "block"}}>
            {/* <Comment commentData={commentData} /> */}
            {allCommentDivs.length > 0 ? allCommentDivs : <p style={{fontSize: "12px"}}>No Comments found</p>}
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
