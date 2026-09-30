import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Icon from "../../icons/Icon";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const NAV_LINKS = ["Home", "Community", "Projects", "Profile", "Work", "About"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isDark = theme === "dark";

  const handleLogout = async () => {
    closeMenu();
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  const handleAuthAction = () => {
    closeMenu();
    if (isLoggedIn) {
      handleLogout();
    }
  };

  return (
    <header className="navbar">

      {/* ── Brand / Logo ── */}
      <Link className="brand" to="/" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 72 58">
            <path d="M8 10 36 1l28 9-28 10L8 10Z" fill="#146b58" />
            <path
              d="M16 15v17c0 9 9 15 20 15s20-6 20-15V15L36 24 16 15Z"
              fill="#1d806b"
            />
          </svg>
        </span>
        <span>
          <strong>SkillNest</strong>
          <small>Learn · Build · Grow</small>
        </span>
      </Link>

      {/* ── Desktop Nav Links ── */}
      <nav className="nav-links">
        {NAV_LINKS.map((item, i) => (
          <a
            key={item}
            className={i === 0 ? "active" : ""}
            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* ── Desktop Action Buttons ── */}
      <div className="nav-actions">

        {/* Theme toggle */}
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className={`theme-icon ${isDark ? "rotate-in" : "rotate-out"}`}>
            <Icon type={isDark ? "sun" : "moon"} size={20} />
          </span>
        </button>

        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <Link to="/admin/dashboard" className="login-btn">Dashboard</Link>
            ) : (
              <Link to="/user/home" className="login-btn">Dashboard</Link>
            )}
            <button className="primary-btn small" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="primary-btn small">
              Get Started <Icon type="arrow" size={18} />
            </Link>
          </>
        )}
      </div>

      {/* ── Mobile Hamburger ── */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <nav className="mobile-nav">
          {NAV_LINKS.map((item, i) => (
            <a
              key={item}
              className={i === 0 ? "active" : ""}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mobile-actions">
          {/* Theme toggle inside mobile menu too */}
          <button
            className="theme-toggle-row"
            onClick={toggleTheme}
          >
            <Icon type={isDark ? "sun" : "moon"} size={18} />
            <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
          </button>

          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link to="/admin/dashboard" className="login-btn full-w" onClick={closeMenu}>Dashboard</Link>
              ) : (
                <Link to="/user/home" className="login-btn full-w" onClick={closeMenu}>Dashboard</Link>
              )}
              <button className="primary-btn full-w" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn full-w" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="primary-btn full-w" onClick={closeMenu}>
                Get Started <Icon type="arrow" size={18} />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Overlay ── */}
      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

    </header>
  );
};

export default Navbar;
