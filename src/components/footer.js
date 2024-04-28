import "../assets/css/footer.css";

//
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

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
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <LogoAndArabicBtn />
        <Teach />
        <FooterLinks />
        <Copyrights />
      </footer>
    </>
  );
}
function LogoAndArabicBtn() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <>
      <section className="LogoAndArabicBtn">
        <img src={Logo} alt="code craft logo" className="logo w-6 h-6" />

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle lang-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lang-icon"
            >
              <path
                fillRule="evenodd"
                d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            {t("Language")}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => i18n.changeLanguage("ar")}
              >
                العربية
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => i18n.changeLanguage("en")}
              >
                English
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
function Teach() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  return (
    <div className="teach-section">
      <div className="teach-content">
        <h3>{t("Upload your course On Code Craft")}</h3>
        <p>
          {t("Create an online video course, reach students, and earn money")}
        </p>
      </div>
      <div className="teach-button">
        <button className="upload-course-btn">
          {t("Teach On Code Craft")}
        </button>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <section className="FooterLinks">
      <div className="footer-column">
        <Link className="FooterLink">About Us</Link>
        <Link className="FooterLink">Contact Us</Link>
        <Link className="FooterLink">Help And Support</Link>
      </div>
      <div className="footer-column">
        <Link className="FooterLink">Discussion</Link>
        <Link className="FooterLink">Upload Your Course</Link>
        <Link className="FooterLink">Privacy Policy</Link>
      </div>
    </section>
  );
}

function Copyrights() {
  return (
    <div className="copyright">
      <p>&copy; 2024 Code Craft. All rights reserved.</p>
    </div>
  );
}
