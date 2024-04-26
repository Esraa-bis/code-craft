import React, { useEffect } from "react";
// for translate into arabic
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";
// imported components
import HeroSection from "./heroSection.js";
import HomeCoursesSections from "./homeCoursesSections.js";

// styles
import "../assets/css/Home.css";
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
        <HomeCoursesSections sectionTitle={t("Most Popular")} />
        <HomeCoursesSections sectionTitle={t("Recently Added")} />
        <HomeCoursesSections sectionTitle={t("Free")} />
      </main>
    </>
  );
}
export default Home;
