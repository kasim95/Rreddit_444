import React from 'react'

class Subreddit extends React.component {
    constructor(props) {
        super(props)
        this.name = props.subreddit;
        this.fetch_type='hot'
    }
    
    componentDidMount(){
        // add code to fetch posts for hot, popular and all
        console.log('Fetch posts for that subreddit')
    }
    render() {
        //add code to display the Subreddit name
        return (
            <h1> This is a post </h1>
        )
    };
}

export default Subreddit;