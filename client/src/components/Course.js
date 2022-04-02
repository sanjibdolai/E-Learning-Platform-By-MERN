import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Course(){
    return(
        <>
        <Container>
            <Row>
                <Col>
                <h2>Course Title</h2>

                </Col>
                <Col>
                </Col>
            </Row>
            <Row></Row>
        </Container>
        </>
    );
}

export default memo(Course);