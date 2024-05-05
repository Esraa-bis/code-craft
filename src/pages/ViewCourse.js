// link
// images
import CardImg1 from "../assets/images/css.avif";
// styles
import { Link } from "react-router-dom";
import styles from "../assets/css/ViewCourse.module.css";
function ViewCourse() {
 
  return (
    <>
      <section className={styles.CoursePreview}>
        <section className={styles.CourseDescription}>
          <div>
            <h1 className={styles.Title}>Introduction to Web Development</h1>
            <p className={styles.description}>
              Learn the basics of HTML, CSS, and JavaScript to kickstart your
              web development journeyLearn the basics of HTML, CSS, and
              JavaScript to kickstart your web development journeyLearn the
              basics of HTML, CSS, and JavaScript to kickstart your web
              development journeyLearn the basics of HTML, CSS, and JavaScript
              to kickstart your web development journey.
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>
                  Rating:4
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={` icon rating-icon w-6 h-6`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </div>
            </div>
            <div className={styles.detail}>
              <p>
                Created by:<Link>Esraa Ali</Link>
              </p>
            </div>
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>Last Update: <span>20/3/2024</span></p>
              </div>

              <div className={styles.detail}>
                <p>Level: <span>Intermediate</span></p>
              </div>
              <div className={styles.detail}>
                <p>Language:<span> Arabic</span></p>
              </div>
              <div className={styles.detail}>
                <p>Category: <span>Front-End</span></p>
              </div>
            </div>
          </div>
          <div className={styles.CoursePreviewCard}>
            <Link to="/CourseVideos" className={styles.link}>
              <img src={CardImg1} alt="course" className={styles.CoursesImg} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h6 className={styles.price}>Price: 1200 EGP</h6>
            <div className={styles.allBtns}>
              <div className={styles.cartAndWishList}>
                <div className={styles.innerDiv}>
                  <button className={styles.AddToCartIcon}>Add to Cart</button>
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
            <ul>
              <li>basic Knowledge of HTML</li>
              <li>basic Knowledge of CSS</li>
            </ul>
          </div>

          <div></div>
        </section>
        <section className={styles.mainContent}>
          <h3>Content</h3>
          <p>12 lectures • 4h 30m total length</p>
          <ul>
            <li>
              <span>#01 </span>Introduction and what i need to learn
            </li>
            <li>
              <span>#02 </span>Elemants and browser
            </li>
            <li>
              <span>#03 </span>first project and first page
            </li>
            <li>
              <span>#04 </span>Head and nested elements
            </li>
            <li>
              <span>#05 </span>Comments and use case
            </li>
            <li>
              <span>#06 </span>Doctype and standards
            </li>
            <li>
              <span>#07 </span>Introduction and what i need to learn
            </li>
            <li>
              <span>#08 </span>Elemants and browser
            </li>
            <li>
              <span>#09 </span>first project and first page
            </li>
            <li>
              <span>#10 </span>Head and nested elements
            </li>
            <li>
              <span>#11 </span>Comments and use case
            </li>
            <li>
              <span>#12 </span>Doctype and standards
            </li>
          </ul>
        </section>
      </section>
    </>
  );
}
export default ViewCourse;
