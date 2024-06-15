import { useEffect, useState } from "react";
import styles from "../assets/css/MyLearning.module.css";
// course photo
import CoursePhoto from "../assets/images/css.avif";
// link
import { faUserGraduate, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getCoursesFilters } from "../services/course";

function MyCourses({ user }) {
  const [activeSection, setActiveSection] = useState("Approved");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <section className={styles.MyLearning}>
      <h1 className={styles.Title}>Uploaded Course</h1>
      <div className={styles.Categories}>
        {/* Update activeSection state on link click */}
        <div
          className={`${styles.Type} ${
            activeSection === "Approved" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("Approved")}
        >
          Approved
        </div>
        <div
          className={`${styles.Type} ${
            activeSection === "Disapproved" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("Disapproved")}
        >
          Disapproved
        </div>
      </div>
      {/* Render component based on activeSection state */}
      {activeSection === "Approved" && <Approved user={user} />}
      {activeSection === "Disapproved" && <Disapproved user={user} />}
    </section>
  );
}

function Approved({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(() => null);

  useEffect(() => {
    if (!user.id || userId === user.id) return;

    setUserId(user.id);

    const filters = {
      addedBy: user.id,
      isApproved: true,
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setCourses(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  return (
    <section className={styles.Section}>
      {courses?.map((course, index) => (
        <div className={`${styles.MyLearningCard} `}>
          <img
            src={course.image.url}
            alt="course css"
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>{course.courseName} </h5>
            <p className={`${styles.courseDescription}`} title={course.desc}>
              {course.desc}
            </p>
            <div className={styles.courseStats}>
              <span className={styles.enrolledUsers}>
                <FontAwesomeIcon icon={faUsers} /> Enrolled Users:
                {course.enrolledUsers || 0}
              </span>
              <span className={styles.completedUsers}>
                <FontAwesomeIcon icon={faUserGraduate} /> Completed Users:
                {course.completedUsers || 0}
              </span>
            </div>
          </div>
          <div className={styles.ACtion}>
            <Link
              className={styles.viewCourse}
              to={`/editCourseInfo?courseId=${course._id}`}
            >
              Edit Info &#8594;
            </Link>
            <Link
              className={styles.viewCourse}
              to={`/editCourseVideos?courseId=${course._id}`}
            >
              Edit Videos &#8594;
            </Link>
            <Link
              className={styles.viewCourse}
              to={`/ViewCourse?courseId=${course._id}?${course.slug}`}
            >
              View course &#8594;
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
function Disapproved({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(() => null);

  useEffect(() => {
    if (!user.id || userId === user.id) return;

    setUserId(user.id);

    const filters = {
      addedBy: user.id,
      isApproved: false,
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setCourses(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  return (
    <section className={styles.Section}>
      {courses?.map((course, index) => (
        <div className={`${styles.MyLearningCard}`}>
          <img
            src={CoursePhoto}
            alt={course.courseName}
            className={`${styles.courseImg}`}
          />
          <div className={`${styles.Content}`}>
            <h5 className={`${styles.courseTitle}`}>{course.courseName} </h5>
            <p className={`${styles.courseDescription}`} title={course.desc}>
              {course.desc}
            </p>
            <div className={styles.courseStats}>
              <span className={styles.enrolledUsers}>
                <FontAwesomeIcon icon={faUsers} /> Enrolled Users:
                {course.enrolledUsers || 0}
              </span>
              <span className={styles.completedUsers}>
                <FontAwesomeIcon icon={faUserGraduate} /> Completed Users:
                {course.completedUsers || 0}
              </span>
            </div>
          </div>
          <div className={styles.ACtion}>
            <Link
              className={styles.viewCourse}
              to={`/editCourseInfo?courseId=${course._id}`}
            >
              Edit Info &#8594;
            </Link>
            <Link
              className={styles.viewCourse}
              to={`/editCourseVideos?courseId=${course._id}`}
            >
              Edit Videos &#8594;
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MyCourses;
