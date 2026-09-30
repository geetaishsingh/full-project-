import React from "react";
import "./Footer.scss";

const socialLinks = [
  { name: "X", href: "#", icon: "x" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

const quickLinks = ["Home", "Features", "Projects", "Mock Interview", "Community", "Pricing"];
const resourceLinks = ["Blog", "Documentation", "Help Center", "Career", "Privacy Policy"];

function SocialIcon({ type }) {
  switch (type) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.6L4.8 22H1.6l8.1-9.3L1 2h7l4.9 6.1L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5V23h-4V8.5z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M23.5 7.2s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C17 3.5 12 3.5 12 3.5h-.01s-5 0-8.2.34c-.46.05-1.46.06-2.36 1C.72 5.56.5 7.2.5 7.2S.27 9.1.27 11.02v1.86c0 1.9.23 3.82.23 3.82s.23 1.64.93 2.36c.9.95 2.08.92 2.6 1.02 1.9.18 8.07.34 8.07.34s5.01-.01 8.2-.35c.46-.05 1.46-.06 2.36-1 .7-.72.94-2.36.94-2.36s.23-1.9.23-3.82v-1.86c0-1.9-.23-3.82-.23-3.82zM9.7 14.9V7.9l6.4 3.5-6.4 3.5z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 4.96 4.96.06 1.3.07 1.6.07 4.77 0 3.17-.01 3.47-.07 4.77-.15 3.25-1.65 4.8-4.96 4.96-1.3.06-1.6.07-4.9.07-3.2 0-3.6 0-4.9-.07-3.32-.15-4.8-1.72-4.96-4.96-.06-1.3-.07-1.6-.07-4.77 0-3.17.01-3.47.07-4.77C2.28 3.97 3.77 2.42 7.1 2.27 8.4 2.21 8.8 2.2 12 2.2zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-brand">
          <a className="brand" href="#" >
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 72 58">
                <path d="M8 10 36 1l28 9-28 10L8 10Z" fill="#146b58" />
                <path
                  d="M16 15v17c0 9 9 15 20 15s20-6 20-15V15L36 24 16 15Z"
                  fill="#1d806b"
                />
              </svg>
            </span>
            <span>
              <strong>SkillNest</strong>
              <small>Learn · Build · Grow</small>
            </span>
          </a>

          <div className="footer-brand__socials">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} className="social-icon">
                <SocialIcon type={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            {resourceLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col--contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <span className="icon">✉️</span> hello@skillnest.com
            </li>
            <li>
              <span className="icon">📞</span> +91 98765 43210
            </li>
            <li>
              <span className="icon">📍</span> Noida, Uttar Pradesh, India
            </li>
          </ul>
        </div>

        <div className="footer-col footer-col--newsletter">
          <h4>Subscribe to Newsletter</h4>
          <p>Get the latest updates, resources and more.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              ➤
            </button>
          </form>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2024 SkillNest. All rights reserved.</span>
        <span>Made with ❤️ for learners, creators and developers.</span>
      </div>
    </footer>
  );
}