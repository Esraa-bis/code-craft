import {
  faCheck,
  faStar,
  faTrash,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import { approvement, disApprove, getAllCourses } from "../services/admin";
import { sweetAlert } from "../services/sweetalert";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(() => false);
  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
  useEffect(() => {
    if (loaded || loading) return;
    setLoading(true);
    getAllCourses()
      .then((response) => {
        if (response.success) {
          setCourses(response.coursesWithEnrollment);
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

  const updateCourseStatus = (courseID, isApproved) => {
    setCourses(
      courses.map((course) =>
        course.id === courseID ? { ...course, isApproved } : course
      )
    );
  };

  const handleApproveCourse = async (courseID) => {
    try {
      const response = await approvement(courseID); // Assuming approvement is an API call function

      if (response.success) {
        updateCourseStatus(courseID, true);
        sweetAlert({
          title: "Course approved successfully!",
          icon: "success",
        });
      } else {
        sweetAlert({
          title: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      sweetAlert({ title: error.message, icon: "error" });
    }
  };

  // Handle Disapprove Course
  const handleDisapproveCourse = async (courseID) => {
    try {
      const response = await disApprove(courseID); // Assuming disApprove is an API call function

      if (response.success) {
        updateCourseStatus(courseID, false);
        sweetAlert({
          title: "Course disapproved successfully!",
          icon: "success",
        });
      } else {
        sweetAlert({
          title: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      sweetAlert({ title: error.message, icon: "error" });
    }
  };

  // Confirmation before approving a course
  const confirmApproveCourse = (courseID) => {
    sweetAlert({
      title: "Are you sure?",
      text: "Do you want to approve this course?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApprove) => {
      if (willApprove) {
        handleApproveCourse(courseID);
      }
    });
  };

  // Confirmation before disapproving a course
  const confirmDisapproveCourse = (courseID) => {
    sweetAlert({
      title: "Are you sure?",
      text: "Do you want to disapprove this course?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDisapprove) => {
      if (willDisapprove) {
        handleDisapproveCourse(courseID);
      }
    });
  };
  return (
    <div className={styles.allCourses}>
      {/* Filter dropdown */}
      {/* <select>
        <option value="All">All</option>
        <option value="Approved">Approved</option>
        <option value="Disapproved">Disapproved</option>
        <option value="banned">banned</option>
        <option value="User Enrolled">User Enrolled</option>
        <option value="Enrolled in courses">Users Completed</option>
      </select> */}
      <table className={styles.courseTable}>
        <thead>
          <tr>
            <th></th>

            <th>ID</th>
            <th>Name</th>
            <th>
              <div title="Number of Enrolled Users">
                Enrolled <FontAwesomeIcon icon={faUsers} />
              </div>
            </th>
            <th>
              <div title="Number of Users Who Completed the Course">
                Completed <FontAwesomeIcon icon={faUsers} />
              </div>
            </th>
            <th>Ratings</th>
            <th>Price</th>
            <th>Uploaded Date</th>
            <th>Course Status</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td title={course._id}>{course._id}</td>
              <td title={course.courseName}>{course.courseName}</td>
              <td>{course.enrolledUsers || 0} User</td>
              <td>{course.completedUsers || 0} User</td>
              <td className={styles.rating}>
                {course.rate ? (
                  <>
                    {course.rate} <FontAwesomeIcon icon={faStar} />
                  </>
                ) : (
                  "None"
                )}
              </td>
              <td>{course.appliedPrice} EGP</td>
              <td>{course.createdAt}</td>
              <td>
                {course.isApproved === true && (
                  <div className={`${styles.circle} ${styles.green}`}></div>
                )}
                {course.isApproved === false && (
                  <div className={`${styles.circle} ${styles.red}`}></div>
                )}
                <span
                  className={
                    course.isApproved ? styles.Approved : styles.Disapproved
                  }
                >
                  {course.isApproved === true && "Approved"}
                  {course.isApproved === false && "Disapproved"}
                </span>
              </td>
              <td className={`${styles.actions}`}>
                {course.isApproved === false && (
                  <button
                    className={styles.approveBtn}
                    onClick={() => confirmApproveCourse(course.id)}
                    title="Approve"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
                {course.isApproved === true && (
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => confirmDisapproveCourse(course.id)}
                    title="Disapprove"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </td>
              <td>
                <button className={styles.deleteBtn}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the Pagination component */}
    </div>
  );
}
export default AllCourses;
