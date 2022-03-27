import { Col, Container, Row, Accordion, ListGroup, Tabs, Tab,Ratio } from "react-bootstrap";
import Navigation from "../components/Navigation";
import ReactPlayer from 'react-player'
import { useState } from "react";

function Course() {

    const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=RGKi6LSPDLU&t=552s&ab_channel=CodeWithHarry")

    return (
        <>
            <Navigation />
            <Container fluid className="py-2">
                <Row>
                    <Col lg="9">
                        <Container fluid className="bg-dark w-100 px-lg-5 px-sm-0">
                            <Ratio aspectRatio="16x9" className="px-lg-5 px-sm-0">
                                <ReactPlayer
                                    url={videoUrl}
                                    width="100%" height="100%"
                                    controls={true}
                                />
                            </Ratio>

                        </Container>
                        <Tabs defaultActiveKey="content" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="content" title="Content">
                                O thou, my lovely boy, who in thy power Dost hold Time's fickle glass, his fickle hour; Who hast by waning grown, and therein show'st Thy lovers withering, as thy sweet self grow'st. If Nature, sovereign mistress over wrack, As thou goest onwards, still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace and wretched minutes kill. Yet fear her, O thou minion of her pleasure! She may detain, but not still keep, her treasure:
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
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h6>Section 1: React.js Basic </h6>
                                </Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <ListGroup as="ul">
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            action
                                            onClick={() => setVideoUrl("https://www.youtube.com/watch?v=RGKi6LSPDLU&t=552s&ab_channel=CodeWithHarry")}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            action
                                            onClick={() => setVideoUrl("https://www.youtube.com/watch?v=xvm3X1oyTL8")}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h6>Section 2: React.js Advance </h6></Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <ListGroup as="ul">
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            action
                                            onClick={() => alert("fhh")}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">1. What is React?</div>
                                                <span><i class="fa-solid fa-circle-play"></i> 30min</span>
                                            </div>

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Course;