import { useState } from "react";
import { Accordion, Button, Card, useAccordionButton, Stack, ListGroup, Badge } from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <h5
            className="w-100 me-auto"
            onClick={decoratedOnClick}
        >
            {children}
        </h5>
    );
}
function Topics({ topics }) {
    return (
        <Accordion>
            {topics.map((topic, index) =>
                <Card key={index}>
                    <Card.Header>
                        <Stack direction="horizontal" gap={2}>
                            <CustomToggle eventKey={"topic" + index} >{topic.topicName}</CustomToggle>
                            <div className="vr" />
                            <Button size="sm" variant="success" ><i className="fas fa-edit"></i></Button>
                            <Button size="sm" variant="danger" ><i className="fa-solid fa-trash-can"></i></Button>
                            <div className="vr" />
                            <span className="ms-3"><i className="fa-solid fa-angle-down"></i></span>
                        </Stack>
                    </Card.Header>
                    <Accordion.Collapse eventKey={"topic" + index}>
                        <Card.Body>
                        <ListGroup as="ol" numbered>
                                {topic.lessions && topic.lessions.map((lession, inx) =>
                                    
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex "
                                        key={inx}
                                    >
                                        <div className="p-0 flex-grow-1 bd-highlight">
                                            <h6 className="px-2">Flex item</h6>
                                            <span className="px-2"><i class="fa-solid fa-circle-play"></i> 30min</span>
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <Button size="sm" variant="success" ><i className="fas fa-edit"></i></Button>
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <Button size="sm" variant="danger" ><i className="fa-solid fa-trash-can"></i></Button>
                                        </div>
    
    
                                    </ListGroup.Item>
                                
                                )}
                            </ListGroup>
                            

                            <Button>Add Lession</Button>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    );
}
export default Topics;