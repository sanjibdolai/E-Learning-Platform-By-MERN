import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Navigation() {
    const isLogin=true;
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav >
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Courses" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Java</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">JavaScript</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">C#</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Digital Marketing</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Advance Excel</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/About">About</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                    { !isLogin &&
                    <Button variant="info" className="mt-2 mt-lg-0 ">Login</Button>
}
{ isLogin &&
                    <Nav href="#home">
                        <img
                            alt=""
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        User Name
                    </Nav>
}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation;