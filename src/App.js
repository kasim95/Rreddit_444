import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logIn } from './actions';

import SubredditContainer from './containers/SubredditContainer';
import Header from './components/Header';
import Footer from './components/Footer';

import { Button } from 'react-bootstrap';

function App(props) {
    // const logged = useSelector(state => state.logged);
    // const dispatch = useDispatch();
    
    return (
        <div className="App">
            <Header />
            {/*<button onClick={() => dispatch(logIn())} >Log In</button>*/}
            <Button className="button button-info m-3" onClick={props.logIn}>Log In</Button>
            <SubredditContainer />
            <Footer />
        </div>
    );
}

const mapStateToProps = state => ({
        logged: state.logged,
        subreddit: state.subreddit,
        filter: state.filter
    })

const mapDispatchToProps = dispatch => ({ logIn: () => dispatch(logIn()) })

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
