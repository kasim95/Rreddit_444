import './Post.css'
import React from 'react';
import { Container } from 'react-bootstrap';
import CommentContainer from '../containers/CommentContainer';
import { getTimeDiff, convertHoursToText, toggleDiv, urlsInText, filterUrl } from '../helpers';

function Post(props) {
    if (props.postData) {
        // separate commentDivId for each Post Comment (used in PostFooter and PostComments)
        const commentsDivId = "subCommentsDiv_" + props.postData.reddit_id;
            
        
        // Post Header
        const PostHeader = props => {
            // calculate time when the post was created
            let postHeaderTime = convertHoursToText(getTimeDiff(props.postData.created_utc));
            return (
                <div className="postheaderDiv pb-3 mb-1">
                    Posted by 
                    <a 
                    className="postauthor pl-1" 
                    href={"https://reddit.com/user/"+props.postData.author} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    >
                        {props.postData.author}
                    </a> 
                    <div className="pl-1 d-inline-block">
                        <small>
                            {postHeaderTime}
                        </small>
                    </div>

                    {/* eslint-disable-next-line */}
                    <a 
                    className="postredditicon fab fa-reddit fa-2x float-right" 
                    href={"https://www.reddit.com"+props.postData.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer" />
                </div>
            )
        }

        const PostTitle = props => (
            <div className="posttitleDiv">
                <p className="posttitle">{props.postData.title}</p>
            </div>
        )
        
        // Post Media Subcomponent
        const PostMedia = props => {

            // Post Url Subcomponent
            const PostUrl = props => {
                if (props.url) {
                    return (
                        <a className="posturl" href={props.url } target="_blank" rel="noopener noreferrer" >
                            <div className="far fa-share-square" rel="noopener noreferrer" /> 
                            {" "+filterUrl(props.url).slice(0, 24)+"..."}
                        </a>
                    )
                }
                else return null;
            }

            // Post Media Video Subcomponent
            const PostMediaVideo = props => {
                // // video / video and url
                // // audio doesnt work (Audio GET request gives Access Denied error)
                // let videoUrlarr = props.media.reddit_video.fallback_url.split('/');
                // videoUrlarr[videoUrlarr.length - 1] = "audio";
                // const audioUrl = videoUrlarr.join('/');
                return (
                    <video id="postMediaVideo" className="postMediaVideo" controls muted>
                        <source src={props.media.reddit_video.fallback_url} />
                        {/*
                        <audio id="postMediaAudio" controls>
                            <source src={audioUrl} type="audio/mpeg"/>
                        </audio>
                        */}
                    </video>
                )
            }

            const PostMediaImage = props => (
                <div className="postMediaDiv">
                    <img className="postMediaImage" src={props.url} alt="" />
                </div>
            )
            
            const imgExtensions = ['.gif', '.png', '.jpg', '.jpeg'];
            if (props.media && props.media.reddit_video) {
                // video
                if (props.url.includes('v.redd.it')) {
                    return (
                        <div className="postMediaDiv">
                            <PostMediaVideo media={props.media} />
                        </div>
                    )
                }
                else {
                    // video and url
                    return (
                        <div>
                            <PostMediaVideo media={props.media} />
                            <PostUrl url={props.url} />
                        </div>
                    )
                }
            }
            else if (props.url)
            // image
                for (let i=0; i<imgExtensions.length; i++) {
                    if (props.url.includes(imgExtensions[i])) {
                        return (
                            <PostMediaImage url={props.url} />
                        )
                    }
                }

            // if no video or image just return url
            return (
                <PostUrl url={props.url} />
            )
        }

        const PostBody = props => {
            // convert text to links and formatting
            const postBodyText = urlsInText(props.postData.selftext_html);
            return (
                <div className="postbodyDiv pb-1 mb-1 mt-1">
                    {<p id="postbody" className="postbody" dangerouslySetInnerHTML={{ __html: postBodyText}}></p>}
                    <PostMedia url={props.postData.url} media={props.postData.media}/>
                    {/* post body url here */}
                </div>
            )
        }

        const PostFooter = props => (
            <div className="postfooterDiv mt-1">
                <div className="postvoteicon fas fa-arrow-circle-up fa-x" /> <small>{props.postData.upvotes - props.postData.downvotes}</small>
                {/* eslint-disable-next-line */}
                <a className="postcommenticon far fa-comment pt-1 pl-1" href="#toggleComments" onClick={() => toggleDiv(props.commentsDivId)} />
            </div>
        )

        return (
            <Container className="bg-dark text-white p-2 rounded m-3 postDiv">
                <PostHeader postData={props.postData} />
                <PostTitle postData={props.postData} />
                <PostBody postData={props.postData} />
                <PostFooter postData={props.postData} commentsDivId={commentsDivId} />
                
                {/* dnt call imported React components inside defined subcomponents (redundant commentcontainer calls) */}
                <div id={commentsDivId} style={{display: "none"}}>
                    {<CommentContainer showAll={props.showAll} postId={props.postData.reddit_id} commentsDivId={commentsDivId} />}
                </div>
                
                
                {/* PostBody: Set target of postBody anchor tags to _blank */}
                {document.querySelectorAll("#postbody a").forEach(a => a.setAttribute("target", "_blank"))}
                
                {/* PostMedia: Sync audio and video playback in Post Media */}
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
        return (
        <h5>No Post data loaded</h5>
        )
    }
}
export default Post;
