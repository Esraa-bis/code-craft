import {
  faFileUpload,
  faGraduationCap,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import {
  banAccount,
  enableAccount,
  getAllUsers,
  getUsersStats,
} from "../services/admin";
import { sweetAlert } from "../services/sweetalert";
import TablePagination from "./TablePagination";
function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Tracks any errors
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(() => ({ page: 1 }));
  const [userStats, setUsersStats] = useState(() => {
    return {
      total: 0,
      active: 0,
      banned: 0,
      deactivated: 0,
    };
  });

  const [userCourses, setUserCourses] = useState(() => ({}));

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
  const getUsers = () => {
    getAllUsers(filters)
      .then((response) => {
        if (response.success) {
          setUsers(() => response.users);
          setUserCourses(() => response.enrollmentsMap);
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
  };

  // Fetch users when the component mounts
  useEffect(() => {
    setLoading(true);
    getUsers();
    getUsersStats().then((response) => {
      if (response.success) {
        setUsersStats(() => response.stats);
        setTotal(() => response.total);
      }
    });
  }, [filters]);

  useEffect(() => {
    if (loading || loaded) return;
    setLoading(true);
    getUsers();
    getUsersStats().then((response) => {
      if (response.success) {
        setUsersStats(() => response.stats);
        setTotal(() => response.total);
      }
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

  const handleFilterChange = (e) => {
    switch (e.target.value) {
      case "all":
        setFilters(() => ({ page: currentPage }));
        break;
      case "banned":
        setFilters(() => ({ page: currentPage, "isBanned[eq]": true }));
        break;
      case "deactivated":
        setFilters(() => ({ page: currentPage, "isDeleted[eq]": true }));
        break;
      case "has_courses":
        setFilters(() => ({ page: currentPage, hasCourses: true }));
        break;
      case "enrolled":
        setFilters(() => ({ page: currentPage, enrolled: true }));
        break;
      default:
        throw new Error(`Invalid filter value "${e.target.value}"`);
    }
  };

  return (
    <div className={styles.allUsers}>
      {/* Analysis section */}
      <div className={styles.analysis}>
        <div
          className={`${styles.usersAnalysis} ${styles.All}`}
          onClick={() => setFilters(() => ({ page: currentPage }))}
        >
          <h3> All Users</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{userStats.total}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.Active}`}>
          <h3>Active</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{userStats.active}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.Deactivated}`}>
          <h3>Deactivated</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{userStats.deactivated}</p>
        </div>
        <div className={`${styles.usersAnalysis} ${styles.banned}`}>
          <h3>banned</h3>
          <div className={`${styles.usersIcon}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>{userStats.banned}</p>
        </div>
      </div>

      <select onChange={(e) => handleFilterChange(e)}>
        <option value="all">All</option>
        <option value="banned">Banned</option>
        <option value="deactivated">Deactivated</option>
        <option value="enrolled">Enrolled in courses</option>
        <option value="has_courses">Has Courses</option>
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
          {users?.map((user, index) => (
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
              <td>{userCourses[user._id]?.enrolled || 0}</td>
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
      <TablePagination
        total={total}
        onPageChange={(page) => {
          setCurrentPage(page);
          setFilters((filters) => ({ ...filters, page }));
        }}
      />
    </div>
  );
}

export default AllUsers;
