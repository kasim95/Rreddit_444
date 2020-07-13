import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { logIn, logOut, increment, decrement } from './actions'

// div with name state_values_ is added to check state values during dev
// Remove the whole div later
function App() {
    const counter = useSelector(state => state.counter);
    const logged = useSelector(state => state.logged);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <h1>Hello World</h1>
            <div name='state_values_'>
                <h3> Counter: {counter}</h3>
                <h3> Logged: {logged ? "Yes" : "No"}</h3>
                <button onClick={() => dispatch(logIn())} >Log In</button>    
            </div>
        </div>
    );
}

export default App;
