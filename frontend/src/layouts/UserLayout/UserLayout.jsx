import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  GraduationCap, Home, Layers3, Headphones, Info, User,
  Settings, LogOut, Sun, Moon, Menu, X, Bell,
} from "lucide-react";
import "../../styles/user.scss";

const NAV_ITEMS = [
  { label: "Home",     icon: Home,      to: "/user/home"     },
  { label: "Services", icon: Layers3,   to: "/user/services" },
  { label: "About",    icon: Info,      to: "/user/about"    },
  { label: "Support",  icon: Headphones,to: "/user/support"  },
  { label: "Profile",  icon: User,      to: "/user/profile"  },
  { label: "Settings", icon: Settings,  to: "/user/settings" },
];

function UserLayout({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="user-shell">
      {/* ── USER HEADER ── */}
      <header className="user-header">
        <div className="user-header-left">
          {/* Mobile toggle */}
          <button
            className="user-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand */}
          <NavLink to="/user/home" className="user-header-brand">
            <div className="user-header-logo">
              <GraduationCap size={18} />
            </div>
            <span className="user-header-brand-name">SkillNest</span>
          </NavLink>
        </div>

        {/* ── Desktop nav links ── */}
        <nav className="user-nav-links">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `user-nav-link${isActive ? " active" : ""}`
                }
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="user-header-right">
          {/* Theme toggle */}
          <button
            className="user-icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notifications */}
          <button className="user-icon-btn" aria-label="Notifications">
            <Bell size={17} />
          </button>

          {/* Avatar + logout */}
          <div className="user-avatar-group">
            <div className="user-avatar">{initials}</div>
            <div className="user-avatar-meta">
              <span className="user-avatar-name">{user?.name || "User"}</span>
              <span className="user-avatar-email">{user?.email}</span>
            </div>
          </div>

          <button className="user-logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="user-mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <div className={`user-mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <nav>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `user-mobile-link${isActive ? " active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button className="user-mobile-logout" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* ── Page content ── */}
      <main className="user-main">
        <Outlet context={{ user }} />
      </main>

      {/* ── Footer ── */}
      <footer className="user-footer">
        <span>© 2024 SkillNest. All rights reserved.</span>
        <span>Made with ❤️ for learners, creators and developers.</span>
      </footer>
    </div>
  );
}

export default UserLayout;
