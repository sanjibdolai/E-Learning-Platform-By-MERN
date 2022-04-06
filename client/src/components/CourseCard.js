import { memo, useState } from "react";
import { Button, Card, Stack,Badge } from "react-bootstrap";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { currencyFormat } from "../utilities/currencyFormat";
function CourseCard({ item }) {
  //console.log("CourseCard");
  const [wish, setWish] = useState("far");
  return (
    <>
      {item &&
        <Card className="course-card w-100 m-1" >
          <Link
            to={"/course/" + item._id}
            className="text-decoration-none"
          >
            <Card.Img variant="top" src={`/uploads/images/${item.courseImage}`} style={{ height: '10rem' }} />
          </Link>
          <Card.Body>
            <Link
              to={"/course/" + item._id}
              className="text-decoration-none text-success"
            >
              <span class="badge bg-info status-indicator-style" ><span >New</span></span>
              <Badge bg="secondary" className="float-end">Best Seller</Badge>
              <Card.Title className="course-card-course-title" title={item.courseTitle}>{item.courseTitle}</Card.Title>
              
              <Card.Text>
                {item.instructor.name}
              </Card.Text>
              <span className="text-warning">3.7 </span>
              
              <Rating
                readonly={true}
                initialRating={3.7}
                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
              <span > (200)</span>
              <Card.Text className="mt-2">
              {item.courseType==='Free'?"Free": currencyFormat(item.coursePrice)}
              </Card.Text>
            </Link>
            <Stack direction="horizontal" gap={3} className="mt-3">
              <Button variant="success" className="w-100 me-auto"><i className="fas fa-cart-plus"></i> Add To Cart</Button>
              <span
                className="text-danger float-end pt-1 spanWisListBtn"
                title="Add To Wish List"
                onMouseEnter={() => setWish("fas")}
                onMouseLeave={() => setWish("far")}>
                <i className={wish + " fa-heart fs-3"}></i>
              </span>
            </Stack>

          </Card.Body>
        </Card>
      }
    </>
  );
}
export default memo(CourseCard);