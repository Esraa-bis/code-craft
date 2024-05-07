// for routing
import { Link } from "react-router-dom";

// for images
import LogoImg from "../assets/images/logo.png";
import StreakOff from "../assets/images/streak-off.png";
import StreakOn from "../assets/images/streak-on.png";

// for styles
import "../assets/css/general.css";
import "../assets/css/navbar.css";

// for translate into arabicP
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import React, { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

// imported components
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
function Navbar({ signedIn, setSignedIn, user }) {
  // const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <nav className="navbar">
      <MenuBar />
      <Logo />
      <CoursesLink />
      <SearchBar />
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
function MenuBar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 menu-bar"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
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
function SearchBar() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const isArabic = lng === "ar"; // Assuming "ar" is the code for Arabic language

  return (
    <div className="search-div">
      <input
        type="text"
        className={`search-input ${isArabic ? "arabic-search-input" : ""}`}
        placeholder={t("searchPlaceHolder")}
      />
      <button className={`search-btn ${isArabic ? "arabic-search-btn" : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 search-icon "
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
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
