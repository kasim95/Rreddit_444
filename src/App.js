import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
// import { logIn, logOut, increment, decrement } from './actions'
import { logIn } from './actions'
import Subreddit from './components/Subreddit'

// div with name state_values_ is added to check state values during dev
// Remove the whole div later
function App() {
    const logged = useSelector(state => state.logged);
    const dispatch = useDispatch();
    
    return (
        <div className="App">
            <div className="App-header">
                <h1>Rreddit 444</h1>
            </div>
            <Subreddit />
            <div name='state_values_'>
                <h3> Logged: {logged ? "Yes" : "No"}</h3>
                <h3> All posts: Not implemented</h3>
                <button onClick={() => dispatch(logIn())} >Log In</button>    
                <button>Show Posts</button>
            </div>
        </div>
    );
}

export default App;
