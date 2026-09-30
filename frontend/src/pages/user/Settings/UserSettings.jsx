import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { Sun, Moon, User, Shield, Bell, LogOut, Key } from "lucide-react";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "theme", label: "Appearance", icon: Sun },
  { id: "security", label: "Security", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function UserSettings() {
  const { user } = useOutletContext();
  const [section, setSection] = useState("profile");
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <div className="user-page-container">
      <div className="user-page-header">
        <h1 className="user-page-title">Settings</h1>
        <p className="user-page-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-layout">
        {/* Nav */}
        <div className="settings-nav">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className={`settings-nav-item ${section === s.id ? "active" : ""}`}
                onClick={() => setSection(s.id)}
              >
                <Icon size={15} />
                {s.label}
              </button>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border-color)", marginTop: 8, paddingTop: 8 }}>
            <button
              onClick={handleLogout}
              className="settings-nav-item"
              style={{ color: "#ef4444" }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="settings-content">
          <h3 className="settings-section-title">
            {SECTIONS.find((s) => s.id === section)?.label}
          </h3>

          {section === "profile" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, padding: 20, background: "var(--bg-secondary)", borderRadius: 10 }}>
                <div className="user-avatar" style={{ width: 52, height: 52, fontSize: "1rem" }}>
                  {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                </div>
                <div>
                  <strong style={{ display: "block", color: "var(--text-primary)", fontSize: "0.95rem" }}>{user?.name || "User"}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{user?.email}</span>
                </div>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-input" defaultValue={user?.name || ""} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input className="form-input" defaultValue={user?.email || ""} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input className="form-input" defaultValue={user?.phone || ""} placeholder="Your phone number" />
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          )}

          {section === "theme" && (
            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: 20 }}>
                Choose how SkillNest looks to you.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { id: "light", label: "Light Mode", icon: Sun, desc: "Clean and bright interface" },
                  { id: "dark", label: "Dark Mode", icon: Moon, desc: "Easy on the eyes at night" },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={toggleTheme}
                      style={{
                        padding: 20, borderRadius: 10, textAlign: "left",
                        border: `2px solid ${isActive ? "var(--brand-green)" : "var(--border-color)"}`,
                        background: isActive ? "var(--color-green-bg)" : "var(--bg-secondary)",
                        cursor: "pointer", transition: "0.2s",
                      }}
                    >
                      <Icon size={22} color={isActive ? "var(--brand-green)" : "var(--text-muted)"} style={{ marginBottom: 10 }} />
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>{t.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{t.desc}</div>
                      {isActive && (
                        <div style={{ fontSize: "0.7rem", color: "var(--brand-green)", marginTop: 8, fontWeight: 600 }}>✓ Active</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {section === "security" && (
            <div>
              <div className="form-group">
                <label>Current Password</label>
                <input className="form-input" type="password" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input className="form-input" type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input className="form-input" type="password" placeholder="Confirm new password" />
              </div>
              <button className="btn btn-primary">Update Password</button>
            </div>
          )}

          {section === "notifications" && (
            <div>
              {[
                { label: "Email notifications", desc: "Receive updates via email" },
                { label: "Support ticket updates", desc: "Get notified on your ticket replies" },
                { label: "New features", desc: "Hear about new SkillNest features" },
              ].map((n, i) => (
                <div key={n.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{n.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{n.desc}</div>
                  </div>
                  <label style={{ position: "relative", display: "inline-block", width: 40, height: 22, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked={i === 0} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: "absolute", inset: 0, background: i === 0 ? "var(--brand-green)" : "var(--border-color)", borderRadius: 22, transition: "0.2s" }} />
                    <span style={{ position: "absolute", left: i === 0 ? 20 : 2, top: 2, width: 18, height: 18, background: "#fff", borderRadius: "50%", transition: "0.2s" }} />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
