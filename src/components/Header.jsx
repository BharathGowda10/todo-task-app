import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-secondary", "text-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
      document.body.classList.add("bg-secondary", "text-dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-primary py-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-white m-0 text-center flex-grow-1">
          Todo Task List{" "}
          <span role="img" aria-label="check mark">
            ✅
          </span>
        </h1>
        <button
          className="btn btn-link border border-white rounded-2 me-3 d-flex align-items-center justify-content-center ms-3"
          style={{
            fontSize: "1.5rem",
            color: "#fff",
            width: "2.5rem",
            height: "2.5rem",
            padding: 0,
          }}
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
