import { memo, useEffect, useState } from "react";
import { Button, Card, Stack, Badge, ProgressBar, Row, Col } from "react-bootstrap";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { currencyFormat } from "../utilities/util";
function CourseCard({ item ,courseProgressPercentage}) {
  const navigate = useNavigate();

  
  return (
      <>
      {item &&
        <Card className="course-card w-100 m-1" >
            
                <Card.Img variant="top" className="course-card-image" src={`/uploads/images/${item.courseImage}`}/>
            
            <Card.Body>
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
              <span className="float-end">
                {item.courseType === 'Free' ? "Free" : currencyFormat(item.coursePrice)}
              </span>
              <Card.Text className="mt-2">
                Enrolled: 200 
                <Link to={"/course/" + item._id} className="float-end text-success ms-2"><i className="fa fa-eye fs-4"></i></Link>
                <span  className="float-end text-success" ><i className="fa fa-edit fs-4"></i></span>
                
                </Card.Text>
            </Card.Body>
        </Card>
      }
    </>
  );
}
export default memo(CourseCard);