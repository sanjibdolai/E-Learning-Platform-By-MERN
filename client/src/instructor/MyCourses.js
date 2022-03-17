import { Col, Row } from "react-bootstrap";
import MultiCarousel from 'react-elastic-carousel';
import CourseCard from "../components/CourseCard";

function MyCourses(props) {
    const items = [
        { id: 1, title: 'item #1' },
        { id: 2, title: 'item #2' },
        { id: 3, title: 'item #3' },
        { id: 4, title: 'item #4' },
        { id: 5, title: 'item #5' },
        { id: 1, title: 'item #1' },
        { id: 2, title: 'item #2' },
        { id: 3, title: 'item #3' },
        { id: 4, title: 'item #4' },
        { id: 5, title: 'item #5' }
      ];
      const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 },
      ];
    return(
        <>
        <Row>
            <h3>Popular Courses</h3>
            <MultiCarousel breakPoints={breakPoints}>
          {items.map((item,index) => <CourseCard key={index}/>)}
        </MultiCarousel>
        </Row>
        </>
    );
}
export default MyCourses;