import React from 'react'
// import { useSelector } from 'react-redux'
// import Post from '../Post'


function Subreddit() {
    return (
        <h2> This is a Subreddit component</h2>
    )
} 



// class Subreddit extends React.Component {
//     constructor() {
//         super()
//         this.base_url = "https://www.reddit.com";
//     }

//     parseJson = response_json => {
//         if (response_json) {
//             console.log(response_json);
//             // const children = response_json.data.children;
//             // console.log(children);
//         }
//     };

//     fetchposts = (url, params) => {
//         return fetch(url+params)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 else {
//                     throw new Error("fetchPosts fn failed. Status: "+ response.status)
//                 }
//             }).then(response_json => this.parseJson(response_json));
//     };
    
//     componentDidMount(){
//         // add code to fetch posts for hot, popular and all
//         console.log('Fetch posts for that subreddit')

//         // construct url to fetch
//         // https://www.reddit.com/r/news/top/.json?limit=10
//         // const url = `${this.base_url}/r/${useSelector(state => state.subreddit)}/${useSelector(state => state.filter)}/.json?`;
//         const url =  "https://www.reddit.com/r/news/top/.json?"
        
//         // get params from store
//         const params = "limit=1";

//         // return
//         this.fetchposts(url, params)
//             .then(res => this.parseJson(res))
//     }
    
//     render() {
//         //add code to display the Subreddit name
//         return (
//             <h2> This is the Subreddit component </h2>
//         )
//     };
// }

export default Subreddit;
