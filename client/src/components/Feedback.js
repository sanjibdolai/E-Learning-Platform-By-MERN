import { useEffect, useState } from "react";
import { Col, Row, Stack, ProgressBar, ListGroup, Button, Container } from "react-bootstrap";
import Rating from "react-rating";
import { getAverageRating, getRatingWiseRatesCount, getRatingWiseRatesPercentage } from "../utilities/util";
import ReviewModal from "./ReviewModal";
import UserReview from "./UserReview";
function Feedback({ courseId }) {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(5);
    const [ratingWiseRatesCount, setRatingWiseRatesCount] = useState({});
    const [ratingWiseRatesPercentage, setRatingWiseRatesPercentage] = useState({});
    const getReviewsData = async () => {

        try {
            const res = await fetch(`/api/reviews/${courseId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!res.status === 200) {
                throw new Error(res.error)
            }
            const data = await res.json();
            console.log(data);
            setAverageRating(getAverageRating(data.reviews));
            setRatingWiseRatesCount(getRatingWiseRatesCount(data.reviews));
            setRatingWiseRatesPercentage(getRatingWiseRatesPercentage(data.reviews));
            setReviews(data.reviews);


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getReviewsData();
    }, []);

    return (
        <>
            <h3>Learners Feedback</h3>
            <Row>
                <Col xs="3">
                    <Stack direction="vertical" gap={0} className="text-center">
                        <h1>{averageRating}</h1>
                        <Rating
                            readonly={true}
                            initialRating={averageRating}
                            emptySymbol={"fa-regular fa-star text-warning fs-6"}
                            fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        <span>({ratingWiseRatesCount["total"]})</span>
                        <span>Course Rating</span>
                    </Stack>
                </Col>
                <Col xs="9">
                    <Row>
                        <Col xs="7">
                            <ProgressBar style={{ "width": "100%" }} variant="warning" now={ratingWiseRatesPercentage[5]} className="" />
                        </Col>
                        <Col xs="3">
                            <Rating
                                readonly={true}
                                initialRating={5}
                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        </Col>
                        <Col xs="auto">
                            <span>({ratingWiseRatesCount[5]})</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <ProgressBar style={{ "width": "100%" }} variant="warning" now={ratingWiseRatesPercentage[4]} className="" />
                        </Col>
                        <Col xs="3">
                            <Rating
                                readonly={true}
                                initialRating={4}
                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        </Col>
                        <Col xs="auto">
                            <span>({ratingWiseRatesCount[4]})</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <ProgressBar style={{ "width": "100%" }} variant="warning" now={ratingWiseRatesPercentage[3]} className="" />
                        </Col>
                        <Col xs="3">
                            <Rating
                                readonly={true}
                                initialRating={3}
                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        </Col>
                        <Col xs="auto">
                            <span>({ratingWiseRatesCount[3]})</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <ProgressBar style={{ "width": "100%" }} variant="warning" now={ratingWiseRatesPercentage[2]} className="" />
                        </Col>
                        <Col xs="3">
                            <Rating
                                readonly={true}
                                initialRating={2}
                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        </Col>
                        <Col xs="auto">
                            <span>({ratingWiseRatesCount[2]})</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <ProgressBar style={{ "width": "100%" }} variant="warning" now={ratingWiseRatesPercentage[1]} className="" />
                        </Col>
                        <Col xs="3" className="mb-1">
                            <Rating
                                readonly={true}
                                initialRating={1}
                                emptySymbol={"fa-regular fa-star text-warning fs-6"}
                                fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        </Col>
                        <Col xs="auto">
                            <span>({ratingWiseRatesCount[1]})</span>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col xs="6">
                    <h3>Reviews</h3>
                </Col>
                <Col xs="6" className="text-end">
                    <Button variant="info" onClick={() => setShowReviewModal(true)}>Add Review</Button>
                    <ReviewModal
                        show={showReviewModal}
                        courseId={courseId}
                        setShowReviewModal={(val) => {
                            setShowReviewModal(val);
                            getReviewsData();
                        }}
                    />
                </Col>
            </Row>

            <ListGroup variant="flush">
                {reviews.map((review, index) =>
                    <ListGroup.Item key={index}>
                        <UserReview review={review} />
                    </ListGroup.Item>
                )}


            </ListGroup>
        </>
    );
}
export default Feedback;