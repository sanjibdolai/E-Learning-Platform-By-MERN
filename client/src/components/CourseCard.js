import { memo, useState, useEffect } from "react";
import { Button, Card, Stack, Badge } from "react-bootstrap";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, getEnrolledCourses } from "../utilities/commonfunctions";
import { currencyFormat } from "../utilities/util";
function CourseCard({ item }) {
  //console.log("CourseCard");
  const [wish, setWish] = useState("far");
  const [cartItems, setCartItems] = useState([]);
  const [saveForLaterItems, setSaveForLaterItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [enrolledcourse, setEnrolledcourse] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    getAllData();
    return;
  }, []);

  const getAllData = () => {
    getEnrolledCourses((data) => {
      setEnrolledcourse(data);
    });
    getCartItems((data) => {
      setCartItems(data.filter(e => e.cartStatus === 'Cart'));
      setSaveForLaterItems(data.filter(e => e.cartStatus === 'Save For Later'));
      setWishlistItems(data.filter(e => e.cartStatus === 'Wishlist'));
    });
    
  }

  const itemIsInCart = (itemId) => {
    return cartItems.find(e => e.course._id === itemId) ? true : false;
  }
  const itemIsItEnrolled = (itemId) => {
    return enrolledcourse.find(e => e.courseId._id === itemId) ? true : false;
  }
  const addToCart = async (e, courseId) => {
    e.preventDefault();
    const res = await fetch("/api/addtocart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        courseId
      })
    });




    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Invalid.");
    } else {
      console.log("Successfully Added.");
      getAllData();
    }


  }
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
              <span className="badge bg-info status-indicator-style" ><span >New</span></span>
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
                {item.courseType === 'Free' ? "Free" : currencyFormat(item.coursePrice)}
              </Card.Text>
            </Link>
            <Stack direction="horizontal" gap={3} className="mt-3">

              {itemIsItEnrolled(item._id) ?
                <Button variant="success" className="w-100 "
                  onClick={e => navigate("/learner/course/" + item._id)}
                ><i className="fas fa"></i>Resume</Button>
                :
                itemIsInCart(item._id) ?
                  <>
                    <Button variant="success" className="w-100 me-auto"
                      onClick={e => navigate("/cart")}
                    ><i className="fas fa"></i> Go To Cart</Button>
                    <span
                      className="text-danger float-end pt-1 spanWisListBtn"
                      title="Add To Wish List"
                      onMouseEnter={() => setWish("fas")}
                      onMouseLeave={() => setWish("far")}>
                      <i className={wish + " fa-heart fs-3"}></i>
                    </span>
                  </>
                  :
                  <>
                    <Button variant="success" className="w-100 me-auto"
                      onClick={e => addToCart(e, item._id)}
                    ><i className="fas fa-cart-plus"></i> Add To Cart</Button>
                    <span
                      className="text-danger float-end pt-1 spanWisListBtn"
                      title="Add To Wish List"
                      onMouseEnter={() => setWish("fas")}
                      onMouseLeave={() => setWish("far")}>
                      <i className={wish + " fa-heart fs-3"}></i>
                    </span>
                  </>

              }
            </Stack>

          </Card.Body>
        </Card>
      }
    </>
  );
}
export default memo(CourseCard);