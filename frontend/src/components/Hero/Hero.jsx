import React from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";
import Icon          from "../../icons/Icon";
import { useTheme } from "../../context/ThemeContext";

// ── Hero background images ──────────────────────────────────
import heroLight from "../../assets/hero-light.png";
import heroDark  from "../../assets/hero-dark.png";

const FEATURES = [
  { icon: "file",  title: "Resume Builder", tone: "green"  },
  { icon: "notes", title: "Smart Notes",    tone: "peach"  },
  { icon: "code",  title: "Build Projects", tone: "orange" },
  { icon: "user",  title: "Mock Interview", tone: "red"    },
  { icon: "users", title: "Collaborate",    tone: "blue"   },
];

const Hero = () => {
  const { theme } = useTheme();
  const isDark    = theme === "dark";

  return (
    <section
      className={`hero ${isDark ? "hero--dark" : "hero--light"}`}
      style={{
        backgroundImage: `url(${isDark ? heroDark : heroLight})`,
      }}
    >
      <div className="hero-inner">

        {/* ======== LEFT: Text Copy ======== */}
        <div className="hero-copy">

          {/* Eyebrow tag */}
          <div className="eyebrow">
            <span>★</span> YOUR LEARNING &amp; CAREER PARTNER
          </div>

          {/* Heading */}
          <h1>
            Learn Today,
            <br />
            Build <span>Tomorrow.</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Create your resume, take smart notes, build projects, practice
            with mock interviews, and collaborate with other developers — all
            in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started <Icon type="arrow" size={19} />
            </Link>
            <button className="video-btn">
              <span className="play">
                <Icon type="play" size={17} />
              </span>{" "}
              Watch Video
            </button>
          </div>

        </div>

        {/* ======== RIGHT: Visual / Illustration ======== */}
        <div className="hero-visual">

          {/* Desk decorations */}
          <div className="desk">
            <div className="pot"></div>
            <div className="pencil-cup">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Feature card */}
          <aside className="feature-card">
            {FEATURES.map((feature) => (
              <div className="feature-row" key={feature.title}>
                <span className={`feature-icon ${feature.tone}`}>
                  <Icon type={feature.icon} size={21} />
                </span>
                <span>{feature.title}</span>
              </div>
            ))}
          </aside>

        </div>
      </div>
    </section>
  );
};

export default Hero;
