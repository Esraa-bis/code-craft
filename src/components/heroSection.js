import React, { useEffect } from "react";
// for translate into arabicP
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import cookies from 'js-cookie';
// 
import "../css/HeroSection.css"
// 
import heroSectionPhoto from "../images/hero-section.jpg"
i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'navigator','path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

function HeroSection() {
    const { t } = useTranslation();
  const lng = cookies.get('i18next') || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  },[lng]
  )
  return (
      <section className="hero-section">
        <div className="hero-section-text">
          <h1 className="text">{t("Start Your Coding Journey Today")}</h1>
    <p>{t("Unleash your creativity")}</p>
        </div>
        <img src={heroSectionPhoto} alt="for e-learning " className="hero-section-photo" />        
    </section>
  )
}
export default HeroSection;