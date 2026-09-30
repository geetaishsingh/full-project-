import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../../context/ThemeContext";
import { Sun, Moon, Shield, User, Bell, LogOut, Key } from "lucide-react";

const SECTIONS = [
  { id: "profile", label: "Admin Profile", icon: User },
  { id: "account", label: "Account Settings", icon: Shield },
  { id: "theme", label: "Theme Settings", icon: Sun },
  { id: "security", label: "Security", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function AdminSettings() {
  const { user } = useOutletContext();
  const [section, setSection] = useState("profile");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your admin account and preferences</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20, alignItems: "start" }}>
        {/* Nav */}
        <div className="admin-card" style={{ padding: 8 }}>
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className="settings-nav-item"
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                  width: "100%", borderRadius: 8, border: "none", background: section === s.id ? "var(--bg-tertiary)" : "transparent",
                  color: section === s.id ? "var(--brand-green)" : "var(--text-muted)",
                  fontWeight: section === s.id ? 600 : 400, fontSize: "0.82rem", cursor: "pointer", textAlign: "left",
                }}
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
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                width: "100%", borderRadius: 8, border: "none", background: "transparent",
                color: "#ef4444", fontSize: "0.82rem", cursor: "pointer", textAlign: "left", fontWeight: 500,
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>{SECTIONS.find((s) => s.id === section)?.label}</h2>
          </div>
          <div className="admin-card-body">
            {section === "profile" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, padding: 20, background: "var(--bg-secondary)", borderRadius: 10 }}>
                  <div className="admin-avatar" style={{ width: 56, height: 56, fontSize: "1.1rem" }}>
                    {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "A"}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{user?.name || "Admin"}</h3>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>{user?.email}</p>
                    <span className="status-badge active" style={{ marginTop: 6 }}>Administrator</span>
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
                  <label>Phone</label>
                  <input className="form-input" defaultValue={user?.phone || ""} placeholder="Your phone number" />
                </div>
                <button className="btn btn-primary" style={{ marginTop: 8 }}>Save Profile</button>
              </div>
            )}

            {section === "theme" && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: 24 }}>
                  Choose your preferred theme for the admin dashboard.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { id: "light", label: "Light Mode", icon: Sun, desc: "Clean white interface" },
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
                          <div style={{ fontSize: "0.7rem", color: "var(--brand-green)", marginTop: 8, fontWeight: 600 }}>✓ Currently active</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {section === "security" && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: 24 }}>Keep your admin account secure.</p>
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
                <button className="btn btn-primary" style={{ marginTop: 8 }}>Update Password</button>
                <div style={{ marginTop: 28, padding: 16, background: "rgba(239,68,68,0.06)", borderRadius: 10, border: "1px solid rgba(239,68,68,0.15)" }}>
                  <h4 style={{ color: "#ef4444", margin: "0 0 8px", fontSize: "0.88rem" }}>Danger Zone</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0 0 12px" }}>Logging out will end your admin session immediately.</p>
                  <button className="btn btn-danger" onClick={handleLogout}><LogOut size={13} /> Logout Admin</button>
                </div>
              </div>
            )}

            {section === "account" && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: 24 }}>Manage your account settings and preferences.</p>
                <div className="form-group">
                  <label>Language</label>
                  <select className="form-input">
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select className="form-input">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date Format</label>
                  <select className="form-input">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <button className="btn btn-primary" style={{ marginTop: 8 }}>Save Preferences</button>
              </div>
            )}

            {section === "notifications" && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: 24 }}>Control which notifications you receive.</p>
                {[
                  { label: "New user registrations", desc: "Get notified when a new user signs up" },
                  { label: "Support tickets", desc: "Get notified when a new support ticket is opened" },
                  { label: "System updates", desc: "Get notified about system changes and updates" },
                  { label: "Weekly reports", desc: "Receive weekly platform analytics reports" },
                ].map((n, i) => (
                  <div key={n.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{n.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{n.desc}</div>
                    </div>
                    <label style={{ position: "relative", display: "inline-block", width: 40, height: 22, cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked={i < 2} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: "absolute", inset: 0, background: i < 2 ? "var(--brand-green)" : "var(--border-color)", borderRadius: 22, transition: "0.2s" }} />
                      <span style={{ position: "absolute", left: i < 2 ? 20 : 2, top: 2, width: 18, height: 18, background: "#fff", borderRadius: "50%", transition: "0.2s" }} />
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
