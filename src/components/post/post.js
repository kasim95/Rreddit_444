import React from 'react'
import PropTypes from "prop-types"

class Post extends React.Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdDate: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        upvotes: PropTypes.number.isRequired,
        downvotes: PropTypes.number.isRequired
    };
    
    state = {
        toggled: false,
        hovered: false
    };

    togglePost = () => {
        console.log("Add code to toggle Post (show in a div")
    }

    render() {
        // add code to show post in a div
        return (
            <h1> This is a post</h1>
        )
    }
}

export default Post;