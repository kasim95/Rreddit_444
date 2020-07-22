import React from 'react';
import './HeaderContainer.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import { NavIten, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterBest, filterHot, filterNew, filterTop } from '../actions';


export const Header = props => {
    const NavbarBrand = () => {
        return (
            <Navbar.Brand href="#home" className="logo">
                <img alt="Rreddit 444"
                    src={require("./logo.png")} 
                    width="30"
                    height="30"
                    className='d-inline-block align-top' 
                />
                {'  '}
                {/*Rreddit 444*/}
                Smiley Face
            </Navbar.Brand>
        )
    }

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
                props.dispatchFilterHot();
        }
    }
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavbarBrand />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#Best" id="best" onClick={handleFilter}>Best</Nav.Link>
                    <Nav.Link href="#hot" id="hot" onClick={handleFilter}>Hot</Nav.Link>
                    <Nav.Link href="#new" id="new" onClick={handleFilter}>New</Nav.Link>
                    <Nav.Link href="#top" id="top" onClick={handleFilter}>Top</Nav.Link>
                    <NavDropdown title="Subreddit" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#news">News</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#addSubreddit">Add subreddit</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#LogIn">Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        subreddit: state.subreddit,
        logged: state.logged    
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchFilterBest: () => dispatch(filterBest()),
    dispatchFilterHot: () => dispatch(filterHot()),
    dispatchFilterNew: () => dispatch(filterNew()),
    dispatchFilterTop: () => dispatch(filterTop()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);