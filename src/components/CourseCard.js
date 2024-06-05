import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../assets/css/CourseCard.css";
import { addToCart } from "../services/course";
import { checkLogin } from "../services/generalFunctions";
import { sweetAlert } from "../services/sweetalert";

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

export default function CourseCard({ course, signedIn }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(() => false);
  // for arabic language
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  // for add to cart api calling
  // handle add to cart
  async function handleAddToCart(courseId) {
    try {
      const response = await addToCart(courseId);

      if (response && response.success) {
        sweetAlert({
          title: "Success!",
          text: response.message,
          icon: "success",
        });
      } else {
        throw new Error(
          response && response.message ? response.message : "Unknown error"
        );
      }
    } catch (error) {
      sweetAlert({
        title: "Error!",
        text: error.message || "An error occurred",
      });
    }
  }

  return (
    <>
      <div className="course-card">
        <img src={course.img} alt={course.title} />
        <div className="course-content">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <div className="details">
            <div className="detail">
              <FontAwesomeIcon icon={faStar} className="icon rating-icon" />
              &nbsp;&nbsp;
              <p>{course.rating}</p>
            </div>
            <div className="detail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" time-icon icon w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              &nbsp;&nbsp;
              <p>{course.time}</p>
            </div>
            <div className="detail price">
              <p className={course.price === 0 ? "free" : "priceValue"}>
                {course.price === 0 ? (
                  "Free"
                ) : (
                  <>
                    <span className="currency">EGP</span>

                    <span className="value">{course.price}</span>
                  </>
                )}
              </p>
            </div>

            <div className="CardBTN">
              <Link
                to={`/ViewCourse?courseId=${course?._id}&slug=${course.slug}`}
                className="ViewCourseBTN"
              >
                View Course
              </Link>
              {course.price !== 0 ? (
                <button
                  className="AddToCartBTN"
                  onClick={() => {
                    if (checkLogin(signedIn)) {
                      handleAddToCart(course?._id);
                    }
                  }}
                >
                  {t("Add to Cart")}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
