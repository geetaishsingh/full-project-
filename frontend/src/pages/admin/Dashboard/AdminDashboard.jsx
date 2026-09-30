import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  Code2,
  Video,
  Pencil,
  Headphones,
  Layers3,
  ArrowRight,
  TrendingUp,
  Send,
  FileText,
} from "lucide-react";

const stats = [
  { title: "Total Users", value: "10,245", growth: "+12%", icon: Users, type: "green" },
  { title: "Total Notes", value: "2,560", growth: "+8%", icon: BookOpen, type: "orange" },
  { title: "Total Projects", value: "1,860", growth: "+15%", icon: Code2, type: "purple" },
  { title: "Mock Interviews", value: "930", growth: "+10%", icon: Video, type: "blue" },
];

const quickActions = [
  { title: "Edit User Home", description: "Update banners, sections and content", icon: Pencil, type: "green", path: "/admin/services" },
  { title: "Manage Users", description: "View, add or manage users", icon: Users, type: "orange", path: "/admin/users" },
  { title: "Manage Content", description: "Notes, projects, interviews etc.", icon: Layers3, type: "blue", path: "/admin/services" },
  { title: "Services & Support", description: "Handle user queries and support", icon: Headphones, type: "purple", path: "/admin/support" },
  { title: "View Messages", description: "Read and respond to messages", icon: Send, type: "red", path: "/admin/support" },
  { title: "Reports", description: "View analytics and reports", icon: FileText, type: "green", path: "/admin/dashboard" },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", joined: "2 hrs ago", status: "active" },
  { name: "Rahul Verma", email: "rahul@example.com", joined: "5 hrs ago", status: "active" },
  { name: "Anika Patel", email: "anika@example.com", joined: "1 day ago", status: "pending" },
  { name: "Dev Kumar", email: "dev@example.com", joined: "2 days ago", status: "active" },
  { name: "Simran Kaur", email: "simran@example.com", joined: "3 days ago", status: "inactive" },
];

const recentActivity = [
  { icon: Users, type: "green", title: "New user registered", desc: "Priya Sharma joined SkillNest", time: "2m ago" },
  { icon: Send, type: "orange", title: "Support ticket opened", desc: "User reported login issue", time: "15m ago" },
  { icon: Code2, type: "purple", title: "New project submitted", desc: "React portfolio project added", time: "1h ago" },
  { icon: BookOpen, type: "blue", title: "Notes published", desc: "JavaScript fundamentals guide", time: "3h ago" },
  { icon: Video, type: "green", title: "Interview completed", desc: "Mock interview session ended", time: "5h ago" },
];

function AdminDashboard() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user?.name || "Admin"} 👋</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/admin/users")}>
          <Users size={14} />
          View All Users
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.type}`}>
                <Icon size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-label">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-growth">
                  <TrendingUp size={11} style={{ display: "inline", marginRight: 3 }} />
                  {stat.growth} this month
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="dashboard-grid">
        {/* Left */}
        <div className="dashboard-left">
          {/* Quick Actions */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Quick Actions</h2>
              <button className="btn btn-secondary btn-sm">View All <ArrowRight size={12} /></button>
            </div>
            <div className="admin-card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.title}
                      onClick={() => navigate(action.path)}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-secondary)",
                        transition: "transform 0.15s, box-shadow 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                    >
                      <div className={`stat-icon ${action.type}`} style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 10 }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{action.title}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{action.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Recent Users</h2>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate("/admin/users")}>
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u) => (
                    <tr key={u.email}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="admin-avatar" style={{ width: 28, height: 28, fontSize: "0.65rem" }}>
                            {u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.82rem" }}>{u.name}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{u.joined}</td>
                      <td>
                        <span className={`status-badge ${u.status}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="dashboard-right">
          {/* Recent Activity */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Recent Activity</h2>
              <button className="btn btn-secondary btn-sm">View All <ArrowRight size={12} /></button>
            </div>
            <div className="admin-card-body" style={{ padding: "12px 16px" }}>
              {recentActivity.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: idx < recentActivity.length - 1 ? "1px solid var(--border-light)" : "none",
                    }}
                  >
                    <div className={`stat-icon ${item.type}`} style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }}>
                      <Icon size={14} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{item.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Summary */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Service Summary</h2>
            </div>
            <div className="admin-card-body" style={{ padding: "12px 16px" }}>
              {[
                { label: "Resume Builder", value: 78, color: "var(--color-green)" },
                { label: "Smart Notes", value: 62, color: "var(--color-orange)" },
                { label: "Build Projects", value: 45, color: "var(--color-purple)" },
                { label: "Mock Interview", value: 34, color: "var(--color-blue)" },
              ].map((s) => (
                <div key={s.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.78rem" }}>
                    <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</span>
                    <span style={{ color: "var(--text-muted)" }}>{s.value}%</span>
                  </div>
                  <div style={{ height: 6, background: "var(--bg-tertiary)", borderRadius: 6 }}>
                    <div style={{ height: "100%", width: `${s.value}%`, background: s.color, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
