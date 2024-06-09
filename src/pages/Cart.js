import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/Cart.module.css";
import { removeFromCart, userCart } from "../services/course";
import { sweetAlert } from "../services/sweetalert";

function Cart() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loaded || loading) return;
    setLoading(true);
    userCart()
      .then((response) => {
        if (response.success) {
          setCourses(response.Cart.courses);
          setCart(response.Cart);
          setLoaded(true);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [loaded, loading]);

  const handleRemoveCourse = async (courseId) => {
    try {
      const response = await removeFromCart(courseId);
      if (response && response.success) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.courseId !== courseId)
        );
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
  };

  return (
    <div className={styles.Cart}>
      <h2 className={styles.CartTitle}>Shopping Cart</h2>
      <div className={styles.CartContainer}>
        <section>
          <h3 className={styles.NumCourse}>{courses.length} Courses in Cart</h3>
          {courses.length > 0 ? (
            <ul className={styles.CourseList}>
              {courses.map((course, index) => (
                <li key={index}>
                  <CartCourseCard
                    img={course.image?.url}
                    title={course.title}
                    description={course.desc}
                    price={course.basePrice}
                    _id={course.courseId}
                    onRemove={() => handleRemoveCourse(course.courseId)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyCartText}>
              Your cart is empty. Please add some courses.
            </p>
          )}
        </section>
        {cart?.subTotal && (
          <div className={styles.CheckOut}>
            <div className={styles.CheckOutContent}>
              <h3>
                Total:{" "}
                <span className={styles.TotalPrice}>{cart.subTotal} LE</span>
              </h3>
              <button className={styles.CheckOutButton}>
                <Link to={`/Checkout?cartId=${cart?._id}`}>Check Out</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

function CartCourseCard({ img, title, description, price, _id, onRemove }) {
  return (
    <div className={styles.CartCard}>
      <img src={img} alt={title} className={styles.img} />
      <div className={styles.Content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.Price}>
          {price === 0 ? (
            "Free"
          ) : (
            <>
              <span className={styles.price}>{price}</span>
              <span className={styles.currency}> EGP</span>
            </>
          )}
        </p>
      </div>
      <div className={styles.CardBtns}>
        <Link
          to={`/ViewCourse?courseId=${_id}`}
          className={styles.ViewCourseBTN}
        >
          View Course
        </Link>
        <button className={styles.removeBTN} onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
