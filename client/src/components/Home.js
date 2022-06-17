import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Row, Carousel, Col, Container, Spinner } from "react-bootstrap";
import { getAllCourses } from "../utilities/commonfunctions";
const MultiCarousel = lazy(() => import('./MultiCarousel'));
const CourseCard = lazy(() => import('./CourseCard'));

function Home() {

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCourses(setCourses);
    return;
  }, []);


  return (
    <Container fluid>
      <Suspense fallback={<div>Loading...</div>}>
        <Row >
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                height={300}
                src="https://t4.ftcdn.net/jpg/02/36/21/57/360_F_236215734_DtGW6nWViuE5ccmbv88ITDIvKKQvVoqZ.jpg"
                alt="First slide"
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                height={300}
                src="https://aieinfo.com/images/testimonials/e2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                height={300}
                src="https://blog.commlabindia.com/wp-content/uploads/2017/04/why-elearning.png"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Row>

        {(courses && courses.length > 0) ?
          <>
            <Row className="mt-4">
              <MultiCarousel items={courses} />
            </Row>
            <Row className="mt-3 px-4">
              {courses.map((item, index) => <Col lg="3" md="6" className="p-2" key={index}><CourseCard item={item} /></Col>)}
            </Row>
          </>
          :
          <Row>
            <Col className="text-center mt-5">
            <Spinner animation="border" variant="info" />
            </Col>
          </Row>
          
          
        }

      </Suspense>

    </Container >
  );
}

export default memo(Home);