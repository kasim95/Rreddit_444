import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import SubredditContainer from './containers/SubredditContainer';
import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';


function App(props) {

    // showAll in props controls if all Comments are shown or not 
    // (true for subComments, false for only top level comments)
    const passProps = {showAll: true};
    return (
        <Router>
            <div className="App">
                <HeaderContainer />
                <Routes>
                    <Route path="/" exact element={<SubredditContainer {...passProps} />} />
                    <Route path="/register" exact element={<RegisterContainer />} />
                    <Route path="/login" exact element={<LoginContainer />} />
                </Routes>
                <Footer />
            </div>
        </Router>    
    );
}

const mapStateToProps = state => ({
        subreddit: state.subreddit,
        filter: state.filter
    })

// const mapDispatchToProps = dispatch => ({ logIn: () => dispatch(logIn()) })

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps)(App);
