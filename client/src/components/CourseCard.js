import { memo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "react-rating";
function CourseCard(props) {
  //console.log("CourseCard");
  const [wish,setWish]=useState("far");
  return (
    <Card className="course-card w-100 m-1" >
      <Card.Img variant="top" src="logo512.png" style={{ height: '10rem' }} />
      <Card.Body>
        <Card.Title>Course Title</Card.Title>
        <Card.Text>
          Instructor Name
        </Card.Text>
        <span className="text-warning">3.7 </span>
        <Rating 
        readonly={true} 
        initialRating={3.7} 
        emptySymbol={"fa-regular fa-star text-warning fs-6"} 
        fullSymbol={"fa-solid fa-star text-warning fs-6"}/>
        <span > (200)</span>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" className="btn btn-success"><i className="fas fa-cart-plus"></i> Add To Cart</Button>
        <span 
        className="text-danger float-end pt-1 spanWisListBtn" 
        title="Add To Wish List" 
        onMouseEnter={()=> setWish("fas")}
        onMouseLeave={()=> setWish("far")}>
        <i className={wish+" fa-heart fs-3"}></i>
        </span>
      </Card.Footer>
    </Card>
  );
}
export default memo(CourseCard);