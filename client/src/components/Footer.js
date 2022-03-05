import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="page-footer font-small blue pt-4">
            <Container fluid>
                <Row>
                    <Col>
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>Here you can use rows and columns to organize your footer content.</p>
                    </Col>
                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <Col>
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Link 1</a></li>
                            <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Link 1</a></li>
                            <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
                <a href="/">E-Learning</a>
            </div>

        </footer>
    );
};

export default Footer;