import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaCartArrowDown,
  FaHeart,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import AppContext from "../../Context/AppContext";
import ThemeContext from "../../Context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  // App Context
  const { isLoggedIn, setIsLoggedIn, userCart } = useContext(AppContext);

  // Theme Context
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Logout
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("UserToken");
    setMenuOpen(false);
    navigate("/login");
  };

  // Search
  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Cart total
  const totalItems = userCart.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className="
          bg-white dark:bg-gray-950
          text-gray-900 dark:text-white
          shadow-lg dark:shadow-black/30
          sticky top-0 z-50
          transition-colors duration-300
        "
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            className="
              flex flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-4
            "
          >
            {/* ================= LOGO ================= */}
            <div
              className="
                text-center lg:text-left
                text-2xl sm:text-3xl lg:text-4xl
                font-extrabold
                bg-gradient-to-r
                from-indigo-500
                via-purple-500
                to-pink-500
                text-transparent
                bg-clip-text
                cursor-pointer
              "
              onClick={() => navigate("/")}
            >
              Swadeshi-Mart
            </div>

            {/* ================= SEARCH ================= */}
            <div className="w-full lg:w-1/3">
              <div
                className="
                  flex items-center
                  bg-gray-100 dark:bg-gray-800
                  rounded-full
                  px-4 py-2
                  shadow-sm
                  border border-transparent
                  dark:border-gray-700
                  transition-colors duration-300
                "
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-gray-900 dark:text-white
                    placeholder-gray-500
                    dark:placeholder-gray-400
                  "
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <button
                  onClick={handleSearch}
                  className="
                    text-gray-600 dark:text-gray-300
                    hover:text-black dark:hover:text-white
                    transition
                  "
                >
                  🔍
                </button>
              </div>
            </div>

            {/* ================= DESKTOP MENU ================= */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="
                  hidden md:flex
                  items-center gap-2
                  text-pink-500
                  hover:text-pink-600
                  transition
                "
              >
                <FaHeart />
                Wishlist
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="
                  relative
                  text-gray-900 dark:text-white
                  hover:text-indigo-500
                  dark:hover:text-indigo-400
                  transition
                "
              >
                <FaCartArrowDown size={30} />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute -top-2 -right-2
                      bg-red-500
                      text-white
                      text-xs
                      w-5 h-5
                      rounded-full
                      flex items-center justify-center
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* ================= THEME TOGGLE ================= */}
              <button
                onClick={toggleTheme}
                type="button"
                title={
                  darkMode
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
                aria-label={
                  darkMode
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-800 dark:text-yellow-300
                  border border-gray-300 dark:border-gray-700
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-all duration-300
                "
              >
                {darkMode ? (
                  <FaSun size={18} />
                ) : (
                  <FaMoon size={18} />
                )}
              </button>

              {/* ================= DESKTOP AUTH ================= */}
              <div className="hidden md:flex items-center gap-3">
                {isLoggedIn ? (
                  <>
                    {/* Profile */}
                    <button
                      onClick={() => navigate("/profile")}
                      className="
                        px-4 py-2
                        border border-indigo-500
                        text-indigo-500
                        dark:text-indigo-400
                        rounded-lg
                        hover:bg-indigo-500
                        hover:text-white
                        transition
                      "
                    >
                      Profile
                    </button>

                    {/* Logout */}
                    <button
                      onClick={logOut}
                      className="
                        px-4 py-2
                        border border-red-500
                        text-red-500
                        rounded-lg
                        hover:bg-red-500
                        hover:text-white
                        transition
                      "
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  /* Login */
                  <Link
                    to="/login"
                    className="
                      px-4 py-2
                      border border-green-500
                      text-green-500
                      rounded-lg
                      hover:bg-green-500
                      hover:text-white
                      transition
                    "
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* ================= MOBILE MENU BUTTON ================= */}
              <button
                type="button"
                className="
                  md:hidden
                  text-gray-900 dark:text-white
                  hover:text-indigo-500
                  dark:hover:text-indigo-400
                  transition
                "
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <FaBars size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      {menuOpen && (
        <div
          className="
            fixed inset-0
            bg-black/40
            dark:bg-black/60
            z-40
            md:hidden
          "
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`
          fixed top-0 right-0
          h-full w-72
          bg-white dark:bg-gray-950
          text-gray-900 dark:text-white
          shadow-2xl
          z-50
          transform
          transition-transform duration-300
          md:hidden
          ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Drawer Header */}
        <div
          className="
            flex justify-between items-center
            p-5
            border-b
            border-gray-200 dark:border-gray-800
          "
        >
          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="
              text-gray-700 dark:text-gray-300
              hover:text-black dark:hover:text-white
              transition
            "
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col gap-5 p-5">
          {/* ================= MOBILE THEME ================= */}
          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex items-center justify-between
              w-full
              border
              border-gray-300 dark:border-gray-700
              rounded-lg
              px-4 py-3
              bg-gray-50 dark:bg-gray-900
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <span className="flex items-center gap-3">
              {darkMode ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon />
              )}

              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {darkMode ? "ON" : "OFF"}
            </span>
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="
              flex items-center gap-3
              text-pink-500
              hover:text-pink-600
              transition
            "
          >
            <FaHeart />
            Wishlist
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="
              flex items-center gap-3
              text-gray-900 dark:text-white
              hover:text-indigo-500
              dark:hover:text-indigo-400
              transition
            "
          >
            <FaCartArrowDown />
            Cart

            {totalItems > 0 && (
              <span
                className="
                  ml-auto
                  bg-red-500
                  text-white
                  text-xs
                  w-5 h-5
                  rounded-full
                  flex items-center justify-center
                "
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* ================= MOBILE AUTH ================= */}
          {isLoggedIn ? (
            <>
              {/* Profile */}
              <button
                type="button"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="
                  border border-indigo-500
                  text-indigo-500
                  dark:text-indigo-400
                  rounded-lg
                  py-2
                  hover:bg-indigo-500
                  hover:text-white
                  transition
                "
              >
                Profile
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={logOut}
                className="
                  border border-red-500
                  text-red-500
                  rounded-lg
                  py-2
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            /* Login */
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="
                border border-green-500
                text-green-500
                rounded-lg
                py-2
                text-center
                hover:bg-green-500
                hover:text-white
                transition
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;