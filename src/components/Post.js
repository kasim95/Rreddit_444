import './Post.css'
import React from 'react';
import { Container } from 'react-bootstrap';

function Post(props) {
    const postData = props.postData;
    if (postData) {
        // get current time in utc
        const currentTimeUTC = Math.floor(((new Date()).getTime() / 1000)) // + ((new Date).getTimezoneOffset() * 60));
        return (
            <Container className="bg-dark text-white p-2 rounded m-3 postDiv">
                <div className="postheaderDiv pb-3 mb-1">
                    Posted by <a className="postauthor" href={"https://reddit.com/user/"+postData.author} target="_blank" rel="noopener noreferrer" >{postData.author}</a> <small>{Math.floor((currentTimeUTC - postData.created_utc) / (60 * 60))} hours ago </small>
                    {/* eslint-disable-next-line */}
                    <a className="postredditicon fab fa-reddit fa-2x float-right" href={"https://www.reddit.com"+postData.permalink} target="_blank" rel="noopener noreferrer" />
                </div>
                <div className="posttitleDiv">
                    <p className="posttitle">{postData.title}</p>
                </div>
                <div className="postbodyDiv pb-1 mb-1 mt-1">
                    <p className="postbody">{postData.selftext_html}</p>
                    <a className="posturl" href={postData.url } target="_blank" rel="noopener noreferrer" >
                        <div className="far fa-share-square" rel="noopener noreferrer" /> 
                        {" "+postData.url.slice(12,22+12)+"..."}
                    </a>
                </div>
                <div className="postfooterDiv mt-1">
                    <div className="postvoteicon fas fa-arrow-circle-up fa-x" /> <small>{postData.upvotes - postData.downvotes}</small>{"   "} 
                    {/* eslint-disable-next-line */}
                    <a className="postcommenticon far fa-comment pt-1" href="#showcomments" />
                </div>
            </Container>
        )
    }
    else {
        return (<h5>No Post data loaded</h5>)
    }
}
export default Post;
