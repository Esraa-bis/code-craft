// for routing
import { Link, Navigate } from "react-router-dom";

// for images
import LogoImg from "../assets/images/logo.png";
import StreakOff from "../assets/images/streak-off.png";
import StreakOn from "../assets/images/streak-on.png";

// for styles
import "../assets/css/navbar.css";

// for translate into arabicP
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

// imported components
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logOut } from "../services/auth.js";
import { SessionTokenStorage } from "../services/local-storage.js";
import { sweetAlert } from "../services/sweetalert.js";
import SearchBar from "./SearchBar.js";
import ProfileDropDown from "./profileDropDown.js";

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: [
        "htmlTag",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

//////////////////////////////////
// appears only when user keeps streak &sign in
let keepStreak = false;
// appears only when user added his pp &sign in

////////////////////
function Navbar({ signedIn, setSignedIn, user, keyword, setKeyword }) {
  // const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const isArabic = lng === "ar"; // Assuming "ar" is the code for Arabic language

  return (
    <nav className="navbar">
      <MenuBar signedIn={signedIn} setSignedIn={setSignedIn} user={user} />
      <Logo />
      <CoursesLink />
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <DiscussionsLink />
      {signedIn ? (
        <UserBasicsInNav
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          user={user}
        />
      ) : (
        <SignInAndUp />
      )}
    </nav>
  );
}
export default Navbar;

function MenuBar({ setSignedIn, user, signedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 menu-bar"
        onClick={openModal}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        user={user}
      />
    </>
  );
}
function Modal({ signedIn, isOpen, onClose, setSignedIn, user }) {
  // for modal close and open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  // for sign out btns
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          &times;
        </button>
        {signedIn ? (
          <>
            <div>
              {!setSignedIn && <Navigate to="/" />}
              <div className="UserInfo">
                <img
                  src={user?.profile_pic?.url}
                  alt="Profile"
                  className="profile-picture-modal"
                />
                <h6 className="userName">
                  {user?.firstName} {user?.lastName}
                </h6>
              </div>
              <ul className="modal-links">
                <li>
                  <Link to="/MyLearning" className="modal-link">
                    My Learning
                  </Link>
                </li>
                {user.coursesUploadedCount > 0 ? (
                  <li>
                    <Link to="/MyCourses" className="modal-link">
                      Uploaded Courses
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link to="/Profile" className="modal-link">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/Cart" className="modal-link" title="cart">
              cart <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </>
        ) : (
          // <SignInAndUpSS />
          <div className="">
            <Link to="/SignIn" className="modal-link">
              Sign In
            </Link>
            <Link to="/SignUp" className="modal-link">
              Sign Up
            </Link>
          </div>
        )}
        <ul className="modal-links">
          <li>
            <Link className="modal-link" to="Discussion">
              Discussions
            </Link>
          </li>
          <li>
            <Link to="/Courses" className="modal-link">
              Courses
            </Link>
          </li>
          {signedIn && (
            <li>
              <Link onClick={handleLogout} className="modal-link">
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
function Logo() {
  return (
    <>
      <Link to="/">
        <img className="logo" src={LogoImg} alt="Logo" />
      </Link>
    </>
  );
}
function CoursesLink() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <div className="discussions">
      <Link to="/Courses">{t("Courses")}</Link>
    </div>
  );
}
function DiscussionsLink() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <div className="discussions">
      <Link to="Discussion">{t("Discussions")}</Link>
    </div>
  );
}

function SignInAndUp() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <div className="nav-buttons">
      <Link to="/SignIn" className="sign-in-btn nav-btn">
        {t("Sign-In-btn")}
      </Link>
      <Link to="/SignUp" className="sign-up-btn nav-btn">
        {t("Sign-Up-btn")}
      </Link>
    </div>
  );
}
function UserBasicsInNav({ setSignedIn, user }) {
  return (
    <div className="profile-nav-info">
      <Link title="Streak">
        <img
          src={keepStreak ? StreakOn : StreakOff}
          alt={keepStreak ? "save streak" : "Lost streak"}
          className="streak-img"
        />
      </Link>
      <Link to="/Cart" title="cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cart-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </Link>
      <ProfileDropDown setSignedIn={setSignedIn} user={user} />
    </div>
  );
}

// for small screenns
function SignInAndUpSS() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <div className="">
      <Link to="/SignIn" className="modal-link">
        {t("Sign-In-btn")}
      </Link>
      <Link to="/SignUp" className="modal-link">
        {t("Sign-Up-btn")}
      </Link>
    </div>
  );
}
function UserBasicsInNavSS({ setSignedIn, user }) {
  return (
    <div className="">
      <ProfileDropDownSS setSignedIn={setSignedIn} user={user} />
      <Link to="/Cart" className="modal-link" title="cart">
        cart <FontAwesomeIcon icon={faCartShopping} />
      </Link>
    </div>
  );
}

function ProfileDropDownSS({ setSignedIn, user }) {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const isArabic = lng === "ar";
  return (
    <div>
      {!setSignedIn && <Navigate to="/" />}
      <div className="UserInfo">
        <img
          src={user?.profile_pic?.url}
          alt="Profile"
          className="profile-picture-modal"
        />
        <h6 className="userName">
          {user?.firstName} {user?.lastName}
        </h6>
      </div>
      <ul className="modal-links">
        <li>
          <Link to="/MyLearning" className="modal-link">
            {t("My Learning")}
          </Link>
        </li>
        {user.coursesUploadedCount > 0 ? (
          <li>
            <Link to="/MyCourses" className="modal-link">
              Uploaded courses
            </Link>
          </li>
        ) : (
          ""
        )}
        <li>
          <Link to="/Profile" className="modal-link">
            {t("Profile")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
