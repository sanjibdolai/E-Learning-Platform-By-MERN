import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Stack, Form, InputGroup, Button, FormControl, Image, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MultiCarousel from 'react-elastic-carousel';
import CourseCard from "./CourseCard";
import { currencyFormat } from "../utilities/util";

function Cart() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const getCartItems = async () => {
        try {
            const res = await fetch("/api/carts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!res.status === 200) {
                throw new Error(res.error)
            }
            const data = await res.json();
            setCartItems(data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCartItems();
        getCourses();
        return;
    }, []);

    const moveToCart = async (courseId) => {
        const res = await fetch("/api/movetocart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                courseId
            })
        });
    }
    const saveForLater = async (courseId) => {
        const res = await fetch("/api/saveforlater", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                courseId
            })
        });
    }
    const moveToWishlist = async (courseId) => {
        const res = await fetch("/api/movetowishlist", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                courseId
            })
        });

    }
    const removeFromCart = async (cartId) => {
        const res = await fetch("/api/removefromcart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                cartId
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("Invalid.");
        } else {
            getCartItems();
        }


    }
    const getSubTotalPrice = () => {
        let subTotalPrice = 0;
        console.log(cartItems);
        cartItems.forEach(item => {
            if (item.course.courseType != 'Free')
                subTotalPrice += item.course.coursePrice;
        });
        return subTotalPrice;
    }


    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 },
      ];
    const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await fetch("/courses", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      if (!res.status === 200) {
        throw new Error(res.error)
      }
      const data = await res.json();
      console.log(data);
      setCourses([...data]);

    } catch (error) {
      console.log(error);
    }

  }

    return (
        <>
            <Container fluid className="py-3">
                {cartItems.length > 0 ?
                    <Row>
                        <Col lg="8">
                            <Card >
                                <Card.Body>
                                    <Row className="border-bottom">
                                        <h2>Shopping Cart</h2>
                                    </Row>
                                    <Row>
                                        <ListGroup variant="flush">
                                            {cartItems.map(item =>

                                                <ListGroup.Item key={item._id}>
                                                    <div className="d-flex">

                                                        <div className="p-1">
                                                            <Image
                                                                alt="..."
                                                                src={"/uploads/images/" + item.course.courseImage}
                                                                width="180px"
                                                                height="120px"
                                                                fluid={true}
                                                            />
                                                        </div>
                                                        <div className="p-1 flex-grow-1">
                                                            <Row >
                                                                <Col xs="auto" className="me-auto">
                                                                    <Card.Title className="cart-course-title mb-0" title={item.course.courseTitle}>{item.course.courseTitle}</Card.Title>

                                                                    <span>By {item.course.instructor.name}</span>
                                                                </Col>
                                                                <Col xs="auto" >
                                                                    <h5>{item.course.courseType === 'Free' ? "Free" : currencyFormat(item.course.coursePrice)}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row className="">
                                                                <span>4.0 ***** (19 ratings)</span>
                                                                <span>2 total hours • 18 lectures • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => alert("hello")} className="text-decoration-none text-info">Save for Later</a>
                                                                    <a href="javascript:void(0)" onClick={() => alert("hello")} className="text-decoration-none text-info">Move to Wishlist</a>
                                                                </Stack>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Row>
                                    <Row className="border-top">
                                        <h5 className="text-end ms-auto">Subtotal ({cartItems.length} item): {currencyFormat(getSubTotalPrice())}</h5>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card >
                                <Card.Body>
                                    <Stack direction="horizontal" gap={3}>
                                        <h4 className="">Subtotal ({cartItems.length} item):</h4>
                                        <h4 className="text-end ms-auto">{currencyFormat(getSubTotalPrice())}</h4>
                                    </Stack>
                                    <Card.Subtitle className="mb-2 text-muted text-end text-decoration-line-through"><span>{currencyFormat(2000)}</span></Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted text-end">80% off</Card.Subtitle>
                                    <Button variant="info" size="lg" className="w-100 my-3 text-white">
                                        Checkout
                                    </Button>


                                    <Form.Group>
                                        <InputGroup>
                                            <FormControl
                                                placeholder="Enter Coupon"
                                            />
                                            <Button variant="info" >
                                                Apply
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col>
                            <Card >
                                <Card.Body className="text-center">
                                    <h4  >Your cart is empty. Keep shopping to find a course!</h4>
                                    <Link to="/" className="mt-3 btn btn-info text-white">
                                        Keep Shopping
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                {cartItems.length > 0 &&
                    <Row className="mt-3">
                        <Col>
                            <Card >
                                <Card.Body>
                                    <Row className="border-bottom">
                                        <h4>Save for Later</h4>
                                    </Row>
                                    <Row>
                                        <ListGroup variant="flush">
                                            {cartItems.map(item =>

                                                <ListGroup.Item key={item._id}>
                                                    <div className="d-flex">

                                                        <div className="p-1">
                                                            <Image
                                                                alt="..."
                                                                src={"/uploads/images/" + item.course.courseImage}
                                                                width="180px"
                                                                height="120px"
                                                                fluid={true}
                                                            />
                                                        </div>
                                                        <div className="p-1 flex-grow-1">
                                                            <Row >
                                                                <Col xs="auto" className="me-auto">
                                                                    <Card.Title className="cart-course-title mb-0" title="Python From Scratch & Selenium WebDriver QA Automation 2022">Python From Scratch & Selenium WebDriver QA Automation 2022</Card.Title>

                                                                    <span>By {item.course.instructor.name}</span>
                                                                </Col>
                                                                <Col xs="auto" >
                                                                    <h5 >{item.course.courseType === 'Free' ? "Free" : currencyFormat(item.course.coursePrice)}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row className="">
                                                                <span>4.0 ***** (19 ratings)</span>
                                                                <span>2 total hours • 18 lectures • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => alert("hello")} className="text-decoration-none text-info">Move to Cart</a>
                                                                </Stack>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                {cartItems.length > 0 &&
                    <Row className="mt-3">
                        <Col>
                            <Card >
                                <Card.Body>
                                    <Row className="border-bottom">
                                        <h4>Recently Wishlisted</h4>
                                    </Row>
                                    <Row>
                                        <ListGroup variant="flush">
                                            {cartItems.map(item =>

                                                <ListGroup.Item key={item._id}>
                                                    <div className="d-flex">

                                                        <div className="p-1">
                                                            <Image
                                                                alt="..."
                                                                src={"/uploads/images/" + item.course.courseImage}
                                                                width="180px"
                                                                height="120px"
                                                                fluid={true}
                                                            />
                                                        </div>
                                                        <div className="p-1 flex-grow-1">
                                                            <Row >
                                                                <Col xs="auto" className="me-auto">
                                                                    <Card.Title className="cart-course-title mb-0" title="Python From Scratch & Selenium WebDriver QA Automation 2022">Python From Scratch & Selenium WebDriver QA Automation 2022</Card.Title>

                                                                    <span>By {item.course.instructor.name}</span>
                                                                </Col>
                                                                <Col xs="auto" >
                                                                    <h5 >{item.course.courseType === 'Free' ? "Free" : currencyFormat(item.course.coursePrice)}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row className="">
                                                                <span>4.0 ***** (19 ratings)</span>
                                                                <span>2 total hours • 18 lectures • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => alert("hello")} className="text-decoration-none text-info">Move to Cart</a>
                                                                </Stack>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                <Row>
                    
                    <Col>
                        <h4>You might also like</h4>
                        <MultiCarousel breakPoints={breakPoints}>
                            {courses.map((item, index) => <CourseCard key={index} item={item} />)}
                        </MultiCarousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Cart;