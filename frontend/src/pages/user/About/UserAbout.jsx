import { GraduationCap, Code2, BookOpen, Video, Users, FileText } from "lucide-react";

const features = [
  { icon: FileText, title: "Resume Builder", desc: "AI-powered resume creation with professional templates.", color: "green" },
  { icon: BookOpen, title: "Smart Notes", desc: "Structured notes with topic organization and sync.", color: "orange" },
  { icon: Code2, title: "Build Projects", desc: "Showcase your work to the developer community.", color: "blue" },
  { icon: Video, title: "Mock Interviews", desc: "Practice interviews with AI-powered feedback.", color: "purple" },
  { icon: Users, title: "Collaborate", desc: "Real-time collaboration tools for developers.", color: "green" },
];

function UserAbout() {
  return (
    <div>
      {/* Hero */}
      <div className="about-hero">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "var(--brand-green)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <GraduationCap size={36} />
          </div>
        </div>
        <h1>About SkillNest</h1>
        <p>
          SkillNest is your comprehensive learning and career development platform built for
          developers. From resume building to mock interviews, smart notes to project showcasing —
          we give you every tool you need to grow in one place.
        </p>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          {[
            { label: "Active Users", value: "10,000+" },
            { label: "Projects Shared", value: "1,800+" },
            { label: "Mock Interviews", value: "900+" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--brand-green)" }}>{stat.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div style={{ maxWidth: 860, margin: "0 auto 40px", padding: "0 24px" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: 36, boxShadow: "var(--shadow-sm)", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--brand-green)", marginBottom: 10 }}>Our Mission</div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-primary)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            "To make career development accessible, structured, and community-driven
            for every developer — from beginner to professional."
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "0 24px 60px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", textAlign: "center", color: "var(--text-primary)", marginBottom: 24 }}>
          Everything You Need to Succeed
        </h2>
        <div className="about-features">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div className="about-feature-card" key={f.title}>
                <div className={`about-feature-icon ${f.color}`}>
                  <Icon size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserAbout;
