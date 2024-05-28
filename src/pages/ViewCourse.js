// link
// images
// styles
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../assets/css/ViewCourse.module.css";
import { addToCart, coursePreview } from "../services/course";
import { sweetAlert } from "../services/sweetalert";
function ViewCourse() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const courseId = query.get("courseId");

  useEffect(() => {
    setLoading(true);
    coursePreview(courseId)
      .then((response) => {
        if (response.success) {
          setCourse(response.course);
        } else {
          setError("Failed to fetch course preview");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No preview available for this course.</div>;
  }
  function convertDuration(duration) {
    const hours = Math.floor(duration); // Extract hours
    const minutes = Math.floor((duration - hours) * 60); // Extract minutes

    return { hours, minutes };
  }
  const { hours, minutes } = convertDuration(course.courseDuration);

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
  return (
    <>
      <section className={styles.CoursePreview}>
        <section className={styles.CourseDescription}>
          <div>
            <h1 className={styles.Title}>{course.courseName}</h1>
            <p className={styles.description}>{course.desc}</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>
                  Rating:{course.rating || "-"}
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
                  {course.addedBy.firstName} {course.addedBy.lastName}
                </Link>
              </p>
            </div>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>
                  Last Update:{" "}
                  <span>{course.updateAt || course.createdAt}</span>
                </p>
              </div>

              <div className={styles.detail}>
                <p>
                  Level: <span>{course.level}</span>
                </p>
              </div>
              <div className={styles.detail}>
                <p>
                  Category: <span>{course.category}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.CoursePreviewCard}>
            <Link to="/CourseVideos" className={styles.link}>
              <img
                src={course.image.url}
                alt="course"
                className={styles.CoursesImg}
              />
              <FontAwesomeIcon icon={faPlay} className={` icon `} />
            </Link>
            <h6 className={styles.price}>Price: {course.appliedPrice} EGP</h6>
            <div className={styles.allBtns}>
              <div className={styles.cartAndWishList}>
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
              </div>
              <button className={styles.buyNow}>Buy Now</button>
            </div>
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
        </section>
        <section>
          <div className={styles.Prerequisite}>
            <h3>Prerequisite</h3>
            <p> {course.prerequisites}</p>
          </div>

          <div></div>
        </section>
        <section className={styles.mainContent}>
          <h3>Content</h3>
          <p>
            {course.numOfVideos} lectures •{`${hours}h, ${minutes}m  `}
            total length
          </p>
          <ul>
            {course.vidoes.map((video, index) => (
              <li key={video._id}>
                <span>{formatIndex(index)} </span>
                {video.title}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
export default ViewCourse;
