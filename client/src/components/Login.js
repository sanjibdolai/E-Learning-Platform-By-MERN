
import { Form, InputGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
function Login() {

  return (
    <Container fluid className="py-5 loginPage">
      <Row className="justify-content-md-center">
        <Col lg="4" className="shadow-lg p-4">
          <h3 className='text-center'>User Login</h3>
          <Form >
            <Form.Group className="mb-3" >
              <Form.Label>Email Address</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text><i class="fa-solid fa-at"></i></InputGroup.Text>
                <Form.Control type="email" placeholder="name@example.com" />
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
              <Button variant="success" className="px-5" type="submit">Login</Button>
            </Form.Group>
            <Form.Group className="text-center mb-2" >
              <Link to="/forgotpassword">Forgot Password</Link>
            </Form.Group>
            <Form.Group className="text-center mb-2" >
              Don't have an account?<Link to="/signup">Signup</Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;