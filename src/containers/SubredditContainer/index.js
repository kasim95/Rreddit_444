import React from 'react'
import { connect } from 'react-redux'

function SubredditContainer(props) {

    // dispatch fetch Post req here
    return (
        props.isLogged ? <h3>Subreddit posts loaded</h3> : <h3>Data not loaded</h3>
    )
}

const mapStateToProps = function(state) {
    return {
        data: state.data,
        isLogged: state.isLogged
    }
}


export default connect(mapStateToProps)(SubredditContainer);
