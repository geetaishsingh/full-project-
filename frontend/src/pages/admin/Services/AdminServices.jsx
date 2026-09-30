import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";

const mockServices = [
  { id: 1, name: "Resume Builder", category: "Career", users: 3240, status: "active", desc: "Create professional resumes with AI-powered suggestions and templates." },
  { id: 2, name: "Smart Notes", category: "Learning", users: 2100, status: "active", desc: "Take structured notes, organize them by topic, and sync across devices." },
  { id: 3, name: "Build Projects", category: "Development", users: 1860, status: "active", desc: "Host and showcase your coding projects to the SkillNest community." },
  { id: 4, name: "Mock Interviews", category: "Career", users: 930, status: "active", desc: "Practice with realistic mock interviews and get instant AI feedback." },
  { id: 5, name: "Collaborate", category: "Community", users: 780, status: "maintenance", desc: "Work together on projects with real-time collaboration tools." },
  { id: 6, name: "Community Forum", category: "Community", users: 1450, status: "active", desc: "Discuss, ask questions, and help each other grow in the community." },
];

function AdminServices() {
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">{mockServices.length} services listed</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={14} />
          Add Service
        </button>
      </div>

      {/* Service detail/edit panel */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}
          onClick={() => { setSelected(null); setEditMode(false); }}
        >
          <div
            style={{ background: "var(--bg-card)", borderRadius: 14, padding: 32, maxWidth: 480, width: "100%", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-color)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {editMode ? "Edit Service" : "Service Details"}
              </h3>
              <span className={`status-badge ${selected.status === "active" ? "active" : "pending"}`}>{selected.status}</span>
            </div>
            {editMode ? (
              <div>
                <div className="form-group">
                  <label>Service Name</label>
                  <input className="form-input" defaultValue={selected.name} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input className="form-input" defaultValue={selected.category} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-input" rows={3} defaultValue={selected.desc} style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { setEditMode(false); setSelected(null); }}>Save Changes</button>
                </div>
              </div>
            ) : (
              <div>
                {[
                  { label: "Name", value: selected.name },
                  { label: "Category", value: selected.category },
                  { label: "Active Users", value: selected.users.toLocaleString() },
                  { label: "Description", value: selected.desc },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", padding: "8px 12px", background: "var(--bg-secondary)", borderRadius: 8 }}>{f.value}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary" onClick={() => { setSelected(null); }}>Close</button>
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}><Edit2 size={12} /> Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {mockServices.map((service) => (
          <div className="admin-card" key={service.id} style={{ transition: "transform 0.2s", cursor: "default" }}>
            <div className="admin-card-header">
              <div>
                <h2 style={{ fontSize: "0.9rem" }}>{service.name}</h2>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{service.category}</span>
              </div>
              <span className={`status-badge ${service.status === "active" ? "active" : "pending"}`}>{service.status}</span>
            </div>
            <div className="admin-card-body">
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 14 }}>{service.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {service.status === "active" ? <CheckCircle size={13} color="var(--color-green)" style={{ display: "inline", marginRight: 4 }} /> : <XCircle size={13} color="var(--color-orange)" style={{ display: "inline", marginRight: 4 }} />}
                  {service.users.toLocaleString()} users
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelected(service)} title="View">
                    <Eye size={12} />
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setSelected(service); setEditMode(true); }} title="Edit">
                    <Edit2 size={12} />
                  </button>
                  <button className="btn btn-danger btn-sm" title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminServices;
