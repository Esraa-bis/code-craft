import i18n from "i18next";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../assets/css/profileDropDown.css";
import ProfilePicture from "../assets/images/pp.jpg";

let ProfilePic = ProfilePicture;

function ProfileDropDown() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const isArabic = lng === "ar";
  return (
    <div className="dropdown ">
      <button
        className=" dropdown-toggle explore-courses dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {ProfilePic ? (
          <img src={ProfilePic} alt="Profile" className="profile-icon" />
        ) : (
          // User icon SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=" profile-icon w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}{" "}
      </button>

      <ul
        className={`avatar dropdown-menu ${
          isArabic ? "arabic-dropdown-menu" : ""
        }`}
      >
        <li>
          <Link className="dropdown-item" to="/MyLearning">
            {t("My Learning")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/Profile">
            {t("Profile")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="">
            {t("Log Out")}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropDown;
