
import {
 
  faChartSimple,

  
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/css/AdminPage.module.css";
import AllCourses from "../components/AllCourses";
import AllCoupons from "../components/AllCoupons";
import AllCategories from "../components/AllCategories";
import AllUsers from "../components/AllUsers";
import { useState } from "react";

function AdminDashboard() {
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
      {activeSection === "Coupons" && <AllCoupons />}
    </section>
  );
}
export default AdminDashboard;

