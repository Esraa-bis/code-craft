import {
  faBan,
  faChartSimple,
  faCheck,
  faFileUpload,
  faGraduationCap,
  faStar,
  faTrash,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import avatar from "../assets/images/pp.jpg";

function Admin() {
  const [activeSection, setActiveSection] = useState("AllCourses");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <section className={styles.AdminPage}>
      <h1 className={styles.Title}>
        <FontAwesomeIcon icon={faChartSimple} /> Dashboard
      </h1>
      <div className={styles.sections}>
        <div
          className={`${styles.section} ${
            activeSection === "AllCourses" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("AllCourses")}
        >
          Courses
        </div>
        <div
          className={`${styles.section} ${
            activeSection === "AllCategories" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("AllCategories")}
        >
          Categories
        </div>
        <div
          className={`${styles.section} ${
            activeSection === "AllUsers" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("AllUsers")}
        >
          Users
        </div>
        <div
          className={`${styles.section} ${
            activeSection === "Coupons" ? styles.Active : ""
          }`}
          onClick={() => handleSectionClick("Coupons")}
        >
          Coupons
        </div>
      </div>
      {/* Render component based on activeSection state */}
      {activeSection === "AllCourses" && <AllCourses />}
      {activeSection === "AllCategories" && <AllCategories />}
      {activeSection === "AllUsers" && <AllUsers />}
      {activeSection === "Coupons" && <Coupons />}
    </section>
  );
}
export default Admin;

function AllCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Web Development", numCourses: 0 },
    { id: 2, name: "Mobile Development", numCourses: 0 },
    { id: 3, name: "Programming Languages", numCourses: 0 },
    { id: 4, name: "Game Development", numCourses: 0 },
    { id: 5, name: "Database Design and Development", numCourses: 0 },
    { id: 6, name: "Software Testing", numCourses: 0 },
    { id: 7, name: "Software Engineering", numCourses: 0 },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        numCourses: 0,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (id) => {
    // Display confirmation dialog
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (shouldDelete) {
      // Delete the category
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className={styles.allCategories}>
      <h2>All Categories (7)</h2>
      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Number of Courses</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.numCourses} courses</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addCategory}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button className={styles.addCategoryBtn} onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
}

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
    } else if (filter === "Pinned") {
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
        <option value="Pinned">Pinned</option>
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
        <Pagination
          noPerPage={noPerPage}
          total={courses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

function AllUsers() {
  const users = [
    {
      id: 1,
      pp: avatar,
      name: "John Doe",
      email: "john@example.com",
      uploadedCourses: 10,
      enrolledCourses: 5,
      status: "Active",
    },
    {
      id: 2,
      pp: avatar,

      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Blocked",
    },
    {
      id: 3,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 4,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Deactivated",
    },

    {
      id: 5,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },

    {
      id: 6,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },

    {
      id: 7,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Blocked",
    },

    {
      id: 8,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 9,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Deactivated",
    },

    {
      id: 10,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Blocked",
    },

    {
      id: 11,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 12,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 13,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Deactivated",
    },

    {
      id: 14,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Blocked",
    },

    {
      id: 15,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 16,
      pp: avatar,
      name: "John Doe",
      email: "john@example.com",
      uploadedCourses: 10,
      enrolledCourses: 5,
      status: "Active",
    },
    {
      id: 17,
      pp: avatar,

      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Blocked",
    },
    {
      id: 18,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 19,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Deactivated",
    },

    {
      id: 20,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },

    {
      id: 21,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },

    {
      id: 22,
      pp: avatar,
      name: "Jane Smith",
      email: "jane@example.com",
      uploadedCourses: 5,
      enrolledCourses: 3,
      status: "Active",
    },
  ];
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const noPerPage = 10;
  const indexOfLastUser = currentPage * noPerPage;
  const indexOfFirstUser = indexOfLastUser - noPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // for filters
  const [filter, setFilter] = useState("All"); // State to track the selected filter option
  const filterUSers = users.filter((course) => {
    if (filter === "Pinned user") {
      return course.pinnedUser === true;
    } else if (filter === "Unpinned") {
      return course.pinnedUser !== true;
    } else if (filter === "Deactive") {
      return course.status === "Deactive";
    } else if (filter === "Enrolled in courses") {
      return course.enrolledCourses > 0;
    } else if (filter === "Uploaded courses") {
      return course.uploaded;
    }
  });
  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className={styles.allUsers}>
      <div className={styles.analysis}>
        <div className={`${styles.analysis}`}>
          <div className={`${styles.usersAnalysis} ${styles.all}`}>
            <h3> All Users</h3>
            <div className={`${styles.usersIcon}`}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <p>200</p>
          </div>
          <div className={`${styles.usersAnalysis} ${styles.active}`}>
            <h3>Active</h3>
            <div className={`${styles.usersIcon}`}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <p>200</p>
          </div>
          <div className={`${styles.usersAnalysis} ${styles.Deactivated}`}>
            <h3>Deactivated</h3>
            <div className={`${styles.usersIcon}`}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <p>200</p>
          </div>
          <div className={`${styles.usersAnalysis} ${styles.Blocked}`}>
            <h3>Blocked</h3>
            <div className={`${styles.usersIcon}`}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <p>200</p>
          </div>
        </div>
      </div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Pinned user">Pinned user</option>
        <option value="Unpinned">Unpinned</option>
        <option value="Deactivated">Deactivated</option>
        <option value="Enrolled in courses">Enrolled in courses</option>
        <option value="Uploaded courses">Uploaded courses</option>
      </select>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <FontAwesomeIcon icon={faUser} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>
              Enrolled Courses
              <FontAwesomeIcon
                icon={faGraduationCap}
                title=" Enrolled Courses"
                className="header-icon"
              />
            </th>
            <th>
              Uploaded Courses
              <FontAwesomeIcon
                icon={faFileUpload}
                title=" Uploaded Courses"
                className="uploaded-icon"
              />
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img src={user.pp} alt={user.name} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.uploadedCourses}</td>
              <td>{user.enrolledCourses}</td>
              <td>
                {user.status === "Active" && (
                  <div className={`${styles.circle} ${styles.green}`}></div>
                )}
                {user.status === "Deactivated" && (
                  <div className={`${styles.circle} ${styles.yellow}`}></div>
                )}
                {user.status === "Blocked" && (
                  <div className={`${styles.circle} ${styles.red}`}></div>
                )}
                <span
                  className={
                    user.status === "Active"
                      ? styles.active
                      : user.status === "Deactivated"
                      ? styles.deactivated
                      : styles.blocked
                  }
                >
                  {user.status}
                </span>
              </td>
              <td className={styles.actions}>
                <button className={styles.view}>view</button>
                <button title="Block user" className={styles.block}>
                  <FontAwesomeIcon icon={faBan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginate}>
        <Pagination
          noPerPage={noPerPage} // Number of users per page
          total={users.length} // Total number of users
          paginate={handlePaginate} // Function to handle pagination events
          currentPage={currentPage} // Current page number (for highlighting)
        />
      </div>
    </div>
  );
}

// Pagination component
const Pagination = ({ noPerPage, total, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate total pages (handle division by zero)
  const totalPages = Math.ceil(total / noPerPage) || 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    // Validate page number to prevent out-of-bounds errors
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Previous button (disabled on first page) */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a className="page-link" onClick={() => handlePageClick(number)}>
              {number}
            </a>
          </li>
        ))}
        {/* Next button (disabled on last page) */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

function Coupons() {
  // State variables for coupon form
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [maxUsages, setMaxUsages] = useState(""); // State variable for maximum usages
  // Sample data for demonstration
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      couponCode: "ABC123",
      discountPercentage: 20,
      validFrom: "2024-05-01",
      validTo: "2024-05-31",
      maxUsages: 100,
    },
    {
      id: 2,
      couponCode: "XYZ456",
      discountPercentage: 15,
      validFrom: "2024-06-01",
      validTo: "2024-06-30",
      maxUsages: 50,
    },
  ]);

  // Function to handle coupon form submission
  const handleAddCoupon = () => {
    // Validate input fields
    if (couponCode.length < 5 || couponCode.length > 7) {
      alert("Coupon code must be between 5 and 7 characters");
      return;
    }
    if (
      parseInt(discountPercentage) < 1 ||
      parseInt(discountPercentage) > 100
    ) {
      alert("Discount percentage must be between 1 and 100");
      return;
    }
    if (validFrom === "" || validTo === "") {
      alert("Please select valid dates");
      return;
    }
    if (parseInt(maxUsages) < 1) {
      // Validate max usages
      alert("Maximum usages must be at least 1");
      return;
    }
    // Generate unique ID for new coupon
    const id = coupons.length > 0 ? coupons[coupons.length - 1].id + 1 : 1;
    // Create new coupon object
    const newCoupon = {
      id,
      couponCode,
      discountPercentage,
      validFrom,
      validTo,
      maxUsages: parseInt(maxUsages),
    };
    // Update state with new coupon
    setCoupons([...coupons, newCoupon]);
    // Reset form fields
    setCouponCode("");
    setDiscountPercentage("");
    setValidFrom("");
    setValidTo("");
    setMaxUsages("");
  };

  // Function to handle deleting a coupon with confirmation
  const handleDeleteCoupon = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    }
  };

  return (
    <div className={styles.coupons}>
      <div className={styles.couponForm}>
        <h2>Generate Coupon</h2>
        <form>
          <input
            type="text"
            placeholder="Coupon Code"
            className={styles.couponInput}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            min="1"
            max="100"
            className={styles.couponInput}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <input
            type="date"
            placeholder="Valid From"
            className={styles.couponInput}
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
          />
          <input
            type="date"
            placeholder="Valid To"
            className={styles.couponInput}
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Usages"
            min="1"
            className={styles.couponInput}
            value={maxUsages}
            onChange={(e) => setMaxUsages(e.target.value)}
          />
          <button className={styles.addCouponBtn} onClick={handleAddCoupon}>
            Add Coupon
          </button>
        </form>
      </div>
      <div className={styles.couponTable}>
        <h2>Existing Coupons</h2>
        <select>
          <option value="All">All</option>
          <option value="Approved">Date</option>
          <option value="Disapproved">Max usage</option>
          <option value="Pinned">Value</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>Max Usages</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.couponCode}</td>
                <td>{coupon.discountPercentage}%</td>
                <td>{coupon.validFrom}</td>
                <td>{coupon.validTo}</td>
                <td>{coupon.maxUsages}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteCoupon(coupon.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
