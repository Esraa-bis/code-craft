import i18n from "i18next";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import "../assets/css/profileDropDown.css";
import { logOut } from "../services/auth";
import { SessionTokenStorage } from "../services/local-storage";
import { sweetAlert } from "../services/sweetalert";

function ProfileDropDown({ setSignedIn, user }) {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const handleLogout = async (e) => {
    e.preventDefault();
    logOut()
      .then((response) => {
        if (response.success !== true) {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
        SessionTokenStorage.removeToken();
        setSignedIn(false);
      })
      .catch((error) => {
        SessionTokenStorage.removeToken();
        setSignedIn(false);
        sweetAlert({ title: error.message, icon: "error" });
      });
  };

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const isArabic = lng === "ar";
  return (
    <div className="dropdown ProfileDropDown ">
      {!setSignedIn && <Navigate to="/" />}
      <div
        className=" dropdown-toggle dropdown "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={user?.profile_pic?.url}
          alt="Profile"
          className="profile-icon"
        />
      </div>

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
        {user.coursesUploadedCount > 0 ? (
          <li>
            <Link className="dropdown-item" to="/MyCourses">
              Uploaded courses
            </Link>
          </li>
        ) : (
          ""
        )}
        <li>
          <Link className="dropdown-item" to="/Profile">
            {t("Profile")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" onClick={handleLogout}>
            {t("Log Out")}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropDown;
