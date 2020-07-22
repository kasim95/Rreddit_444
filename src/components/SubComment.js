import React from 'react';
import './SubComment.css';
import { Container } from 'react-bootstrap';
import { getTimeDiff, toggleDiv } from '../helpers';

function SubComment(props) {
    if (props.subCommentData) {
        // time
        const timeDiff = getTimeDiff(props.subCommentData.created_utc);
        let timeDiffText = "-1";
        if (timeDiff > 1) {
            timeDiffText = Math.floor(timeDiff) + " hours ago";
        }
        else {
            timeDiffText = Math.floor(timeDiff * 60) + " minutes ago"
        }
        
        // replies
        let subCommentReplies = []
        if (props.subCommentData.replies.length > 0) {
            props.subCommentData.replies.forEach(element => subCommentReplies.push(<SubComment key={element.id} subCommentData={element} />))
        }

        // hide function for onClick event
        let subCommentBodyDivId = "subCommentBodyDiv_";
        if (props.subCommentData) subCommentBodyDivId = "subCommentBodyDiv_"+props.subCommentData.id;

        return (
            <Container className="bg-dark variant-dark subCommentDiv pt-1">
                <a href="#hide" className="subCommentHeaderAnchor" onClick={() => toggleDiv(subCommentBodyDivId)}>
                    <div className="subCommentHeaderDiv">
                        {props.subCommentData.author}
                        <small>
                            {"   "+timeDiffText}        
                        </small>
                    </div>
                </a>
                <div className="subCommentBodyDiv" id={"subCommentBodyDiv_"+props.subCommentData.id}>
                    <div className="subCommentText">
                        {props.subCommentData.body}
                    </div>
                    <div className="subCommentReplies">  
                        {subCommentReplies}                                  
                    </div>
                </div>
            </Container>
        )    
    }
    else {
        return <p>No subcomments</p>
    }
};

export default SubComment;
