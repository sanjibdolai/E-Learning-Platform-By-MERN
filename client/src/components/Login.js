import { memo, useContext, useState } from 'react';
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
function Login() {

  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "", password: ""
  });
  let name, value
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      alert(data.error);
      console.log("Invalid Login.");
    } else {
      alert("Login Successfull.");
      console.log(data)
      if (data.userType === 'Instructor') {
        dispatch({ type: 'INSTRUCTOR_LOGIN' });
        navigate('/instructor');
      }
    }
  }


  return (
    <Container fluid className="py-5">
      <Row className="justify-content-md-center">
        <Col lg="4" className="shadow-lg p-4">
          <h3 className='text-center'>User Login</h3>
          <Form method='POST'>
            <Form.Group className="mb-3" >
              <Form.Label>Email Address</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text><i className="fa-solid fa-at"></i></InputGroup.Text>
                <Form.Control type="email" placeholder="name@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                />
              </InputGroup>

            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text><i className="fa-solid fa-key"></i></InputGroup.Text>
                <Form.Control type="password" placeholder="Enter password..."
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="text-center mb-2" >
              <Button variant="success" className="px-5" type="submit" onClick={postData}>Login</Button>
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

export default memo(Login);