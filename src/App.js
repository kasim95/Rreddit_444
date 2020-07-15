import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from './actions';

import SubredditContainer from './containers/SubredditContainer';
import Header from './components/Header';
import Footer from './components/Footer';

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
            <Header />
            <div name='state_values_'>
                <h3> Logged: {logged ? "Yes" : "No"}</h3>
                <h3> All posts:</h3>
                <button onClick={() => dispatch(logIn())} >Log In</button>    
                <SubredditContainer />
            </div>
            <Footer />
        </div>
    );
}

export default App;
