import React from 'react';
import { Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button, Stack, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
    const isLogin = true;
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            className="text-decoration-none"
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            <img
                alt=""
                src="/user.png"
                width="35"
                height="35"
                className=""
            />
            User Name
            &#x25bc;
            {children}
        </a>
    ));

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt="Logo"
                        src="/logo.png"
                        width="35"
                        height="35"
                        className=""
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem eventkey={1} href="/">
                            <Nav.Link as={Link} to="/" >Home</Nav.Link>
                        </NavItem>
                        <NavDropdown title="Courses" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Java</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">JavaScript</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">C#</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Digital Marketing</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Advance Excel</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Form className="d-flex mx-lg-5">
                            <FormControl
                                type="search"
                                placeholder="Search..."
                                className=""
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                    <Nav>
                        {!isLogin &&
                            <Link
                                className="btn btn-info"
                                role="button"
                                to="/login">
                                Login
                            </Link>
                        }
                        {isLogin &&

                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" active>
                                        Orange
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation;