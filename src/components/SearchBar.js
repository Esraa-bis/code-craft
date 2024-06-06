import i18n from "i18next";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function SearchBar({ setKeyword }) {
  const { t } = useTranslation("");
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  let searchTimeout;

  const isArabic = lng === "ar"; // Assuming "ar" is the code for Arabic language
  const onSearchChange = (e) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setKeyword(e.target.value);
    }, 400);
  };

  const onFocus = () => {
    if (window.location.href.split("?")[0].endsWith("/Courses") === false) {
      window.location.href = "/Courses";
    }
  };

  return (
    <div className="search-div">
      <input
        onFocus={() => onFocus()}
        onChange={(e) => onSearchChange(e)}
        type="text"
        className={`search-input ${isArabic ? "arabic-search-input" : ""}`}
        placeholder={t("searchPlaceHolder")}
      />
      <button
        type="button"
        className={`search-btn ${isArabic ? "arabic-search-btn" : ""}`}
      >
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

export default SearchBar;
