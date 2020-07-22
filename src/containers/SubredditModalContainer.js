import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { setSubreddit, showSubredditModal, hideSubredditModal } from '../actions';

const SubredditModalContainer = props => {
    //const modalId = "changeSubredditModal";
    const handleSubmit = e => {
        e.preventDefault();
        const newSubreddit = document.getElementById("subredditName").value;
        console.log("Submit button ", newSubreddit)
        props.dispatchSetSubreddit(newSubreddit);
    }

    return (
        <Modal
            centered
            show={props.showSubredditModal}
            onHide={() => props.dispatchHideSubredditModal}
            backdrop="static"    
        >
            <Form id="changeSubredditForm" onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Change Subreddit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="text" size="lg" id="subredditName" placeholder={props.subreddit} />
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
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchSetSubreddit: newSubreddit => dispatch(setSubreddit(newSubreddit)),
    dispatchShowSubredditModal: () => dispatch(showSubredditModal()),
    dispatchHideSubredditModal: () => dispatch(hideSubredditModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SubredditModalContainer);