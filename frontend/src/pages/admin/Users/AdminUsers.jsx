import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, UserPlus } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Priya Sharma", email: "priya@example.com", phone: "9876543210", joined: "2026-09-25", status: "active", role: "user" },
  { id: 2, name: "Rahul Verma", email: "rahul@example.com", phone: "9123456789", joined: "2026-09-24", status: "active", role: "user" },
  { id: 3, name: "Anika Patel", email: "anika@example.com", phone: "9234567890", joined: "2026-09-23", status: "pending", role: "user" },
  { id: 4, name: "Dev Kumar", email: "dev@example.com", phone: "9345678901", joined: "2026-09-20", status: "active", role: "user" },
  { id: 5, name: "Simran Kaur", email: "simran@example.com", phone: "9456789012", joined: "2026-09-18", status: "inactive", role: "user" },
  { id: 6, name: "Amit Joshi", email: "amit@example.com", phone: "9567890123", joined: "2026-09-15", status: "active", role: "user" },
  { id: 7, name: "Neha Gupta", email: "neha@example.com", phone: "9678901234", joined: "2026-09-12", status: "active", role: "user" },
  { id: 8, name: "Kiran Singh", email: "kiran@example.com", phone: "9789012345", joined: "2026-09-10", status: "inactive", role: "user" },
];

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">{filtered.length} of {mockUsers.length} users</p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={14} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-body" style={{ padding: "14px 20px" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="search-bar" style={{ flex: "1 1 240px" }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["all", "active", "pending", "inactive"].map((f) => (
                <button
                  key={f}
                  className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setFilter(f)}
                  style={{ textTransform: "capitalize" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 14, padding: 32, maxWidth: 440, width: "100%",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div className="admin-avatar" style={{ width: 52, height: 52, fontSize: "1rem" }}>
                {selectedUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedUser.name}</h3>
                <span className={`status-badge ${selectedUser.status}`} style={{ marginTop: 4 }}>{selectedUser.status}</span>
              </div>
            </div>
            {[
              { label: "Email", value: selectedUser.email },
              { label: "Phone", value: selectedUser.phone },
              { label: "Joined", value: selectedUser.joined },
              { label: "Role", value: selectedUser.role },
            ].map((field) => (
              <div key={field.label} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{field.label}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", padding: "8px 12px", background: "var(--bg-secondary)", borderRadius: 8 }}>{field.value}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
              <button className="btn btn-danger btn-sm">Delete User</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="admin-avatar" style={{ width: 30, height: 30, fontSize: "0.7rem" }}>
                      {u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.85rem" }}>{u.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{u.phone}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{u.joined}</td>
                <td>
                  <span className={`status-badge ${u.status}`}>{u.status}</span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedUser(u)} title="View">
                      <Eye size={12} />
                    </button>
                    <button className="btn btn-secondary btn-sm" title="Edit">
                      <Edit2 size={12} />
                    </button>
                    <button className="btn btn-danger btn-sm" title="Delete">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-muted)" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
