import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/ViewCourse.module.css";
import {
  addToCart,
  coursePreview,
  freeEnroll,
  updateRecentlyViewed,
} from "../services/course";
import { convertMinutes } from "../services/generalFunctions";
import { addReview, courseReview } from "../services/reviews";

import { sweetAlert } from "../services/sweetalert";

let courseLoading = false;
let reviewsLoading = false;
let pageVisited = false;

function ViewCourse() {
  const [reviews, setReviews] = useState([]);
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [courseId] = useState(() => {
    return new URLSearchParams(window.location.search).get("courseId");
  });

  useEffect(() => {
    if (loading || pageVisited) return;
    pageVisited = true;
    updateRecentlyViewed(courseId)
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => {
        pageVisited = false;
      });
  }, [courseId]);

  useEffect(() => {
    if (loading || courseLoading) return;
    courseLoading = true;
    setLoading(true);
    coursePreview(courseId)
      .then((response) => {
        if (response.success) {
          setCourse(response.course);
          setIsEnrolled(response.isEnrolled);
        } else {
          setError("Failed to fetch course preview");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => {
        courseLoading = false;
      });
    if (reviewsLoading) return;
    reviewsLoading = true;
    setLoading(true);
    courseReview(courseId)
      .then((response) => {
        if (response.success) {
          setReviews(response.reviews);
        } else {
          setError("Failed to fetch Categories");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
      .finally(() => {
        reviewsLoading = false;
      });
  }, [courseId]);

  // to format the index
  function formatIndex(index) {
    return `#${index.toString().padStart(2, "0")}`;
  }
  // handle add to cart
  async function handleAddToCart(courseID) {
    try {
      const response = await addToCart(courseID);

      if (response && response.success) {
        sweetAlert({
          title: "Success!",
          text: response.message,
          icon: "success",
        });
      } else {
        throw new Error(
          response && response.message ? response.message : "Unknown error"
        );
      }
    } catch (error) {
      sweetAlert({
        title: "Error!",
        text: error.message || "An error occurred",
        icon: "error",
      });
    }
  }
  //formate the data
  function getFormattedDate(dateString) {
    if (!dateString) return null;
    return dateString.split("T")[0];
  }
  // rating and reviews
  // handle add rating
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const result = await addReview(courseId, reviewRate, reviewComment);
      setSuccess(true);
      setReviewRate(0);
      setReviewComment("");
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Error adding review. Please try again.");
    }
  };

  const handleStarClick = (rate) => {
    setReviewRate(rate);
  };

  // free enrollment
  // handle add to cart
  async function handleFreeEnroll(courseID) {
    try {
      const response = await freeEnroll(courseID);
      if (response && response.success) {
        sweetAlert({
          title: "Success!",
          text: response.message,
          icon: "success",
        });
      } else {
        throw new Error(
          response && response.message ? response.message : "Unknown error"
        );
      }
    } catch (error) {
      sweetAlert({
        title: "Error!",
        text: error.message || "An error occurred",
        icon: "error",
      });
    }
  }
  return (
    <>
      <section className={styles.CoursePreview}>
        <section className={styles.CourseDescription}>
          <div className={styles.NameAndDescription}>
            <h1 className={styles.Title}>{course?.courseName}</h1>
            <p className={styles.description}>{course?.desc}</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>
                  Rating:{course?.rate || "-"}
                  <FontAwesomeIcon
                    icon={faStar}
                    className={` icon rating-icon `}
                  />
                </p>
              </div>
            </div>
            <div className={styles.detail}>
              <p>
                Created by:
                <Link>
                  {course?.addedBy.firstName} {course?.addedBy.lastName}
                </Link>
              </p>
            </div>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>
                  Last Update:
                  <span>
                    {getFormattedDate(course?.updatedAt) ||
                      getFormattedDate(course?.createdAt) ||
                      "Date not available"}
                  </span>
                </p>
              </div>

              <div className={styles.detail}>
                <p>
                  Level: <span>{course?.level}</span>
                </p>
              </div>
              <div className={styles.detail}>
                <p>
                  Category: <span>{course?.categoryId?.name}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.CoursePreviewCard}>
            <Link
              to={
                isEnrolled
                  ? `/CourseVideos?courseId=${course?._id}`
                  : `/ViewCourse?courseId=${course?._id}`
              }
              className={styles.link}
            >
              <img
                src={course?.image.url}
                alt="course"
                className={styles.CoursesImg}
              />
              {isEnrolled ? (
                <FontAwesomeIcon icon={faPlay} className={` icon `} />
              ) : (
                ""
              )}
            </Link>
            {isEnrolled ? null : course?.appliedPrice === 0 ? null : (
              <h6 className={styles.price}>
                Price: {course?.appliedPrice} EGP
              </h6>
            )}
            {isEnrolled ? null : (
              <div className={styles.allBtns}>
                <div className={styles.cartAndWishList}>
                  {course?.appliedPrice !== 0 && (
                    <div className={styles.innerDiv}>
                      <button
                        onClick={() => handleAddToCart(course?._id)}
                        className={styles.AddToCartIcon}
                      >
                        Add to Cart
                      </button>
                      <button className={styles.wishListIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className={styles.buyNow}
                  onClick={() => {
                    if (course?.appliedPrice === 0) {
                      handleFreeEnroll(course?._id);
                    }
                  }}
                >
                  {course?.appliedPrice === 0 ? (
                    "Enroll for free"
                  ) : (
                    <Link
                      to={`/Checkout?courseId=${course?._id}`}
                      className={styles.buyNowLink}
                    >
                      Buy Now
                    </Link>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
        <section>
          <div className={styles.Prerequisite}>
            <h3>Prerequisite</h3>
            <p> {course?.prerequisites}</p>
          </div>

          <div></div>
        </section>
        <section className={styles.mainContent}>
          <h3>Content</h3>
          <p>
            {course?.numOfVideos} lectures •
            {convertMinutes(course?.courseDuration)}
          </p>
          <ul>
            {/* {course?.videos.map((video, index) => (
              <li key={video._id}>
                <span>{formatIndex(index)} </span>
                {video.title}
              </li>
            ))} */}
            {course?.videos.map((video, index) => (
              <li key={video._id}>
                <span>{formatIndex(index)} </span>
                {index === 0 ? (
                  <Link to={video.video.url} target="_blank">
                    {video.title}
                  </Link>
                ) : (
                  video.title
                )}
              </li>
            ))}
          </ul>
        </section>
        <div className={styles.reviewsAndRating}>
          <h3>Reviews</h3>
          {isEnrolled ? (
            <form onSubmit={handleSubmit} className={styles.reviewForm}>
              <div className={styles.starRating}>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className={styles.starLabel}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleStarClick(ratingValue)}
                        className={styles.starInput}
                      />
                      <span
                        className={`${styles.star} ${
                          ratingValue <= reviewRate ? styles.filled : ""
                        }`}
                        role="img"
                        aria-label={`${ratingValue} stars`}
                      >
                        ★
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className={styles.commentContainer}>
                <textarea
                  className={styles.commentTextarea}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Please add your review here...."
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Add Review
              </button>
            </form>
          ) : null}
          <div className={styles.reviewsList}>
            {reviews?.map((review) => (
              <div key={review._id} className={styles.reviewItem}>
                <div className={styles.ratingAndProfileInfo}>
                  <div className={styles.profileInfoAndRating}>
                    <div className={styles.profileInfo}>
                      <img
                        src={review.userId.profile_pic.url}
                        alt={`${review.userId.firstName} ${review.userId.lastName}'s profile`}
                        className={styles.profilePicture}
                      />
                      <h5>
                        {review.userId.firstName} {review.userId.lastName}
                      </h5>
                    </div>
                    <StarRating rating={review.reviewRate} />
                  </div>
                </div>
                <div>
                  <p>{review.reviewComment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default ViewCourse;

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : ""}`}
          onClick={() => onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
