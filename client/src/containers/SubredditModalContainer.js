import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { 
    setSubreddit, 
    showSubredditModal, 
    hideSubredditModal,
    setNumPosts
} from '../actions';

const SubredditModalContainer = props => {
    //const modalId = "changeSubredditModal";
    
    const handleSubmit = e => {
        e.preventDefault();
        let newNumPosts;
        if (document.getElementById("subredditNumPosts").value < 30) {
            newNumPosts = document.getElementById("subredditNumPosts").value;
        }
        else {
            newNumPosts = 30;
        }
        const newSubreddit = document.getElementById("subredditName").value;
        
        // console.log("Submit button ", newSubreddit)
        if (newSubreddit && newNumPosts) {
            props.dispatchSetNumPosts(newNumPosts);
            props.dispatchSetSubreddit(newSubreddit);
        }
        else if (newSubreddit) {
            props.dispatchSetSubreddit(newSubreddit)
        }
        else if (newNumPosts) {
            props.dispatchSetNumPosts(newNumPosts);
        }
        else {
            props.dispatchHideSubredditModal();
        }
    }

    return (
        <Modal
            centered
            show={props.showSubredditModal}
            onHide={props.dispatchHideSubredditModal}
            backdrop="static"    
        >
            <Form id="changeSubredditForm" onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Change Subreddit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control 
                type="text" 
                size="lg" 
                id="subredditName"
                className="mb-1"
                placeholder={"Subreddit: " + props.subreddit} 
                />
                
                <Form.Control 
                type="number" 
                size="lg"
                id="subredditNumPosts"
                className="mt-1"
                placeholder={"Number of Posts (max 30): " + props.numPosts} 
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" onClick={() => props.dispatchHideSubredditModal()}>Close</Button>
                <Button variant="btn btn-success" type="submit" data-dismiss="modal">Save Changes</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        subreddit: state.subreddit,
        showSubredditModal: state.showSubredditModal,
        numPosts: state.numPosts
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchSetSubreddit: newSubreddit => dispatch(setSubreddit(newSubreddit)),
    dispatchShowSubredditModal: () => dispatch(showSubredditModal()),
    dispatchHideSubredditModal: () => dispatch(hideSubredditModal()),
    dispatchSetNumPosts: newNumPosts => dispatch(setNumPosts(newNumPosts))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubredditModalContainer);