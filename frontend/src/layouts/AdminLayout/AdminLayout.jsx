import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Headphones,
  Settings,
  Info,
  LogOut,
  Bell,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Layers3,
} from "lucide-react";
import "../../styles/admin.scss";

const ADMIN_EMAIL = "geetaishsinghrajput@gmail.com";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Users", icon: Users, to: "/admin/users" },
  { label: "Services", icon: Layers3, to: "/admin/services" },
  { label: "Support", icon: Headphones, to: "/admin/support" },
  { label: "About", icon: Info, to: "/admin/about" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

function AdminLayout({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true }); // Owner goes to landing page, NOT /login
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <div className="admin-shell">
      {/* ── HEADER ── */}
      <header className="admin-header">
        <div className="admin-header-left">
          {/* Mobile sidebar toggle */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop collapse toggle */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Collapse sidebar"
            style={{ display: "none" }}
            id="desktop-sidebar-toggle"
          >
            <Menu size={18} />
          </button>

          <a className="admin-header-brand" href="/admin/dashboard">
            <div className="admin-header-logo">
              <GraduationCap size={18} />
            </div>
            <div className="admin-header-brand-text">
              <strong>SkillNest</strong>
              <small>Admin Panel</small>
            </div>
          </a>
        </div>

        <div className="admin-header-center">
          <div className="admin-search">
            <Search size={14} color="var(--text-muted)" />
            <input placeholder="Search anything..." aria-label="Search" />
          </div>
        </div>

        <div className="admin-header-right">
          {/* Theme toggle */}
          <button
            className="header-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notifications */}
          <button className="header-icon-btn" aria-label="Notifications">
            <Bell size={17} />
            <span className="header-notif-badge" />
          </button>

          <div className="header-divider" />

          {/* Admin profile */}
          <div className="admin-profile-btn">
            <div className="admin-avatar">{initials}</div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">{user?.name || "Admin"}</span>
              <span className="admin-profile-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-body">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${sidebarOpen ? "mobile-open" : ""}`}
        >
          <div className="sidebar-section-label">Main Menu</div>

          <ul className="sidebar-nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `sidebar-nav-item ${isActive ? "active" : ""}`
                    }
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon size={16} />
                    <span className="sidebar-nav-label">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-footer">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="admin-main">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
