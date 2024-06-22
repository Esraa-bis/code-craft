import styles from "../assets/css/AdminPage.module.css";

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${
            star <= rating ? styles.filled : styles.empty
          }`}
          onClick={() => onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
