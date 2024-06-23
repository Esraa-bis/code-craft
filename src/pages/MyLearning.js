import { useEffect, useState } from "react";
import styles from "../assets/css/MyLearning.module.css";
// course photo
// link
import { Link } from "react-router-dom";
import {
  inProgress,
  recentlyViewed,
  userCoursesFilters,
} from "../services/myLearning";

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
            activeSection === "Enrollments" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("Enrollments")}
        >
          Enrollments
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
      {activeSection === "Enrollments" && <Enrollments />}
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
function Enrollments() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    inProgress()
      .then((response) => {
        if (response.success) {
          setCourses(response.courses);
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
            src={course.course.image.url}
            alt="course css"
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>
              {course.course.courseName}
            </h5>
            <p className={`${styles.courseDescription}`}>
              {course.course.desc}
            </p>
            <p
              className={
                course.status === "Completed"
                  ? styles.CompletedProgress
                  : styles.NotCompletedProgress
              }
            >
              {course.status}
            </p>
          </div>
          <div className={styles.ACtion}>
            <Link
              to={`/ViewCourse?courseId=${course?.course?._id}`}
              className={styles.viewCourse}
            >
              Continue &#8594;
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
function InProgress() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filters = {
      status: "In Progress",
    };

    userCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setCourses(response.courses);
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
            src={course.course.image.url}
            alt="course css"
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>
              {course.course.courseName}
            </h5>
            <p className={`${styles.courseDescription}`}>
              {course.course.desc}
            </p>
            <p className={styles.NotCompletedProgress}>
              {course.progress.toFixed(0)}% Completed
              {/* <svg
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
              </svg> */}
            </p>
          </div>
          <div className={styles.ACtion}>
            <Link
              className={styles.viewCourse}
              to={`/CourseVideos?courseId=${course?.course?._id}`}
            >
              Continue &#8594;
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

function Completed() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filters = {
      status: "Completed",
    };

    userCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setCourses(response.courses);
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
            src={course.course.image.url}
            alt="course css"
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>
              {course.course.courseName}
            </h5>
            <p className={`${styles.courseDescription}`}>
              {course.course.desc}
            </p>
            <p className={`${styles.Progress} ${styles.completed}`}>
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
              100% Completed
            </p>
          </div>
          <div className={styles.ACtion}>
            <Link className={styles.viewCourse}>Get Certificate</Link>
          </div>
        </div>
      ))}
    </section>
  );
}
