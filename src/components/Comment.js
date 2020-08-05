import React from 'react';
import { Container } from 'react-bootstrap';
import './Comment.css';
import SubComment from './SubComment';
import { getTimeDiff, toggleDiv, convertHoursToText, urlsInText } from '../helpers';

const Comment = props => {
    
    if (props.commentData) {
        // convert links in comment to anchors
        const commentBodyText = urlsInText(props.commentData.body_html);

        //time
        const timeDiffText = convertHoursToText(getTimeDiff(props.commentData.created_utc));

        // replies
        let subComments = []
        if (props.showAll && props.commentData.replies.length > 0) {
            props.commentData.replies.forEach(element => {
                subComments.push(<SubComment key={element.id} subCommentData={element} />)
            })    
        }

        // Comment Header onClick event
        let commentBodyDivId = "commentBodyDiv_";
        if (props.commentData) commentBodyDivId = "commentBodyDiv_"+props.commentData.id;

        return (
            <Container className="bg-dark text-white p-2 m-1 rounded commentDiv">
                {/*<a href="#hide" onClick={() => toggleDiv(commentBodyDivId)} className="commentHeaderAnchor">*/}
                <div className="commentHeaderDiv" onClick={() => toggleDiv(commentBodyDivId)}>
                    <a
                    className="commentAuthor"
                    href={`https://reddit.com/user/${props.commentData.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        {props.commentData.author}
                    </a>
                    <div className="pl-1 d-inline-block">
                        <small>
                            {timeDiffText}
                        </small>
                    </div>
                </div>
                {/*</a>*/}
                <div className="commentBodyDiv" id={"commentBodyDiv_"+props.commentData.id}>
                    <div className="commentTextDiv">
                        {<p id="commentBodyText" className="commentBodyText" dangerouslySetInnerHTML={{ __html: commentBodyText}}></p>}
                    
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
