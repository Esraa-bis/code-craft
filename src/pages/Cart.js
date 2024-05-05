import styles from "../assets/css/Cart.module.css";
import CardImg from "../assets/images/css.avif";
import CartCourseCard from "../components/CartCourseCard";

function Cart() {
  const CartCourses = [
    {
      img: CardImg,
      title: "Introduction to Web Development",
      description:
        "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
      price: "49.99",
    },
    {
      img: CardImg,
      title: "Python Programming for Beginners",
      description:
        "Discover the power of Python programming language with hands-on projects and exercises.",
      price: "59.99",
    },
  ];
  console.log(CartCourses);

  const NumCartCourses = CartCourses.length;

  return (
    <div className={styles.Cart}>
      <h2 className={styles.CartTitle}>Shopping Cart</h2>
      <div className={styles.CartContainer}>
        <section>
          <h3 className={styles.NumCourse}>{NumCartCourses} Courses in Cart</h3>
          {NumCartCourses > 0 ? (
            <ul className={styles.CourseList}>
              {CartCourses.map((course, index) => (
                <li key={index}>
                  <CartCourseCard
                    img={course.img}
                    title={course.title}
                    description={course.description}
                    price={course.price}
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
        <div className={styles.CheckOut}>
          <h3>Check Out</h3>
          <div className={styles.CheckOutContent}>
            <div className={styles.Promotion}>
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
            </div>
            <h3>
              Total: <span className={styles.TotalPrice}>1000 LE</span>
            </h3>
            <button className={styles.CheckOutButton}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
