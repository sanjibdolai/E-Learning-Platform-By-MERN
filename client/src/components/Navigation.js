import { memo, useContext } from 'react';
import { Container, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthNav from './AuthNav';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { UserContext } from '../App';

function Navigation() {

    const { state, dispatch } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container fluid className="px-3">
                <Navbar.Brand as={Link} to="/">
                    <Logo width="40rem" height="40rem" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" >
                        <NavItem >
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
                        <Nav.Link as={Link} to="/about" >About</Nav.Link>
                        <NavItem className="ms-lg-5" >
                            <SearchBar />
                        </NavItem>

                    </Nav>
                    <Nav>
                        {!state.isLoggedIn ?
                            <Link
                                className="btn btn-info"
                                role="button"
                                to="/login">
                                Login
                            </Link>
                            :
                            <AuthNav />
                        }
                        {state.userType === "INSTRUCTOR" &&
                            <Link
                                className="btn btn-outline-success ms-3"
                                role="button"
                                to="/Instructor">
                                Dashboard
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default memo(Navigation);