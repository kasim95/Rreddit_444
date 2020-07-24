import './Post.css'
import React from 'react';
import { Container } from 'react-bootstrap';
import CommentContainer from '../containers/CommentContainer';
import { getTimeDiff, convertHoursToText, toggleDiv, decodeHTMLEntities } from '../helpers';


function Post(props) {
    const postData = props.postData;
    
    // commentsDivId for showcomments link
    let commentsDivId = "subCommentsDiv_";
    if (postData) {
        commentsDivId = "subCommentsDiv_"+postData.reddit_id;
    }

    // remove https, http and www from url for display
    const filterUrl = url => {
        let result = url;
        if (result.split('//').length > 1) {
            result = result.split("//")[1]
        }
        if (result.split(".")[0] === "www") {
            result = result.split(".").slice(1, result.length).join(".");
        }
        return result;
    }

    // convert links in text to anchors
    const urlsInText = text => {
        if (!text) return text;
        else if (text === "null") return "";
        
        return decodeHTMLEntities(text);
    }
    const postBodyText = urlsInText(postData.selftext_html);

    // calculate time when the post was created
    let postHeaderTime = convertHoursToText(getTimeDiff(postData.created_utc));

    // todo: separate Post Header, Body and Footer into individual components
    // todo: Same for Comment Components too
    if (postData) {
        return (
            <Container className="bg-dark text-white p-2 rounded m-2 postDiv">
                <div className="postheaderDiv pb-3 mb-1">
                    {/*Posted by <a className="postauthor" href={"https://reddit.com/user/"+postData.author} target="_blank" rel="noopener noreferrer" >{postData.author}</a> <small>{Math.floor((currentTimeUTC - postData.created_utc) / (60 * 60))} hours ago </small>*/}
                    Posted by 
                    <a 
                    className="postauthor" 
                    href={"https://reddit.com/user/"+postData.author} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    >
                        {" "+postData.author}
                    </a> 
                    <small>
                        {" "+postHeaderTime}
                    </small>
                    {/* eslint-disable-next-line */}
                    <a className="postredditicon fab fa-reddit fa-2x float-right" href={"https://www.reddit.com"+postData.permalink} target="_blank" rel="noopener noreferrer" />
                </div>
                <div className="posttitleDiv">
                    <p className="posttitle">{postData.title}</p>
                </div>
                <div className="postbodyDiv pb-1 mb-1 mt-1">
                    {<p id="postbody" className="postbody" dangerouslySetInnerHTML={{ __html: postBodyText}}></p>}
                    <a className="posturl" href={postData.url } target="_blank" rel="noopener noreferrer" >
                        <div className="far fa-share-square" rel="noopener noreferrer" /> 
                        {/*" "+postData.url.slice(12,22+12)+"..."*/}
                        {" "+filterUrl(postData.url).slice(0, 24)+"..."}
                    </a>
                </div>
                <div className="postfooterDiv mt-1">
                    <div className="postvoteicon fas fa-arrow-circle-up fa-x" /> <small>{postData.upvotes - postData.downvotes}</small>{"   "} 
                    {/* eslint-disable-next-line */}
                    <a className="postcommenticon far fa-comment pt-1" href="#toggleComments" onClick={() => toggleDiv(commentsDivId)} />
                </div>
                <div id={commentsDivId} style={{display: "none"}}>
                    {<CommentContainer postId={postData.reddit_id} />}
                </div>
                {/* Set target of postBody anchor tags to _blank */}
                {document.querySelectorAll("#postbody a").forEach(a => a.setAttribute("target", "_blank"))}
            </Container>
        )
    }
    else {
        return (<h5>No Post data loaded</h5>)
    }
}
export default Post;
