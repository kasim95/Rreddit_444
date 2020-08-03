import React from 'react';
import { Container } from 'react-bootstrap';
import './Comment.css';
import SubComment from './SubComment';
import { getTimeDiff, toggleDiv, convertHoursToText, urlsInText } from '../helpers';

const Comment = props => {
    // console.log("Comment props", props);
    const commentData = props.commentData;
    // console.log("Comment Component - commentData:",commentData);
    if (commentData) {
        // convert links in comment to anchors
        const commentBodyText = urlsInText(commentData.body_html);

        //time
        const timeDiffText = convertHoursToText(getTimeDiff(commentData.created_utc));

        // replies
        let subComments = []
        if (props.showAll && commentData.replies.length > 0) {
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
                        <a
                        className="commentAuthor"
                        href={`https://reddit.com/user/${commentData.author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            {commentData.author}
                        </a>
                        <small>
                            {/* Add time in hours ago here*/}
                            {" "+timeDiffText}
                        </small>
                    </div>
                </a>
                <div className="commentBodyDiv" id={"commentBodyDiv_"+commentData.id}>
                    <div className="commentTextDiv">
                        {<p id="commentBodyText" className="commentBodyText" dangerouslySetInnerHTML={{ __html: commentBodyText}}></p>}
                    
                        {/* commentData.body */}
                    </div>
                    <div className="commentSubCommentsDiv">
                        {subComments}
                    </div>
                </div> 
                {document.querySelectorAll("#commentBodyText a").forEach(a => a.setAttribute("target", "_blank"))}
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
