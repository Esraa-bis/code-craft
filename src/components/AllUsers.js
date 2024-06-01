import {
  faFileUpload,
  faGraduationCap,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import { banAccount, enableAccount, getAllUsers } from "../services/admin";
import { sweetAlert } from "../services/sweetalert";
import Paginationn from "./Pagination";
function AllUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [error, setError] = useState(null); // Tracks any errors
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const noPerPage = 10; // Number of users to display per page
  const [filter, setFilter] = useState("All"); // Tracks the selected filter option
  const [loaded, setLoaded] = useState(false);

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
  // Fetch users when the component mounts
  useEffect(() => {
    if (loading || loaded) return;
    setLoading(true);
    getAllUsers()
      .then((response) => {
        if (response.success) {
          setUsers(response.users);
          setLoaded(true);
        } else {
          setError("Failed to fetch users");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  // Handle ban account
  const handleBanUser = async (user) => {
    try {
      const response = await banAccount(user.id);

      if (response.success) {
        setUsers((prevUsers) =>
          prevUsers?.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  isActive: false,
                  isBanned: true,
                }
              : u
          )
        );
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

  // Handle enable account
  const handleEnableAccount = async (user) => {
    try {
      const response = await enableAccount(user.id);

      if (response.success) {
        setUsers((prevUsers) =>
          prevUsers?.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  isActive: true,
                  isBanned: false,
                }
              : u
          )
        );
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

  // Handle pagination
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page number
  };

  // Calculate indices for slicing the users array
  const indexOfLastUser = currentPage * noPerPage;
  const indexOfFirstUser = indexOfLastUser - noPerPage;

  // Filter users based on the selected filter
  const filterUsers = users.filter((user) => {
    if (filter === "banned user") {
      return user.isPinned;
    } else if (filter === "Unpinned") {
      return !user.isPinned;
    } else if (filter === "Deactivated") {
      return !user.isActive;
    } else if (filter === "Enrolled in courses") {
      return user.recentlyViewedCourses.length > 0;
    } else if (filter === "Uploaded courses") {
      return user.coursesUploaded.length > 0;
    } else {
      return true; // Return all users if the filter is "All"
    }
  });

  // Get the users for the current page
  const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <div className={styles.allUsers}>
      {/* Analysis section */}
      <div className={styles.analysis}>
        <div className={`${styles.usersAnalysis} ${styles.All}`}>
          <h3> All Users</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{users.length}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.Active}`}>
          <h3>Active</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{users.filter((user) => user.isActive).length}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.Deactivated}`}>
          <h3>Deactivated</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{users.filter((user) => !user.isActive).length}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.banned}`}>
          <h3>banned</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{users.filter((user) => !user.isActive).length}</p>
        </div>
      </div>

      {/* Filter dropdown */}
      <select value={filter}>
        <option value="All">All</option>
        <option value="banned user">banned user</option>
        <option value="Unpinned">Unpinned</option>
        <option value="Deactivated">Deactivated</option>
        <option value="Enrolled in courses">Enrolled in courses</option>
        <option value="Uploaded courses">Uploaded courses</option>
      </select>

      {/* Users table */}
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th></th>

            <th>ID</th>
            <th>
              <FontAwesomeIcon icon={faUser} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>
              Enrolled Courses
              <FontAwesomeIcon icon={faGraduationCap} />
            </th>
            <th>
              Uploaded Courses
              <FontAwesomeIcon icon={faFileUpload} />
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>
                <img src={user.profile_pic.url} alt={user.userName} />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.coursesEnrolledCount}</td>
              <td>{user.coursesUploadedCount}</td>

              <td>
                <div
                  className={`${styles.circle} ${
                    user.isActive && !user.isBanned
                      ? styles.green
                      : !user.isActive && user.isBanned
                      ? styles.red
                      : styles.yellow
                  }`}
                ></div>

                <span
                  className={
                    user.isActive && !user.isBanned
                      ? styles.userActive
                      : !user.isActive && user.isBanned
                      ? styles.userBanned
                      : styles.userDeactivated
                  }
                >
                  {user.isActive && !user.isBanned
                    ? "Active"
                    : !user.isActive && user.isBanned
                    ? "Banned"
                    : "Deactivated"}
                </span>
              </td>

              <td className={styles.actions}>
                {user.isBanned ? (
                  <button
                    onClick={() => {
                      handleEnableAccount(user);
                    }}
                    className={styles.enable}
                  >
                    Enable
                  </button>
                ) : user.role === "superAdmin" ? (
                  "Super Admin"
                ) : (
                  <button
                    onClick={() => {
                      handleBanUser(user);
                    }}
                    title="Ban user"
                    className={styles.Ban}
                  >
                    Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className={styles.paginate}>
        <Paginationn
          noPerPage={noPerPage}
          total={filterUsers.length}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default AllUsers;
