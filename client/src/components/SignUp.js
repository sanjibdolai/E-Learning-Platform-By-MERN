import { useState } from 'react';
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { Link,useNavigate} from "react-router-dom";
function SignUp() {
    const navigate=useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", userType: "", password: ""
    });
    let name, value
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const postData=async(e)=>{
        e.preventDefault();
        const {name, email, userType, password}=user;
        const res=await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, userType, password
            })
        });

        const data=await res.json();
        if(res.status===422 || !data){
            alert("Invalid Registration.");
            console.log("Invalid Registration.");
        }else{
            alert("Registration Successfull.");
            console.log("Registration Successfull.");
            navigate('/login');
        }
    }

    console.log("SignUp");
    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
                <Col lg="4" className="shadow-lg p-4">
                    <h3 className='text-center'>Sign Up</h3>
                    <Form method='POST'>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i className="fa-solid fa-user"></i></InputGroup.Text>
                                <Form.Control type="text" placeholder="Enter your name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputs}
                                />
                            </InputGroup>

                        </Form.Group>
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
                            <Form.Label>User Type</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><i className="fa-solid fa-users"></i></InputGroup.Text>
                                <Form.Select
                                    name="userType"
                                    value={user.userType}
                                    onChange={handleInputs}
                                >
                                    <option>Select User Type</option>
                                    <option value="Learner">Learner</option>
                                    <option value="Instructor">Instructor</option>
                                </Form.Select>
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
                            <Button variant="success" className="px-5" type="submit" onClick={postData}>Sign Up</Button>
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