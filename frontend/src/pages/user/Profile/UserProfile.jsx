import { useOutletContext } from "react-router-dom";
import { User, Mail, Phone, Shield } from "lucide-react";

function UserProfile() {
  const { user } = useOutletContext();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="user-page-container">
      <div className="user-page-header">
        <h1 className="user-page-title">My Profile</h1>
        <p className="user-page-subtitle">View and manage your personal information</p>
      </div>

      <div className="user-profile-page">
        <div className="profile-info-card">
          {/* Avatar section */}
          <div className="profile-avatar-section">
            <div className="profile-big-avatar">{initials}</div>
            <div className="profile-avatar-info">
              <h3>{user?.name || "User"}</h3>
              <span>{user?.email}</span>
              <div style={{ marginTop: 8 }}>
                <span className="status-badge active">Active Account</span>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="profile-fields">
            <div className="profile-field">
              <label>
                <User size={12} style={{ display: "inline", marginRight: 4 }} />
                Full Name
              </label>
              <p>{user?.name || "—"}</p>
            </div>

            <div className="profile-field">
              <label>
                <Mail size={12} style={{ display: "inline", marginRight: 4 }} />
                Email Address
              </label>
              <p>{user?.email || "—"}</p>
            </div>

            <div className="profile-field">
              <label>
                <Phone size={12} style={{ display: "inline", marginRight: 4 }} />
                Phone Number
              </label>
              <p>{user?.phone || "—"}</p>
            </div>

            <div className="profile-field">
              <label>
                <Shield size={12} style={{ display: "inline", marginRight: 4 }} />
                Account Role
              </label>
              <p>User</p>
            </div>
          </div>
        </div>

        {/* Edit notice */}
        <div style={{
          padding: "14px 20px",
          background: "var(--color-blue-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: 10,
          color: "var(--color-blue)",
          fontSize: "0.82rem",
          lineHeight: 1.5,
        }}>
          ℹ️ To update your profile details, please visit the <strong>Settings</strong> page.
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
