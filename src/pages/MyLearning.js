import { useEffect, useState } from "react";
import styles from "../assets/css/MyLearning.module.css";
// course photo
import CoursePhoto from "../assets/images/css.avif";
// link
import { Link } from "react-router-dom";
import { recentlyViewed } from "../services/myLearning";

function MyLearning() {
  const [activeSection, setActiveSection] = useState("RecentlyViewed"); 

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <section className={styles.MyLearning}>
      <h1 className={styles.Title}>My Learning</h1>
      <div className={styles.Categories}>
        {/* Update activeSection state on link click */}
        <div
          className={`${styles.Type} ${
            activeSection === "RecentlyViewed" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("RecentlyViewed")}
        >
          Recently Viewed
        </div>
        <div
          className={`${styles.Type} ${
            activeSection === "InProgress" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("InProgress")}
        >
          In Progress
        </div>
        <div
          className={`${styles.Type} ${
            activeSection === "Completed" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("Completed")}
        >
          Completed
        </div>
      </div>
      {/* Render component based on activeSection state */}
      {activeSection === "RecentlyViewed" && <RecentlyViewed />}
      {activeSection === "InProgress" && <InProgress />}
      {activeSection === "Completed" && <Completed />}
    </section>
  );
}

export default MyLearning;

function RecentlyViewed() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

      recentlyViewed()
        .then((response) => {
          if (response.success) {
            setCourses(response.recentlyViewedCourses);
          } else {
            setError("Failed to fetch courses");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  return (
    <section className={styles.Section}>
      {courses?.map((course, index) => (
        <div className={`${styles.MyLearningCard}`}>
          <img
            src={course.image.url}
            alt={course.courseName}
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>{course.courseName}</h5>
            <p className={`${styles.courseDescription}`}>{course.desc}</p>
          </div>
          <div className={styles.ACtion}>
            <Link
              className={styles.viewCourse}
              to={`/ViewCourse?courseId=${course?._id}`}
            >
              view course &#8594;
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

function InProgress() {
  return (
    <section className={styles.Section}>
      <div className={`${styles.MyLearningCard}`}>
        <img
          src={CoursePhoto}
          alt="course css"
          className={`${styles.courseImg}`}
        />
        <div className={`${styles.Content}`}>
          <h5 className={`${styles.courseTitle}`}>
            Introduction to Web Development
          </h5>
          <p className={`${styles.courseDescription}`}>
            Learn the basics of HTML, CSS, and JavaScript to kickstart your web
            development journeyLearn the basics of HTML, CSS, and JavaScript to
            kickstart your web development journeyLearn the basics of HTML, CSS,
            and JavaScript to kickstart your web development journeyLearn the
            basics of HTML, CSS, and JavaScript to kickstart your web
            development journey.
          </p>
          <p className={styles.NotCompletedProgress}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${styles.ProgressIcon}w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            10/33 Completed
          </p>
        </div>
        <div className={styles.ACtion}>
          <Link className={styles.viewCourse}>Continue &#8594;</Link>
        </div>
      </div>
      <div className={`${styles.MyLearningCard}`}>
        <img
          src={CoursePhoto}
          alt="course css"
          className={`${styles.courseImg}`}
        />
        <div className={`${styles.Content}`}>
          <h5 className={`${styles.courseTitle}`}>
            Introduction to Web Development
          </h5>
          <p className={`${styles.courseDescription}`}>
            Learn the basics of HTML, CSS, and JavaScript to kickstart your web
            development journeyLearn the basics of HTML, CSS, and JavaScript to
            kickstart your web development journeyLearn the basics of HTML, CSS,
            and JavaScript to kickstart your web development journeyLearn the
            basics of HTML, CSS, and JavaScript to kickstart your web
            development journey.
          </p>
          <p className={styles.NotCompletedProgress}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${styles.ProgressIcon}w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            10/33 Completed
          </p>
        </div>
        <div className={styles.ACtion}>
          <Link className={styles.viewCourse}>Continue &#8594;</Link>
        </div>
      </div>
    </section>
  );
}

function Completed() {
  return (
    <section className={styles.Section}>
      <div className={`${styles.MyLearningCard}`}>
        <img
          src={CoursePhoto}
          alt="course css"
          className={`${styles.courseImg}`}
        />
        <div className={`${styles.Content}`}>
          <h5 className={`${styles.courseTitle}`}>
            Introduction to Web Development
          </h5>
          <p className={`${styles.courseDescription}`}>
            Learn the basics of HTML, CSS, and JavaScript to kickstart your web
            development journeyLearn the basics of HTML, CSS, and JavaScript to
            kickstart your web development journeyLearn the basics of HTML, CSS,
            and JavaScript to kickstart your web development journeyLearn the
            basics of HTML, CSS, and JavaScript to kickstart your web
            development journey.
          </p>
          <p className={styles.Progress}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${styles.ProgressIcon}w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            33/33 Completed
          </p>
        </div>
        <div className={styles.ACtion}>
          <Link className={styles.viewCourse}>Get Certificate</Link>
        </div>
      </div>
      <div className={`${styles.MyLearningCard}`}>
        <img
          src={CoursePhoto}
          alt="course css"
          className={`${styles.courseImg}`}
        />
        <div className={`${styles.Content}`}>
          <h5 className={`${styles.courseTitle}`}>
            Introduction to Web Development
          </h5>
          <p className={`${styles.courseDescription}`}>
            Learn the basics of HTML, CSS, and JavaScript to kickstart your web
            development journeyLearn the basics of HTML, CSS, and JavaScript to
            kickstart your web development journeyLearn the basics of HTML, CSS,
            and JavaScript to kickstart your web development journeyLearn the
            basics of HTML, CSS, and JavaScript to kickstart your web
            development journey.
          </p>
          <p className={styles.Progress}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${styles.ProgressIcon}w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            33/33 Completed
          </p>
        </div>
        <div className={styles.ACtion}>
          <Link className={styles.viewCourse}>Get Certificate</Link>
        </div>
      </div>
    </section>
  );
}
