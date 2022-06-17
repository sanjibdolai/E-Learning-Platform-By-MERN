import { Col, ProgressBar, Row, Stack, Image, ListGroup } from "react-bootstrap";
import Rating from "react-rating";

function UserReview({review}) {
    return (
        <>
            <Stack
                direction="horizontal"
                gap={3}
                className="my-3"
            >

                <Image
                    alt="Logo"
                    src="/logo.png"
                    width="60rem"
                    height="60rem"
                    roundedCircle={true}
                    className="mt-0"
                />
                <Stack direction="vertical" gap={2}>
                    <span className="fs-5"><b>{review.userId.name}</b></span>
                    <div>
                        <Rating
                            readonly={true}
                            initialRating={review.rating}
                            emptySymbol={"fa-regular fa-star text-warning fs-6"}
                            fullSymbol={"fa-solid fa-star text-warning fs-6"} />
                        <span> a month ago</span>
                    </div>
                    <span>{review.comment}</span>

                </Stack>
            </Stack>
        </>
    );
}
export default UserReview;