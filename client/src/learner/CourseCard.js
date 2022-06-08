import { memo, useState } from "react";
import { Button, Card, Stack, Badge, ProgressBar, Row, Col } from "react-bootstrap";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { currencyFormat } from "../utilities/util";
function CourseCard({ item }) {
  const navigate = useNavigate();
  
  return (
      <>
      {item &&
        <Card className="course-card w-100 m-1" >
            <Link
            to={"/learner/course/" + item._id}
            className="video-thumbnail text-decoration-none text-success">
            
                <Card.Img variant="top" className="course-card-image" src={`/uploads/images/${item.courseImage}`}/>
            
            <Card.Body>
                <Card.Title className="course-card-course-title" title={item.courseTitle}>{item.courseTitle}</Card.Title>
                <Card.Text>
                    {item.instructor.name}
                </Card.Text>
                <ProgressBar now={20} label={`${20}%`} />
                
            
            </Card.Body>
            
          </Link>
        </Card>
      }
    </>
  );
}
export default memo(CourseCard);