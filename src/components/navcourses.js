import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import cookies from "js-cookie";
import "../assets/css/navcourses.css";
function CoursesDropDownNavMenu() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  // Define an array of programs
  const programs = [
    { name: "Frontend", route: "/program1" },
    { name: "Backend", route: "/program2" },
    { name: "Full Stack", route: "/program1" },
    { name: "DevOps", route: "/program2" },
    { name: "Android", route: "/program3" },
    { name: "Flutter", route: "/program1" },
    { name: "Cyber Security", route: "/program2" },
    { name: "Game Developer", route: "/program1" },
  ];

  return (
    <div className="dropdown courses-drop-down">
      <button
        className=" dropdown-toggle explore-courses"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {t("Courses")}
      </button>
      <ul className="dropdown-menu">
        {programs.map((program, index) => (
          <li key={index}>
            <Link className="dropdown-item" to={program.route}>
              {program.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesDropDownNavMenu;
