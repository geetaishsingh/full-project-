import { FileText, BookOpen, Code2, Video, Users, ArrowRight } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "Create a professional resume with AI-powered suggestions, modern templates, and export to PDF.",
    color: "green",
    status: "active",
    tag: "Most Popular",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    desc: "Take structured notes organized by topic, tag, and project. Sync across all devices.",
    color: "orange",
    status: "active",
    tag: "New",
  },
  {
    icon: Code2,
    title: "Build Projects",
    desc: "Host, share, and showcase your coding projects to the SkillNest developer community.",
    color: "blue",
    status: "active",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    desc: "Practice with AI-powered mock interviews and get detailed feedback to improve your performance.",
    color: "purple",
    status: "active",
  },
  {
    icon: Users,
    title: "Collaborate",
    desc: "Work together on projects with real-time collaboration tools, chat, and code sharing.",
    color: "green",
    status: "coming-soon",
  },
];

function UserServices() {
  return (
    <div className="user-page-container">
      <div className="user-page-header">
        <h1 className="user-page-title">Services</h1>
        <p className="user-page-subtitle">Explore all features available on your account</p>
      </div>

      <div className="services-grid">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div className="service-card" key={s.title} style={{ position: "relative" }}>
              {s.tag && (
                <span style={{
                  position: "absolute", top: 14, right: 14,
                  fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px",
                  background: "var(--color-green-bg)", color: "var(--color-green)",
                  borderRadius: 20,
                }}>
                  {s.tag}
                </span>
              )}
              <div className={`service-card-icon ${s.color}`}>
                <Icon size={22} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-card-status">
                <span className={`status-badge ${s.status === "active" ? "active" : "pending"}`}>
                  {s.status === "coming-soon" ? "Coming Soon" : "Available"}
                </span>
                {s.status === "active" && (
                  <button className="btn btn-secondary btn-sm">
                    Open <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserServices;
