import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

const pastTickets = [
  { id: "TK-005", subject: "Notes not loading", status: "resolved", time: "3 days ago" },
  { id: "TK-012", subject: "Resume export issue", status: "resolved", time: "1 week ago" },
];

function UserSupport() {
  const [form, setForm] = useState({ subject: "", category: "General", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ subject: "", category: "General", message: "" });
    }, 3000);
  };

  return (
    <div className="user-page-container">
      <div className="user-page-header">
        <h1 className="user-page-title">Support</h1>
        <p className="user-page-subtitle">Need help? We're here for you.</p>
      </div>

      <div className="support-layout">
        {/* Submit form */}
        <div className="support-form-card">
          <h3>Submit a Ticket</h3>

          {submitted ? (
            <div style={{
              padding: 24, textAlign: "center", background: "var(--color-green-bg)",
              borderRadius: 10, color: "var(--color-green)",
            }}>
              <MessageSquare size={32} style={{ margin: "0 auto 12px" }} />
              <strong style={{ display: "block", marginBottom: 6 }}>Ticket Submitted!</strong>
              <span style={{ fontSize: "0.85rem" }}>We'll get back to you within 24 hours.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option>General</option>
                  <option>Technical Issue</option>
                  <option>Billing</option>
                  <option>Feature Request</option>
                  <option>Account</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  className="form-input"
                  placeholder="Brief description of your issue"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <Send size={14} />
                Submit Ticket
              </button>
            </form>
          )}
        </div>

        {/* Ticket history */}
        <div>
          <div className="support-history">
            <div className="support-history-header">My Past Tickets</div>
            {pastTickets.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No tickets yet
              </div>
            ) : (
              pastTickets.map((t) => (
                <div className="support-ticket" key={t.id}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.id}</span>
                    <span className={`status-badge ${t.status}`}>{t.status}</span>
                  </div>
                  <div className="support-ticket-title">{t.subject}</div>
                  <div className="support-ticket-meta">
                    <span>{t.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 16, background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-color)", fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>
              Quick Help
            </div>
            {[
              { q: "How do I reset my password?", a: "Go to login page and click 'Forgot Password'." },
              { q: "Can I export my resume?", a: "Yes! Resume builder supports PDF and DOCX export." },
              { q: "How do I delete my account?", a: "Contact support — we'll process it within 24 hours." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px 20px", borderBottom: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--text-primary)", marginBottom: 4 }}>❓ {item.q}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSupport;
