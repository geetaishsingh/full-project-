import { useState } from "react";
import { Edit2, Save, X, Globe, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const defaultInfo = {
  companyName: "SkillNest",
  tagline: "Learn Today, Build Tomorrow.",
  description: "SkillNest is a comprehensive learning and career development platform designed for developers. We provide tools for resume building, smart note-taking, project showcasing, mock interviews, and community collaboration.",
  email: "hello@skillnest.io",
  phone: "+91 98765 43210",
  address: "Bangalore, Karnataka, India",
  website: "https://skillnest.io",
  founded: "2025",
  teamSize: "12–20 employees",
  mission: "To make career development accessible, structured, and community-driven for every developer.",
};

function AdminAbout() {
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState(defaultInfo);
  const [draft, setDraft] = useState({ ...defaultInfo });

  const handleSave = () => {
    setInfo({ ...draft });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...info });
    setEditing(false);
  };

  const Field = ({ label, field, multiline = false }) => (
    <div className="form-group">
      <label>{label}</label>
      {editing ? (
        multiline ? (
          <textarea
            className="form-input"
            rows={3}
            value={draft[field]}
            onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
            style={{ resize: "vertical" }}
          />
        ) : (
          <input
            className="form-input"
            value={draft[field]}
            onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
          />
        )
      ) : (
        <div style={{ fontSize: "0.9rem", color: "var(--text-primary)", padding: "10px 14px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--border-light)" }}>
          {info[field]}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">About</h1>
          <p className="page-subtitle">Manage company and website information</p>
        </div>
        <div className="page-actions">
          {editing ? (
            <>
              <button className="btn btn-secondary" onClick={handleCancel}>
                <X size={14} /> Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <Save size={14} /> Save Changes
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              <Edit2 size={14} /> Edit Information
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        {/* Brand */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Brand Identity</h2>
          </div>
          <div className="admin-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: 20, background: "var(--bg-secondary)", borderRadius: 10 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: "var(--brand-green)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{info.companyName}</h3>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>{info.tagline}</p>
              </div>
            </div>
            <Field label="Company Name" field="companyName" />
            <Field label="Tagline" field="tagline" />
            <Field label="Description" field="description" multiline />
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-card-header">
              <h2>Contact Details</h2>
            </div>
            <div className="admin-card-body">
              <Field label="Email" field="email" />
              <Field label="Phone" field="phone" />
              <Field label="Address" field="address" />
              <Field label="Website" field="website" />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Company Info</h2>
            </div>
            <div className="admin-card-body">
              <Field label="Founded" field="founded" />
              <Field label="Team Size" field="teamSize" />
              <Field label="Mission Statement" field="mission" multiline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAbout;
