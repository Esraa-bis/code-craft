import { Link } from "react-router-dom";
import styles from "../assets/css/Cart.module.css";
import { removeFromCart } from "../services/course";
import { sweetAlert } from "../services/sweetalert";
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
          <p className={styles.Price}>
            {" "}
            {course.price === 0 ? (
              "Free"
            ) : (
              <>
                <span className="price">{course.price}</span>
                <span className="currency"> EGP</span>
              </>
            )}
          </p>
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
