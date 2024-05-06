import i18n from "i18next";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import "../assets/css/profileDropDown.css";
import ProfilePicture from "../assets/images/pp.jpg";
import { logOut } from "../services/auth";
import { SessionTokenStorage } from "../services/local-storage";
import { sweetAlert } from "../services/sweetalert";

let ProfilePic = ProfilePicture;

function ProfileDropDown({ setSignedIn }) {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const handleLogout = async (e) => {
    e.preventDefault();
    logOut()
      .then((response) => {
        if (response.success) {
          setSignedIn(false);
          SessionTokenStorage.removeToken();
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
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
        <img src={ProfilePic} alt="Profile" className="profile-icon" />
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
