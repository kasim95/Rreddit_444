import React from 'react';
import { Container } from 'react-bootstrap';
import './Comment.css';

const Comment = props => {
    // const commentData = props.commentData;
    // console.log("Comment Component - commentData:",commentData);
    return (
        <Container className="bg-dark text-white p-2 rounded commentDiv">
            <p>Comment Component</p>
        </Container>
    )
}

export default Comment;
