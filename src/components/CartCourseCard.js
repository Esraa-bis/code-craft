import { Link } from "react-router-dom";
import styles from "../assets/css/Cart.module.css";
import { sweetAlert } from "../services/sweetalert";
import { removeFromCart } from "../services/course";
function CartCourseCard(course) {
  async function handleRemoveFromCart(courseId) {
    try {
      const response = await removeFromCart(courseId);

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
    <div className={styles.CartCard}>
      <img src={course.img} alt={course.title} className={styles.img} />
      <h2 className={styles.title}>{course.title}</h2>
      <p className={styles.description}>{course.description}</p>
      <div className={styles.details}>
        <div className={styles.detail}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6${styles.icon} ${styles.PriceIcon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className={styles.Price}>{course.price} EGP</p>
        </div>
        <div className={styles.CardBtns}>
          <Link
            to={`/ViewCourse?courseId=${course?._id}`}
            className={styles.ViewCourseBTN}
          >
            View Course
          </Link>
          <button
            className={styles.removeBTN}
            onClick={() => handleRemoveFromCart(course?._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCourseCard;
