import './Post.css'
import React from 'react';
import { Container } from 'react-bootstrap';
import CommentContainer from '../containers/CommentContainer';
import { getTimeDiff, convertHoursToText, toggleDiv, urlsInText } from '../helpers';

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

    // convert text to links and formatting
    const postBodyText = urlsInText(postData.selftext_html);

    // get media in post (either image or url)
    const PostMedia = props => {

        // video / video and url
        // audio doesnt work (Audio GET request gives Access Denied error)
        if (props.media && props.media.reddit_video) {
            // let videoUrlarr = props.media.reddit_video.fallback_url.split('/');
            // videoUrlarr[videoUrlarr.length - 1] = "audio";
            // const audioUrl = videoUrlarr.join('/');

            if (props.url.includes('v.redd.it')) {
                return (
                    <div className="postMediaDiv">
                        <video id="postMediaVideo" className="postMediaVideo" controls muted>
                            <source src={props.media.reddit_video.fallback_url} />
                            {/*
                            <audio id="postMediaAudio" controls>
                                <source src={audioUrl} type="audio/mpeg"/>
                            </audio>
                            */}
                        </video>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <div className="postMediaDiv">
                            <video id="postMediaVideo" className="postMediaVideo" controls>
                                <source src={props.media.reddit_video.fallback_url} />
                                {/*
                                <audio id="postMediaAudio" controls>
                                    <source src={audioUrl} type="audio/mpeg"/>
                                </audio>
                                */}
                            </video>
                        </div>
                        <a className="posturl" href={props.url } target="_blank" rel="noopener noreferrer" >
                            <div className="far fa-share-square" rel="noopener noreferrer" /> 
                            {" "+filterUrl(props.url).slice(0, 24)+"..."}
                        </a>
                    </div>
                )
            }
        }

        // image
        const imgExtensions = ['.gif', '.png', '.jpg', '.jpeg'];

        for (let i=0; i<imgExtensions.length; i++) {
            if (props.url.includes(imgExtensions[i])) {
                return (
                    <div className="postMediaDiv">
                        <img className="postMediaImage" src={props.url} alt="" />
                    </div>
                )
            }
        }

        // just url
        return (
            <a className="posturl" href={props.url } target="_blank" rel="noopener noreferrer" >
                <div className="far fa-share-square" rel="noopener noreferrer" /> 
                {" "+filterUrl(props.url).slice(0, 24)+"..."}
            </a>
        )
    }

    // calculate time when the post was created
    let postHeaderTime = convertHoursToText(getTimeDiff(postData.created_utc));
    
    // todo: separate Post Header, Body and Footer into individual components
    // todo: Same for Comment Components too
    if (postData) {
        return (
            <Container className="bg-dark text-white p-2 rounded m-3 postDiv">
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
                    <PostMedia url={postData.url} media={postData.media}/>
                    {/* post body url here */}
                </div>
                <div className="postfooterDiv mt-1">
                    <div className="postvoteicon fas fa-arrow-circle-up fa-x" /> <small>{postData.upvotes - postData.downvotes}</small>{"   "} 
                    {/* eslint-disable-next-line */}
                    <a className="postcommenticon far fa-comment pt-1" href="#toggleComments" onClick={() => toggleDiv(commentsDivId)} />
                </div>
                <div id={commentsDivId} style={{display: "none"}}>
                    {<CommentContainer showAll={props.showAll} postId={postData.reddit_id} />}
                </div>
                {/* Set target of postBody anchor tags to _blank */}
                {document.querySelectorAll("#postbody a").forEach(a => a.setAttribute("target", "_blank"))}
                
                {/* Sync audio and video playbackk */}
                {/*
                    document.getElementById("postMediaVideo") ? 
                    document.getElementById("postMediaVideo").onplay = () => document.getElementById("postMediaAudio").play() :
                    null
                */}
                {/*
                    document.getElementById("postMediaVideo") ?
                    document.getElementById("postMediaVideo").onpause = () => document.getElementById("postMediaAudio").pause() :
                    null
                */}
            </Container>
        )
    }
    else {
        return (<h5>No Post data loaded</h5>)
    }
}
export default Post;
