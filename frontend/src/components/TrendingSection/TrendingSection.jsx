import React from "react";
import "./TrendingSection.scss";
import Icon from '../../icons/Icon.jsx'
const projects = [
  { title: "E-Commerce Website", tags: ["React", "Node.js", "MongoDB"], likes: "1.2K" },
  { title: "Task Management App", tags: ["React", "Tailwind", "PostgreSQL"], likes: "980" },
  { title: "Weather Dashboard", tags: ["CSS", "JavaScript"], likes: "720" },
  { title: "Chat Application", tags: ["React", "Firebase"], likes: "1.6K" },
];

const TrendingSection = () => {
  return (
    <section className="trending">
      <div className="trending-inner">
        <div className="trending-header">
          <div>
            <span className="heading">Popular Resources</span>
            <h2>Trending Projects &amp; Notes</h2>
            <p>Explore what our community loves the most</p>
          </div>
          <a href="#" className="view-all">View <span>All <Icon type="arrow" size={18} /> </span></a>
        </div>

        <div className="trending-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.title}>
              <div className="project-thumb" />
              <div className="project-body">
                <h3>{p.title}</h3>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  <span className="likes">♥ {p.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;
