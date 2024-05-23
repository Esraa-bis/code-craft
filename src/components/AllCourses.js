import styles from "../assets/css/AdminPage.module.css";
import { faCheck, faStar, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import  Paginationn  from "../components/Pagination";

function AllCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Course A",
      enrolledUsers: 50,
      completedUsers: 30,
      status: "Approved",
      uploadedDate: "2024-05-20",
      rating: 4.5,
      price: 99.99,
    },
    {
      id: 2,
      name: "Course B",
      enrolledUsers: 40,
      completedUsers: 20,
      status: "Pending",
      uploadedDate: "2024-05-15",
      rating: 3.8,
      price: 79.99,
    },
    {
      id: 3,
      name: "Course C",
      enrolledUsers: 60,
      completedUsers: 40,
      status: "Disapproved",
      uploadedDate: "2024-05-10",
      rating: 4.2,
      price: 129.99,
    },
    {
      id: 4,
      name: "Course D",
      enrolledUsers: 45,
      completedUsers: 25,
      status: "Approved",
      uploadedDate: "2024-05-18",
      rating: 4.0,
      price: 89.99,
    },
    // Adding 20 more courses
    {
      id: 5,
      name: "Course E",
      enrolledUsers: 55,
      completedUsers: 35,
      status: "Pending",
      uploadedDate: "2024-05-22",
      rating: 4.7,
      price: 109.99,
    },
    {
      id: 6,
      name: "Course F",
      enrolledUsers: 70,
      completedUsers: 50,
      status: "Disapproved",
      uploadedDate: "2024-05-12",
      rating: 4.3,
      price: 149.99,
    },
    {
      id: 7,
      name: "Course G",
      enrolledUsers: 65,
      completedUsers: 45,
      status: "Approved",
      uploadedDate: "2024-05-25",
      rating: 4.6,
      price: 79.99,
    },
    {
      id: 8,
      name: "Course H",
      enrolledUsers: 80,
      completedUsers: 60,
      status: "Pending",
      uploadedDate: "2024-05-28",
      rating: 4.8,
      price: 119.99,
    },
    {
      id: 9,
      name: "Course I",
      enrolledUsers: 90,
      completedUsers: 70,
      status: "Disapproved",
      uploadedDate: "2024-05-30",
      rating: 4.2,
      price: 99.99,
    },
    {
      id: 10,
      name: "Course J",
      enrolledUsers: 75,
      completedUsers: 55,
      status: "Approved",
      uploadedDate: "2024-06-01",
      rating: 4.9,
      price: 69.99,
    },
    {
      id: 11,
      name: "Course K",
      enrolledUsers: 85,
      completedUsers: 65,
      status: "Pending",
      uploadedDate: "2024-06-05",
      rating: 4.4,
      price: 159.99,
    },
    {
      id: 12,
      name: "Course L",
      enrolledUsers: 95,
      completedUsers: 75,
      status: "Disapproved",
      uploadedDate: "2024-06-10",
      rating: 4.1,
      price: 129.99,
    },
    {
      id: 13,
      name: "Course M",
      enrolledUsers: 100,
      completedUsers: 80,
      status: "Approved",
      uploadedDate: "2024-06-15",
      rating: 4.7,
      price: 89.99,
    },
    {
      id: 14,
      name: "Course N",
      enrolledUsers: 110,
      completedUsers: 90,
      status: "Pending",
      uploadedDate: "2024-06-20",
      rating: 4.6,
      price: 139.99,
    },
    {
      id: 15,
      name: "Course O",
      enrolledUsers: 120,
      completedUsers: 100,
      status: "Disapproved",
      uploadedDate: "2024-06-25",
      rating: 4.3,
      price: 79.99,
    },
    {
      id: 16,
      name: "Course P",
      enrolledUsers: 125,
      completedUsers: 105,
      status: "Approved",
      uploadedDate: "2024-06-30",
      rating: 4.9,
      price: 159.99,
    },
    {
      id: 17,
      name: "Course Q",
      enrolledUsers: 130,
      completedUsers: 110,
      status: "Pending",
      uploadedDate: "2024-07-05",
      rating: 4.8,
      price: 109.99,
    },
    {
      id: 18,
      name: "Course R",
      enrolledUsers: 135,
      completedUsers: 115,
      status: "Disapproved",
      uploadedDate: "2024-07-10",
      rating: 4.2,
      price: 99.99,
    },
    {
      id: 19,
      name: "Course S",
      enrolledUsers: 140,
      completedUsers: 120,
      status: "Approved",
      uploadedDate: "2024-07-15",
      rating: 4.5,
      price: 79.99,
    },
    {
      id: 20,
      name: "Course T",
      enrolledUsers: 145,
      completedUsers: 125,
      status: "Pending",
      uploadedDate: "2024-07-20",
      rating: 4.4,
      price: 129.99,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page

  const noPerPage = 10; // Number of items per page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle approving a course
  const handleApproveCourse = (id) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, status: "Approved" };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  // Function to handle disapproving a course
  const handleDisapproveCourse = (id) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, status: "Disapproved" };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  // Get current courses based on pagination
  const indexOfLastCourse = currentPage * noPerPage;
  const indexOfFirstCourse = indexOfLastCourse - noPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  // for filters
  const [filter, setFilter] = useState("All"); // State to track the selected filter option

  // Filter function based on the selected option
  const filterCourses = courses.filter((course) => {
    if (filter === "Approved") {
      return course.pinnedUser === true;
    } else if (filter === "Disapproved") {
      return course.pinnedUser !== true;
    } else if (filter === "banned") {
      return course.status === "Deactive";
    } else if (filter === "Users Completed") {
      return course.enrolledCourses > 0;
    } else if (filter === "User Enrolled") {
      return course.uploaded;
    }
  });
  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className={styles.allCourses}>
      {/* Filter dropdown */}
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Approved">Approved</option>
        <option value="Disapproved">Disapproved</option>
        <option value="banned">banned</option>
        <option value="User Enrolled">User Enrolled</option>
        <option value="Enrolled in courses">Users Completed</option>
      </select>
      <table className={styles.courseTable}>
        <thead>
          <tr>
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
            <th>Course Status</th>
            <th>Uploaded Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course, index) => (
            <tr key={course.id}>
              <td>{indexOfFirstCourse + index + 1}</td>
              <td>{course.name}</td>
              <td>{course.enrolledUsers} Users</td>
              <td>{course.completedUsers} Users</td>
              <td className={styles.rating}>
                {course.rating} <FontAwesomeIcon icon={faStar} />
              </td>
              <td>${course.price}</td>
              <td>
                {course.status === "Approved" && (
                  <div className={`${styles.circle} ${styles.green}`}></div>
                )}
                {course.status === "Pending" && (
                  <div className={`${styles.circle} ${styles.yellow}`}></div>
                )}
                {course.status === "Disapproved" && (
                  <div className={`${styles.circle} ${styles.red}`}></div>
                )}
                <span
                  className={
                    course.status === "Approved"
                      ? styles.Approved
                      : course.status === "Pending"
                      ? styles.Pending
                      : styles.Disapproved
                  }
                >
                  {course.status}
                </span>
              </td>
              <td>{course.uploadedDate}</td>
              <td className={`${styles.actions}`}>
                {course.status === "Pending" && (
                  <>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApproveCourse(course.id)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className={styles.disapproveBtn}
                      onClick={() => handleDisapproveCourse(course.id)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                )}
                {course.status === "Disapproved" && (
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleApproveCourse(course.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
                {course.status === "Approved" && (
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleDisapproveCourse(course.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the Pagination component */}
      <div className={styles.paginate}>
        <Paginationn
          noPerPage={noPerPage}
          total={courses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
export default AllCourses;
