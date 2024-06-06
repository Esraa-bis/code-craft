import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/Cart.module.css";
import CartCourseCard from "../components/CartCourseCard";
import { userCart } from "../services/course";

function Cart() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(() => false);
  const [cart, setCart] = useState({});

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
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
        setLoading(() => false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.Cart}>
      <h2 className={styles.CartTitle}>Shopping Cart</h2>
      <div className={styles.CartContainer}>
        <section>
          <h3 className={styles.NumCourse}>{courses.length} Courses in Cart</h3>
          {courses.length > 0 ? (
            <ul className={styles.CourseList}>
              {courses?.map((course, index) => (
                <li key={index}>
                  <CartCourseCard
                    img={course.image?.url}
                    title={course.title}
                    description={course.desc}
                    price={course.basePrice}
                    _id={course.courseId}
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
            <h3>Check Out</h3>
            <div className={styles.CheckOutContent}>
              {/* <div className={styles.Promotion}>
              <label>Promotion:</label>
              <div className={styles.PromotionCode}>
                <input
                  type="text"
                  name="Promotion"
                  className={styles.PromotionInput}
                  placeholder="Promotion.."
                />
                <button className={styles.Apply}>Apply</button>
              </div>
            </div> */}
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
