import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

function Footer() {
    return (
        <Container fluid className="text-right pt-3 bg-dark text-white">
            <p className="align-right">Credits: Kasim Panjri</p>
            <a href="https://www.github.com/kasim95" className="align-right ">Github</a>
        
        </Container>
    )
};

export default Footer;
