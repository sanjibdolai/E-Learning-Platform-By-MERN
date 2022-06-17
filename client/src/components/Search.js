import { memo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllCourses } from "../utilities/commonfunctions";
import CourseCard from "./CourseCard";

const Search = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        getAllCourses(setCourses);
    
        return;
    }, []);

    return (
        <Container fluid>
            <Row >
                <Col className="text-center">
                </Col>
            </Row>
            <Row className="mt-3 px-4">
                {courses.map((item, index) => <Col lg="3" md="6" className="p-2" key={index}><CourseCard item={item} /></Col>)}
            </Row>
        </Container>
    );
};

export default memo(Search);