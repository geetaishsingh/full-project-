import { useState } from "react";
import { MessageSquare, Eye, CheckCircle, Clock, Search } from "lucide-react";

const mockTickets = [
  { id: "TK-001", user: "Priya Sharma", email: "priya@example.com", subject: "Cannot login with Google", message: "I've been trying to login with Google but it just shows a blank screen after redirecting. Please help.", status: "pending", time: "2 hrs ago", priority: "high" },
  { id: "TK-002", user: "Rahul Verma", email: "rahul@example.com", subject: "Resume builder not saving", message: "Every time I try to save my resume, it shows an error. I've tried multiple times.", status: "open", time: "5 hrs ago", priority: "medium" },
  { id: "TK-003", user: "Anika Patel", email: "anika@example.com", subject: "Password reset email not received", message: "I requested a password reset but I haven't received the email. It's been over an hour.", status: "resolved", time: "1 day ago", priority: "low" },
  { id: "TK-004", user: "Dev Kumar", email: "dev@example.com", subject: "Notes not syncing across devices", message: "My notes are not showing on mobile but are visible on desktop. Can you please look into this?", status: "open", time: "2 days ago", priority: "medium" },
  { id: "TK-005", user: "Simran Kaur", email: "simran@example.com", subject: "Project submission error", message: "Getting a 500 error when submitting my project. The form shows a success message but the project doesn't appear.", status: "resolved", time: "3 days ago", priority: "high" },
];

function AdminSupport() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");

  const filtered = mockTickets.filter((t) => {
    const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const priorityColor = { high: "var(--color-red)", medium: "var(--color-orange)", low: "var(--color-green)" };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Support</h1>
          <p className="page-subtitle">{mockTickets.filter(t => t.status !== "resolved").length} open tickets</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-body" style={{ padding: "14px 20px" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="search-bar" style={{ flex: "1 1 240px" }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["all", "open", "pending", "resolved"].map((f) => (
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

      {/* Ticket detail modal */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          onClick={() => { setSelected(null); setReply(""); }}
        >
          <div
            style={{ background: "var(--bg-card)", borderRadius: 14, padding: 28, maxWidth: 540, width: "100%", maxHeight: "85vh", overflow: "auto", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-color)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{selected.subject}</h3>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{selected.id} · {selected.time}</div>
              </div>
              <span className={`status-badge ${selected.status === "resolved" ? "resolved" : selected.status === "pending" ? "pending" : "active"}`}>{selected.status}</span>
            </div>

            <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div className="admin-avatar" style={{ width: 26, height: 26, fontSize: "0.6rem" }}>
                  {selected.user.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
                <div>
                  <strong style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{selected.user}</strong>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{selected.email}</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{selected.message}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Reply to user</label>
              <textarea
                className="form-input"
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your response here..."
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              <button className="btn btn-secondary" onClick={() => { setSelected(null); setReply(""); }}>Close</button>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary" style={{ color: "var(--color-green)" }}>
                  <CheckCircle size={13} /> Mark Resolved
                </button>
                <button className="btn btn-primary" disabled={!reply.trim()}>
                  <MessageSquare size={13} /> Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tickets list */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-muted)" }}>{t.id}</td>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.82rem" }}>{t.user}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.email}</div>
                </td>
                <td style={{ maxWidth: 200 }}>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.subject}</div>
                </td>
                <td>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: priorityColor[t.priority] }}>{t.priority}</span>
                </td>
                <td>
                  <span className={`status-badge ${t.status === "resolved" ? "resolved" : t.status === "pending" ? "pending" : "active"}`}>{t.status}</span>
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{t.time}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelected(t)}>
                    <Eye size={12} /> View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)" }}>No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSupport;
