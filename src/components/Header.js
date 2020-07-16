import React from 'react';
import './Header.css';
import { Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img 
                            alt="Rreddit 444"
                            src={require("./logo.png")} 
                            width="30"
                            height="30"
                            className='d-inline-block align-top' 
                        />
                        {'  '}
                    Rreddit 444
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#all">All</Nav.Link>
                        <Nav.Link href="#hot">Hot</Nav.Link>
                        <Nav.Link href="#hot">Popular</Nav.Link>
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
}


export default Header;