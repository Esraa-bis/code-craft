import React, { useState } from "react";
import styles from "../assets/css/ReviewsAndRating.module.css";

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
const ReviewsAndRating = ({ currentUser, reviews }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userReviews, setUserReviews] = useState(reviews);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && reviewText.trim() !== "") {
      const newReview = {
        userName: currentUser.name,
        userProfilePicture: currentUser.profilePicture,
        rating,
        reviewText,
      };
      setUserReviews([newReview, ...userReviews]);
      setRating(0);
      setReviewText("");
    }
  };

  return (
    <div className={styles.reviewsAndRating}>
      <h3>Reviews</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </div>
        <div>
          <textarea
            value={reviewText}
            rows="4"
            className={styles.textarea}
            placeholder="Write your review......."
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Review
        </button>
      </form>

      <div className={styles.reviewsList}>
        {userReviews.map((review, index) => (
          <div key={index} className={styles.reviewItem}>
            <div className={styles.ratingAndProfileInfo}>
              <div className={styles.profileInfoAndRating}>
                <div className={styles.profileInfo}>
                  <img
                    src={review.userProfilePicture}
                    alt={`${review.userName}'s profile`}
                    className={styles.profilePicture}
                  />
                  <h5>{review.userName}</h5>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <div>
              <p>{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAndRating;
