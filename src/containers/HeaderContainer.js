import React from 'react';
import './HeaderContainer.css';
import { Navbar, Nav } from 'react-bootstrap';
// import { NavItem, Form, FormControl, Button, NavDropdown, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterBest, filterHot, filterNew, filterTop, setSubreddit, showSubredditModal, hideSubredditModal } from '../actions';
import SubredditModalContainer from './SubredditModalContainer';

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

    // Change Subreddit
    // const NavbarSubreddit = () => {
    //     return (
    //         <NavDropdown title="Subreddit" id="collasible-nav-dropdown">
    //             <NavDropdown.Item href="#news">News</NavDropdown.Item>
    //             <NavDropdown.Divider />
    //             <NavDropdown.Item href="#addSubreddit">Add subreddit</NavDropdown.Item>
    //         </NavDropdown>
    //     )
    // }
    const NavbarSubreddit = () => {
        return (
            <div>
                <SubredditModalContainer />
                <Nav.Link href="#subreddit" 
                        id="changeSubreddit" 
                        onClick={() => props.dispatchShowSubredditModal()}
                >
                    {"r/"+props.subreddit}
                </Nav.Link>
                
            </div>
        )
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
                <Nav>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/logIn">Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        subreddit: state.subreddit,
        logged: state.logged,
        filter: state.filter 
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
        dispatchHideSubredditModal: () => dispatch(hideSubredditModal())
    
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);