import { useState } from "react";
import { Col, Form, Button, Modal, Container, ProgressBar, Row, Stack, Image, ListGroup } from "react-bootstrap";
import Rating from "react-rating";

function ReviewModal({ review, show, setShowReviewModal,courseId }) {
    const [reviewData,setReviewData]=useState({"courseId":courseId,"comment":"","rating":0});

    

    const saveReview=async(e)=>{
        console.log(reviewData);
        
        var saveReviewURL="/api/addreview";
        if(review){
            saveReviewURL="/api/updatereview";
        }
        try {
            const res = await fetch(saveReviewURL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  credentials: "include",
                body: JSON.stringify({
                    ...reviewData
                  })
            });
      
            if (!res.status === 200) {
                throw new Error(res.error)
            }
            const data = await res.json();
            console.log(data);
            
            
            
      
        } catch (error) {
            console.log(error);
        }
        setShowReviewModal(false);
    }


    return (
        <>
            <Modal show={show} onHide={() => {
                setShowReviewModal(false);
            }}
                backdrop="static"
                dialogClassName="mw-100 modal-900w"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <h4>How would you rate this course? <span className="text-danger">*</span></h4>
                        <Row>
                            <Col>
                                <Rating
                                    readonly={false}
                                    initialRating={review ? review.rating:reviewData.rating}
                                    emptySymbol={"fa-regular fa-star text-warning fs-2"}
                                    fullSymbol={"fa-solid fa-star text-warning fs-2"} 
                                    onChange={(value)=>setReviewData({ ...reviewData, rating:value})}
                                    />
                                <Form.Group className="mt-3" >
                                    <Form.Label><h4>Comment</h4></Form.Label>
                                    <textarea className="form-control" rows="5" placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
                                        name="comment"
                                        value={review ? review.comment:reviewData.comment}
                                        onChange={(e)=>setReviewData({ ...reviewData, comment:e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={saveReview}>
                        <i className="fa fa-save"></i> {" "} Save & Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ReviewModal;