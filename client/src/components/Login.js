
import { Form, InputGroup, FormControl, Button, Container, Row,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Login() {

  return (
    <Container className='vh-100'>
      <Row className='rounded py-5'>
        <Col className='col-lg-8'>
        </Col>
        <Form className='col-lg-4 shadow-lg bg-light p-4'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@<FontAwesomeIcon icon="fa-solid fa-user" /></InputGroup.Text>
              <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </InputGroup>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="info" type="submit" className='px-5 float-right'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;