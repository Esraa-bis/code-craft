import React, { useEffect, useState } from "react";
// for translate into arabic
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
import { initReactI18next, useTranslation } from "react-i18next";
// imported components
import HeroSection from "./heroSection.js";
import HomeCoursesSections from "./homeCoursesSections.js";

// styles
import "../assets/css/Home.css";
import { getCoursesFilters } from "../services/course.js";
import { recentlyViewed } from "../services/myLearning.js";
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

function Home() {
  const [recentlyViewedCourses, setRecentlyViewedCourses] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //  for recommended for you
  useEffect(() => {
    recentlyViewed()
      .then((response) => {
        if (response.success) {
          setRecentlyViewedCourses(response.recentlyViewedCourses);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // for  recently added
  useEffect(() => {
    const filters = {
      isApproved: true,
      sort: "createdAt desc", // '-' indicates descending order
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setRecentlyAdded(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  // for  free courses
  useEffect(() => {
    const filters = {
      isApproved: true,
      basePrice: 0,
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setFreeCourses(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // for most popular
  useEffect(() => {
    const filters = {
      isApproved: true,
      sort: "enrolledUsers desc",
    };
    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setMostPopular(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // for translation
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <>
      <HeroSection />
      <h2 className="Explore-Courses-Text"> {t("Explore Courses")} </h2>
      <main className="main-container">
        <HomeCoursesSections
          sectionTitle={t("Recommended for you ")}
          courses={recentlyViewedCourses}
        />
        <HomeCoursesSections
          sectionTitle={t("Most Popular")}
          courses={mostPopular}
        />
        <HomeCoursesSections
          sectionTitle={t("Recently Added")}
          courses={recentlyAdded}
        />
        <HomeCoursesSections
          sectionTitle={t(" Start now with zero fees")}
          courses={freeCourses}
        />
      </main>
    </>
  );
}
export default Home;
