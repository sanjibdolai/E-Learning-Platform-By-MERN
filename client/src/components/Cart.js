import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Stack, Form, InputGroup, Button, FormControl, Image, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, getAllCourses } from "../utilities/commonfunctions";
import displayRazorpay from "../utilities/PaymentGateway";
import { currencyFormat, getCartCount, getSubTotalPrice, getTotalCourseDuration,getTotalLessions, loadScript } from "../utilities/util";
import MultiCarousel from "./MultiCarousel";

function Cart() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [saveForLaterItems, setSaveForLaterItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    const loadCartPage=() => {
        getCartItems((data)=>{
            setCartItems(data.filter(e=> e.cartStatus==='Cart'));
            setSaveForLaterItems(data.filter(e=> e.cartStatus==='Save For Later'));
            setWishlistItems(data.filter(e=> e.cartStatus==='Wishlist'));
            getCartCount(data.filter(e=> e.cartStatus==='Cart'));
        });
        
        getAllCourses(setCourses);
        
    }
    
    useEffect(() => {
        loadCartPage();
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
        return;
    }, []);

    const moveToCart = async (cartId) => {
        const res = await fetch("/api/movetocart", {
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
        loadCartPage();
    }
    const saveForLater = async (cartId) => {
        const res = await fetch("/api/saveforlater", {
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
        loadCartPage();
    }
    const moveToWishlist = async (cartId) => {
        const res = await fetch("/api/movetowishlist", {
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
        loadCartPage();
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
            loadCartPage();
        }


    }
    

    const checkout=async () => {
        let obj={
            cartItems,
            amount:getSubTotalPrice(cartItems)
        }
        displayRazorpay(obj);
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
                                                                <span>{getTotalCourseDuration(item.course)} total length • {getTotalLessions(item.course)} lessions • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => saveForLater(item._id)} className="text-decoration-none text-info">Save for Later</a>
                                                                    <a href="javascript:void(0)" onClick={() => moveToWishlist(item._id)} className="text-decoration-none text-info">Move to Wishlist</a>
                                                                </Stack>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Row>
                                    <Row className="border-top">
                                        <h5 className="text-end ms-auto">Subtotal ({cartItems.length} item): {currencyFormat(getSubTotalPrice(cartItems))}</h5>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card >
                                <Card.Body>
                                    <Stack direction="horizontal" gap={3}>
                                        <h4 className="">Subtotal ({cartItems.length} item):</h4>
                                        <h4 className="text-end ms-auto">{currencyFormat(getSubTotalPrice(cartItems))}</h4>
                                    </Stack>
                                    <Card.Subtitle className="mb-2 text-muted text-end text-decoration-line-through"><span>{currencyFormat(2000)}</span></Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted text-end">80% off</Card.Subtitle>
                                    <Button variant="info" size="lg" className="w-100 my-3 text-white" onClick={checkout}>
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
                {saveForLaterItems.length > 0 &&
                    <Row className="mt-3">
                        <Col>
                            <Card >
                                <Card.Body>
                                    <Row className="border-bottom">
                                        <h4>Save for Later</h4>
                                    </Row>
                                    <Row>
                                        <ListGroup variant="flush">
                                            {saveForLaterItems.map(item =>

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
                                                                    <h5 >{item.course.courseType === 'Free' ? "Free" : currencyFormat(item.course.coursePrice)}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row className="">
                                                                <span>4.0 ***** (19 ratings)</span>
                                                                <span>{getTotalCourseDuration(item.course)} total length • {getTotalLessions(item.course)} lessions • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => moveToCart(item._id)} className="text-decoration-none text-info">Move to Cart</a>
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
                {wishlistItems.length > 0 &&
                    <Row className="mt-3">
                        <Col>
                            <Card >
                                <Card.Body>
                                    <Row className="border-bottom">
                                        <h4>Recently Wishlisted</h4>
                                    </Row>
                                    <Row>
                                        <ListGroup variant="flush">
                                            {wishlistItems.map(item =>

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
                                                                    <h5 >{item.course.courseType === 'Free' ? "Free" : currencyFormat(item.course.coursePrice)}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row className="">
                                                                <span>4.0 ***** (19 ratings)</span>
                                                                <span>{getTotalCourseDuration(item.course)} total length • {getTotalLessions(item.course)} lessions • Beginner</span>
                                                                <Stack
                                                                    direction="horizontal"
                                                                    gap={3}
                                                                >
                                                                    <a href="javascript:void(0)" onClick={() => removeFromCart(item._id)} className="text-decoration-none text-info">Remove</a>
                                                                    <a href="javascript:void(0)" onClick={() => moveToCart(item._id)} className="text-decoration-none text-info">Move to Cart</a>
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
                        <MultiCarousel items={courses}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Cart;