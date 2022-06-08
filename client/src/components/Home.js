import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Row, Carousel, Col, Container } from "react-bootstrap";
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
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="First slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Row>


      <Row className="mt-4">
        <MultiCarousel items={courses}/>
      </Row>
      <Row className="mt-3 px-4">
          {courses.map((item,index) => <Col lg="3" md="6" className="p-2" key={index}><CourseCard item={item}/></Col>)}
      </Row>
      
      </Suspense>
      
    </Container >
  );
}

export default memo(Home);