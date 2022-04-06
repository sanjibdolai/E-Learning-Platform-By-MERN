import { Col, Container, Row, Accordion, ListGroup, Tabs, Tab, Ratio, Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

import ReactPlayer from 'react-player'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import AuthNav from "../components/AuthNav";

function Course() {

    const [course, setCourse] = useState({});
    const [currentLession, setCurrentLession] = useState({});
    const params = useParams();

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
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container fluid className="px-5">
                    <Navbar.Brand as={Link} to="/">
                        <Logo width="40rem" height="40rem" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto" >
                            <NavItem >
                                <h3>{course.courseTitle}</h3>
                            </NavItem>
                        </Nav>
                        <Nav className='my-sm-3 my-lg-auto'>
                            <AuthNav />
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <Container fluid className="py-2">
                <Row>
                    <Col lg="9">
                        <Container fluid className="bg-dark w-100 px-lg-5 px-sm-0">
                            <Ratio aspectRatio="16x9" className="px-lg-5 px-sm-0">
                                <ReactPlayer
                                    url={currentLession.lessionVideoURL}
                                    width="100%" height="100%"
                                    controls={true}
                                />
                            </Ratio>

                        </Container>
                        <Tabs defaultActiveKey="content" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="content" title="Content">
                               <div dangerouslySetInnerHTML={{ __html: currentLession.lessionContent }} />
                            </Tab>
                            <Tab eventKey="notes" title="Notes">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
                            </Tab>

                            <Tab eventKey="discussion" title="Discussion">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
                            </Tab>
                            <Tab eventKey="tools" title="Learning Tools">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
                            </Tab>

                            <Tab eventKey="overview" title="Course Overview">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
                            </Tab>
                        </Tabs>

                    </Col>
                    <Col lg="3">
                        <Accordion >
                            {course.topics && course.topics.map((topic, index) =>
                                <Accordion.Item key={index} eventKey={topic._id}>
                                    <Accordion.Header>
                                        <h6>Section 1: {topic.topicName}</h6>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <ListGroup as="ul">
                                            {topic.lessions.map((lession, inx) =>
                                                <ListGroup.Item
                                                key={inx}
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start"
                                                    action
                                                    onClick={() => setCurrentLession({ ...lession })}
                                                >
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{inx + 1}. {lession.lessionTitle}</div>
                                                        <span><i className="fa-solid fa-circle-play"></i> {lession.lessionDuration}min</span>
                                                    </div>

                                                </ListGroup.Item>
                                            )}

                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                           
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Course;