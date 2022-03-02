import {Button, Card } from "react-bootstrap";

function CourseCard(){
    return (

        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="logo512.png" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
    );
}
export default CourseCard;