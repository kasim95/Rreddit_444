import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

function Post(props) {
    const postData = props.postData;
    if (postData) {
        const currentTimeUTC = Math.floor(((new Date).getTime() / 1000)) // + ((new Date).getTimezoneOffset() * 60));
        console.log(currentTimeUTC)
        return (
            <Container className="bg-dark text-white p-2 border border-danger rounded m-3 ">
                <div className="Post-headerDiv">Posted by <p className="Post-author">by {postData.author} {Math.floor((currentTimeUTC - postData.created_utc) / (60 * 60))} hours ago</p></div>
                <div className="Post-titleDiv"><p className="Post-title">{postData.title}</p></div>
                <div className="Post-bodyDiv"><p className="Post-body">{postData.selftext_html}</p></div>
                <div className="Post-footerDiv"><p className="Post-votes">Upvotes: {postData.upvotes} | Downvotes: {postData.downvotes}</p></div>
            </Container>
        )
    }
    else {
        return (<h5>No Post data loaded</h5>)
    }
}

export default Post;
