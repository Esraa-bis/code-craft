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
        <img src={ProfilePic} alt="Profile" className="profile-icon" />
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
