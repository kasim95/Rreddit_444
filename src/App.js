import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logIn } from './actions';
import SubredditContainer from './containers/SubredditContainer';
import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';


function App(props) {
    // const logged = useSelector(state => state.logged);
    // const dispatch = useDispatch();
    
    return (
        <Router>
            <div className="App">
                <HeaderContainer />
                {/*<button onClick={() => dispatch(logIn())} >Log In</button>*/}
                <div>
                    <Button className="button button-info m-3" onClick={props.logIn}>Change State</Button>
                </div>
                <Switch>
                    <Route path="/" exact>
                        <SubredditContainer />
                    </Route>
                    <Route path="/register" exact>
                        <RegisterContainer />
                    </Route>
                    <Route path="/login" exact>
                        <LoginContainer />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </Router>
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
