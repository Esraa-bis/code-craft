// export default SearchBar;
import { useState } from "react";

function SearchBar({ setKeyword }) {
  // State for toggling the visibility of the search input
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  let searchTimeout;

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

  // Function to toggle the visibility of the search input
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className={`search-div ${isSearchVisible ? "show" : ""}`}>
      <input
        onFocus={onFocus}
        onChange={onSearchChange}
        type="text"
        // Conditionally add the "show" class based on the isSearchVisible state
        className={`search-input ${isSearchVisible ? "show" : ""} `}
        placeholder="Search...."
      />
      <button
        type="button"
        className={`search-btn ${isSearchVisible ? "show" : ""} `}
        // Add an onClick event to toggle the visibility of the search input
        onClick={toggleSearchVisibility}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 search-icon"
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
