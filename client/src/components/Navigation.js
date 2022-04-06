import React, { memo, useContext, useState } from 'react';
import { Container, Navbar, Nav, ListGroup, NavItem, NavDropdown, DropdownButton, ButtonGroup, Dropdown, Form, FormControl } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import AuthNav from './AuthNav';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { UserContext } from '../App';
import swal from 'sweetalert';

function Navigation() {

    const { state, dispatch } = useContext(UserContext);

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <Form.Group className="my-2 mx-3 w-auto" style={{ "min-width": "250px" }} >
                        <FormControl
                            autoFocus
                            className=""
                            placeholder="Type to filter..."
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </Form.Group>
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container fluid className="px-3">
                <div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-3"/>
                    <Navbar.Brand as={Link} to="/">
                        <Logo width="40rem" height="40rem" />
                    </Navbar.Brand>
                </div>
                <div className="nav-right">
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            <Nav.Link
                                as={Link}
                                to="/carts"
                                className='position-relative text-info'
                            >
                                <i className="fas fa-shopping-cart fs-3"></i>
                                <span className="position-absolute top-5 start-10 translate-middle badge rounded-pill bg-warning">
                                    2
                                </span>
                            </Nav.Link>
                        </ListGroup.Item>
                        {!state.isLoggedIn ?
                            <>
                                <ListGroup.Item>
                                    <Nav.Link
                                        as={Link}
                                        className="btn btn-info px-lg-4 text-white ms-5"
                                        role="button"
                                        to="/login">
                                        <b>Login</b>
                                    </Nav.Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Nav.Link
                                        as={Link}
                                        className="btn btn-success px-lg-3 text-white mx-3"
                                        role="button"
                                        to="/signup">
                                        <b>Sign Up</b>
                                    </Nav.Link>
                                </ListGroup.Item>
                            </>
                            :
                            <>
                                <ListGroup.Item>
                                    <Nav.Link
                                        as={Link}
                                        to="/notifications"
                                        className='position-relative text-info'
                                    >
                                        <i className="fa-solid fa-bell fs-3"></i>
                                        <span className="position-absolute top-5 start-10 translate-middle badge rounded-pill bg-warning">
                                            999
                                        </span>
                                    </Nav.Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <NavItem className="ms-3">
                                        <AuthNav />
                                    </NavItem>
                                </ListGroup.Item>
                            </>
                        }
                    </ListGroup>


                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" >
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-courses">Courses</Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenu} style={{ "margin-top": "1rem", "margin-bottom": "1rem" }}>
                                <Dropdown.Item eventKey="1">Java</Dropdown.Item>
                                <Dropdown.Item eventKey="2">JavaScript</Dropdown.Item>
                                <Dropdown.Item eventKey="3">C#</Dropdown.Item>
                                <Dropdown.Item eventKey="4">Digital Marketing</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavItem className="ms-lg-5" >
                            <SearchBar
                                style={{ "min-width": "450px" }}
                                onClick={() => swal("Comming Soon...")}
                            />
                        </NavItem>
                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>

    );
}
export default memo(Navigation);