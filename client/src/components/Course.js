import { memo, useState, useEffect, useContext } from "react";
import { Col, Container, Row, Breadcrumb, Badge, Stack, Accordion, Button, ListGroup, Card, Image, useAccordionButton, AccordionContext, ProgressBar, Form, InputGroup, FormControl } from "react-bootstrap";
import Rating from "react-rating";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../utilities/currencyFormat";
function CustomToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Stack
            direction="horizontal"
            className="p-2 "
            gap={2}
            onClick={decoratedOnClick}
            style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
        >
            <i className={isCurrentEventKey ? "mt-2 fa-solid fa-angles-up" : "mt-2 fa-solid fa-angles-down"}></i>
            {children}
        </Stack>
    );
}

function Course() {
    const [course, setCourse] = useState({});
    const params = useParams();
    const [wish, setWish] = useState("far");
    const getCourseDetails = async () => {

        try {
            const res = await fetch(`/api/course/${params.id}`, {
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
            setCourse({ ...data });

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getCourseDetails();
    }, []);
    return (
        <>
            <Container>
                <Row>
                    <Col lg="8">
                        <Row className="mt-3">
                            <Col>
                                <Breadcrumb>
                                    <Breadcrumb.Item
                                        href={"/courses/" + course.courseCategory}>
                                        {course.courseCategory}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item
                                        href={"/courses/" + course.courseCategory + '/' + course.courseSubCategory}>
                                        {course.courseSubCategory}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                                <h2>{course.courseTitle}</h2>
                                <Stack direction="horizontal" gap={3}>
                                    <Badge bg="warning" text="dark">
                                        Best Seller
                                    </Badge>
                                    <Stack direction="horizontal" gap={1}>
                                        <span className="text-warning">3.7 </span>
                                        <Rating
                                            readonly={true}
                                            initialRating={3.7}
                                            emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                            fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        <span > (200 Ratings)</span>
                                    </Stack>
                                    <span > 5,000 Students</span>
                                </Stack>
                                <Stack direction="horizontal" gap={2} className="mt-3">
                                    <span>Created By</span>
                                    <span className="text-info">{course.instructor ? course.instructor.name : ''}</span>
                                </Stack>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col >
                                <h3 className="ms-1">Course Content</h3>
                                <Stack direction="horizontal" gap={3} className="my-2 ms-1">
                                    <span>31 sections</span>
                                    <span>•</span>
                                    <span>572 lesstions</span>
                                    <span>•</span>
                                    <span>52h 37m total length</span>
                                </Stack>
                                <Accordion>
                                    {course.topics && course.topics.map((topic, index) =>
                                        <Card key={index}>
                                            <Card.Header className="p-0">
                                                <CustomToggle
                                                    eventKey={"topic" + index}

                                                >
                                                    <h5 className="me-auto">Section {index + 1}: {topic.topicName}</h5>
                                                    <span>10 Lessions</span>
                                                    <span>•</span>
                                                    <span>55 min</span>
                                                </CustomToggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={"topic" + index}>
                                                <Card.Body>
                                                    <ListGroup
                                                        variant="flush"
                                                        as="ul">
                                                        {topic.lessions.map((lession, inx) =>
                                                            <ListGroup.Item
                                                                key={inx}
                                                                as="li"
                                                                className="d-flex justify-content-between align-items-start"
                                                                action

                                                            >
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{inx + 1}. {lession.lessionTitle}</div>
                                                                    <span><i className="fa-solid fa-circle-play"></i> {lession.lessionDuration}min</span>
                                                                </div>

                                                            </ListGroup.Item>
                                                        )}

                                                    </ListGroup>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    )}
                                </Accordion>

                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col >
                                <h3>Description</h3>
                                <div>
                                    {course.courseDescription}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col >
                                <h3>Instructor</h3>
                                {course.instructor ? course.instructor.name : ''}

                                <Stack
                                    direction="horizontal"
                                    gap={3}
                                    className="my-3"
                                >

                                    <Image
                                        alt="Logo"
                                        src="/logo.png"
                                        width="120rem"
                                        height="120rem"
                                        fluid={true}
                                        roundedCircle={true}
                                    />
                                    <Stack direction="vertical" gap={2}>
                                        <span><i className="fa-solid fa-star"></i> 4.7 Instructor Rating</span>
                                        <span><i className="fas fa-trophy"></i> 358,875 Reviews</span>
                                        <span><i className="fas fa-user-friends"></i> 1,017,536 Students</span>
                                        <span><i className="fas fa-play-circle"></i> 30 Courses</span>
                                    </Stack>
                                </Stack>
                                <p>
                                    Stephen Grider has been building complex Javascript front ends for top corporations in the San Francisco Bay Area.  With an innate ability to simplify complex topics, Stephen has been mentoring engineers beginning their careers in software development for years, and has now expanded that experience onto Udemy, authoring the highest rated React course. He teaches on Udemy to share the knowledge he has gained with other software engineers.  Invest in yourself by learning from Stephen's published courses.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col >

                                <h3>Student Feedback</h3>
                                <Stack direction="horizontal" gap={3}>
                                    <div>
                                        <Stack direction="vertical" gap={0} >
                                            <h1>4.7</h1>
                                            <Rating
                                                readonly={true}
                                                initialRating={3.7}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                            <span>Course Rating</span>
                                        </Stack>
                                    </div>
                                    <Stack direction="vertical" gap={2} >
                                        <Stack direction="horizontal" gap={2}>
                                            <ProgressBar style={{ "width": "75%" }} variant="warning" now={50} className="me-auto" />
                                            <Rating
                                                readonly={true}
                                                initialRating={5}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2}>
                                            <ProgressBar style={{ "width": "75%" }} variant="warning" now={20} className="me-auto" />
                                            <Rating
                                                readonly={true}
                                                initialRating={4}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2}>
                                            <ProgressBar style={{ "width": "75%" }} variant="warning" now={15} className="me-auto" />
                                            <Rating
                                                readonly={true}
                                                initialRating={3}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2}>
                                            <ProgressBar style={{ "width": "75%" }} variant="warning" now={10} className="me-auto" />
                                            <Rating
                                                readonly={true}
                                                initialRating={2}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2}>
                                            <ProgressBar style={{ "width": "75%" }} variant="warning" now={5} className="me-auto" />
                                            <Rating
                                                readonly={true}
                                                initialRating={1}
                                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <h3>Reviews</h3>

                                <ListGroup variant="flush">
                                    <ListGroup.Item>

                                        <Stack
                                            direction="horizontal"
                                            gap={3}
                                            className="my-3"
                                        >

                                            <Image
                                                alt="Logo"
                                                src="/logo.png"
                                                width="60rem"
                                                height="60rem"
                                                roundedCircle={true}
                                                className="mt-0"
                                            />
                                            <Stack direction="vertical" gap={2}>
                                                <span className="fs-5"><b>Sanjib Dolai</b></span>
                                                <div>
                                                    <Rating
                                                        readonly={true}
                                                        initialRating={3.7}
                                                        emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                        fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                                    <span> a month ago</span>
                                                </div>
                                                <span>Its great learning experience</span>
                                                <small>Was this review helpful?</small>

                                            </Stack>
                                        </Stack>
                                    </ListGroup.Item>
                                    <ListGroup.Item>

                                        <Stack
                                            direction="horizontal"
                                            gap={3}
                                            className="my-3"
                                        >

                                            <Image
                                                alt="Logo"
                                                src="/logo.png"
                                                width="60rem"
                                                height="60rem"
                                                roundedCircle={true}
                                                className="mt-0"
                                            />
                                            <Stack direction="vertical" gap={2}>
                                                <span className="fs-5"><b>Sanjib Dolai</b></span>
                                                <div>
                                                    <Rating
                                                        readonly={true}
                                                        initialRating={3.7}
                                                        emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                        fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                                    <span> a month ago</span>
                                                </div>
                                                <span>Its great learning experience</span>
                                                <small>Was this review helpful?</small>

                                            </Stack>
                                        </Stack>
                                    </ListGroup.Item>
                                    <ListGroup.Item>

                                        <Stack
                                            direction="horizontal"
                                            gap={3}
                                            className="my-3"
                                        >

                                            <Image
                                                alt="Logo"
                                                src="/logo.png"
                                                width="60rem"
                                                height="60rem"
                                                roundedCircle={true}
                                                className="mt-0"
                                            />
                                            <Stack direction="vertical" gap={2}>
                                                <span className="fs-5"><b>Sanjib Dolai</b></span>
                                                <div>
                                                    <Rating
                                                        readonly={true}
                                                        initialRating={3.7}
                                                        emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                                        fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                                                    <span> a month ago</span>
                                                </div>
                                                <span>Its great learning experience</span>
                                                <small>Was this review helpful?</small>

                                            </Stack>
                                        </Stack>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="4">

                        <Card className="course-card w-100 mt-3 sticky-top" >

                            <Card.Img variant="top" src={`/uploads/images/${course.courseImage}`} style={{ height: '15rem' }} />

                            <Card.Body>
                                <Card.Text>
                                    <span className="fs-3 me-2">{currencyFormat(course.coursePrice)} </span>
                                    <span className="text-decoration-line-through me-2">{currencyFormat(3484)} </span>
                                    <span>52% off</span><br/>
                                    <span><i class="fa-solid fa-clock"></i> 2 days left at this price!</span>
                                </Card.Text>
                               
                                <Stack direction="horizontal" gap={3} className="mt-3">
                                    <Button variant="success" className="w-100 me-auto py-2">
                                        <i className="fas fa-cart-plus"></i> Add To Cart</Button>
                                    <span
                                        className="text-danger float-end py-1 spanWisListBtn"
                                        title="Add To Wish List"
                                        onMouseEnter={() => setWish("fas")}
                                        onMouseLeave={() => setWish("far")}>
                                        <i className={wish + " fa-heart fs-3"}></i>
                                    </span>
                                </Stack>
                                <Button variant="success" className="w-100 mt-3 py-2"> Buy Now</Button>
                                <div className="text-center my-2"><small >30-Day Money-Back Guarantee</small></div>

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
            </Container>
        </>
    );
}

export default memo(Course);