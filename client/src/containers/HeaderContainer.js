import React from 'react';
import './HeaderContainer.css';
import { Navbar, Nav } from 'react-bootstrap';
// import { NavItem, Form, FormControl, Button, NavDropdown, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterBest, filterHot, filterNew, filterTop, setSubreddit, showSubredditModal, hideSubredditModal, logout } from '../actions';
import SubredditModalContainer from './SubredditModalContainer';
import { Link } from 'react-router-dom';

export const HeaderContainer = props => {
    const handleFilter = e => {
        switch (e.target.id) {
            case "best":
                props.dispatchFilterBest();
                break;
            case "hot":
                props.dispatchFilterHot();
                break;
            case "new":
                props.dispatchFilterNew();
                break;
            case "top":
                props.dispatchFilterTop();
                break;
            default:
                console.log("default filter called")
        }
    }

    const NavbarBrand = () => {
        return (
            <Navbar.Brand href="/" className="logo">
                <img alt="Rreddit 444"
                    src={require("./logo.png")} 
                    width="30"
                    height="30"
                    className='d-inline-block align-top' 
                />
                {'  '}
                Rreddit 444
            </Navbar.Brand>
        )
    }

    
    const NavbarSubreddit = () => {
        return (
            <div>
                <SubredditModalContainer />
                <Nav.Link href="#subreddit" 
                        id="changeSubreddit" 
                        onClick={event => props.dispatchShowSubredditModal()}
                >
                    {"r/"+props.subreddit}
                </Nav.Link>
                
            </div>
        )
    }


    const NavbarLogging = () => {
        if (props.login.isLogged) {
            return (
                <Nav>
                    <Nav.Link href="#logout" onClick={() => props.dispatchLogout()}>Log Out</Nav.Link>
                </Nav>
            )
        }
        else {
            return (
                <Nav>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Log In</Link>
                    {/*<Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Log In</Nav.Link>*/}
                </Nav>
            )
    
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavbarBrand />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#best" id="best" onClick={handleFilter}>Best</Nav.Link>
                    <Nav.Link href="#hot" id="hot" onClick={handleFilter}>Hot</Nav.Link>
                    <Nav.Link href="#new" id="new" onClick={handleFilter}>New</Nav.Link>
                    <Nav.Link href="#top" id="top" onClick={handleFilter}>Top</Nav.Link>
                    <NavbarSubreddit />
                </Nav>
                <NavbarLogging />
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        subreddit: state.subreddit,
        logged: state.logged,
        filter: state.filter,
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        dispatchFilterBest: () => dispatch(filterBest()),
        dispatchFilterHot: () => dispatch(filterHot()),
        dispatchFilterNew: () => dispatch(filterNew()),
        dispatchFilterTop: () => dispatch(filterTop()),
        dispatchSetSubreddit: newSubreddit => dispatch(setSubreddit(newSubreddit)),
        dispatchShowSubredditModal: () => dispatch(showSubredditModal()),
        dispatchHideSubredditModal: () => dispatch(hideSubredditModal()),
        dispatchLogout: () => dispatch(logout())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);