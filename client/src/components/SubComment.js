import React from 'react';
import './SubComment.css';
import { Container } from 'react-bootstrap';
import { getTimeDiff, toggleDiv, convertHoursToText, urlsInText } from '../helpers';

function SubComment(props) {
    if (props.subCommentData) {
        // body text
        const subCommentBodyText = urlsInText(props.subCommentData.body_html);

        // time
        const timeDiffText = convertHoursToText(getTimeDiff(props.subCommentData.created_utc));
        
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
                {/*<a href="#hide" className="subCommentHeaderAnchor" onClick={() => toggleDiv(subCommentBodyDivId)}>*/}
                <div className="subCommentHeaderDiv" onClick={() => toggleDiv(subCommentBodyDivId)}>       
                    <a
                    className="subCommentAuthor"
                    href={`https://reddit.com/user/${props.subCommentData.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        {props.subCommentData.author}
                    </a>                        
                    <small>
                        {"   "+timeDiffText}        
                    </small>
                </div>
                {/*</a>*/}
                <div className="subCommentBodyDiv" id={"subCommentBodyDiv_"+props.subCommentData.id}>
                    <div className="subCommentText">
                        {<p id="subCommentBodyText" className="subCommentBodyText" dangerouslySetInnerHTML={{ __html: subCommentBodyText}}></p>}
                    
                        {/* props.subCommentData.body */}
                    </div>
                    <div className="subCommentReplies">  
                        {subCommentReplies}                                  
                    </div>
                </div>
                {document.querySelectorAll("#subCommentBodyText a").forEach(a => a.setAttribute("target", "_blank"))}
            </Container>
        )    
    }
    else {
        return <p>No subcomments</p>
    }
};

export default SubComment;
