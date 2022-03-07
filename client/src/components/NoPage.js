import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

const NoPage = () => {
  console.log("NoPage");
    return (
      <Container >
        <Row >
          <Col className="text-center">
          <h1>404 Page Not Found</h1>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default memo(NoPage);