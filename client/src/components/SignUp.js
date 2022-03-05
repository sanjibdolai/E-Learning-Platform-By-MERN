import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
function SignUp() {

    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
                <Col lg="4" className="shadow-lg p-4">
                    <h3 className='text-center'>Sign Up</h3>
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i class="fa-solid fa-user"></i></InputGroup.Text>
                                <Form.Control type="text" placeholder="Enter your name" />
                            </InputGroup>

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email Address</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i class="fa-solid fa-at"></i></InputGroup.Text>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </InputGroup>

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>User Type</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i class="fa-solid fa-users"></i></InputGroup.Text>
                                <Form.Select >
                                    <option>Select User Type</option>
                                    <option value="Learner">Learner</option>
                                    <option value="Instructor">Instructor</option>
                                </Form.Select>
                            </InputGroup>

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i class="fa-solid fa-key"></i></InputGroup.Text>
                                <Form.Control type="password" placeholder="Enter password..." />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="text-center mb-2" >
                            <Button variant="success" className="px-5" type="submit">Sign Up</Button>
                        </Form.Group>
                        <Form.Group className="text-center mb-2" >
                        Already have an account?<Link to="/login">Login</Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp;