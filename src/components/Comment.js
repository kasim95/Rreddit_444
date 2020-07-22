import React from 'react';
import { Container } from 'react-bootstrap';
import './Comment.css';
import SubComment from './SubComment';
import { getTimeDiff, toggleDiv } from '../helpers';

const Comment = props => {
    const commentData = props.commentData;
    // console.log("Comment Component - commentData:",commentData);
    if (commentData) {
        
        //time
        const timeDiff = getTimeDiff(commentData.created_utc);
        let timeDiffText = "No time";
        if (timeDiff > 1) {
            timeDiffText = Math.floor(timeDiff) + " hours ago";
        }
        else {
            timeDiffText = Math.floor(timeDiff * 60) + " minutes ago"
        }

        // replies
        let subComments = []
        if (commentData.replies.length > 0) {
            commentData.replies.forEach(element => {
                subComments.push(<SubComment key={element.id} subCommentData={element} />)
            })    
        }

        // Comment Header onClick event
        let commentBodyDivId = "commentBodyDiv_";
        if (commentData) commentBodyDivId = "commentBodyDiv_"+commentData.id;

        return (
            <Container className="bg-dark text-white p-2 m-1 rounded commentDiv">
                <a href="#hide" onClick={() => toggleDiv(commentBodyDivId)} className="commentHeaderAnchor">
                    <div className="commentHeaderDiv">
                        {commentData.author}            
                        <small>
                            {/* Add time in hours ago here*/}
                            {"  "+timeDiffText}
                        </small>
                    </div>
                </a>
                <div className="commentBodyDiv" id={"commentBodyDiv_"+commentData.id}>
                    <div className="commentTextDiv">
                        {commentData.body}
                    </div>
                    <div className="commentSubCommentsDiv">
                        {subComments}
                    </div>
                </div> 
            </Container>
        )
    }
    else {
        return (
            <Container className="bg-dark text-white rounded commentDiv">
                <p>No Comments found</p>
            </Container>
        )
    }
}

export default Comment;
