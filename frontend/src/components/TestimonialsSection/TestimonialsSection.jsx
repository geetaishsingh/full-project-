import React from "react";
import "./TestimonialsSection.scss";
import Icon from "../../icons/Icon";
const testimonials = [
  {
    id: 1,
    name: "Sneha Verma",
    role: "Web Developer",
    quote:
      "This platform helped me create an amazing portfolio for internship. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Frontend Developer",
    quote:
      "The notes are well structured and the mock interviews boosted my confidence in real interviews.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 3,
    name: "Aman Singh",
    role: "Full Stack Developer",
    quote: "I improved my JavaScript here and got placed in a really good product company. Thank you SkillNest!",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 5,
  },
];

const Star = () => (
  <svg viewBox="0 0 24 24" className="star-icon" aria-hidden="true">
    <path
      d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.7 20.9l1.7-7L2 9.2l7.1-.6L12 2z"
      fill="currentColor"
    />
  </svg>
);

const QuoteMark = () => (
  <svg viewBox="0 0 32 24" className="quote-icon" aria-hidden="true">
    <path
      d="M4 24V14.6C4 7.6 8.4 2.4 15.6 0l1.6 3.6C12.4 5.6 10 8.8 10 12.4h6V24H4zm18 0V14.6C22 7.6 26.4 2.4 33.6 0l1.6 3.6c-4.8 2-7.2 5.2-7.2 8.8h6V24H22z"
      fill="currentColor"
    />
  </svg>
);

function TestimonialCard({ name, role, quote, avatar, rating }) {
  return (
    <div className="testimonial-card">
      <QuoteMark />
      <p className="testimonial-card__quote">&ldquo;{quote}&rdquo;</p>
      <div className="testimonial-card__footer">
        <img className="testimonial-card__avatar" src={avatar} alt={name} />
        <div className="testimonial-card__meta">
          <h4>{name}</h4>
          <span>{role}</span>
        </div>
        <div className="testimonial-card__stars">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TestimonialsSection = () => {
  return (
    <section className="testimonials container">
      <div className="testimonials__container">
        <span className="testimonials__eyebrow">WHAT OUR USERS <span> SAY</span></span>
        <h2 className="testimonials__heading">Trusted by Learners Like You</h2>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>

      <div className="cta-banner">
        <div className="left-section">
          <h3>Ready to Build Your Future?</h3>
          <p>Join thousands of learners, developers and creators on SkillNest.</p>
        </div>
        <div className="right-section">
          <div className="img-wrapper">
          </div>
          <button className="btn btn--primary">
            Get Started <Icon type="arrow" />
          </button>
          <button className="btn btn--outline">
            <Icon type="play" size={32} />
            Watch Video
          </button>
          <span className="sticker">
            Your Best Step Starts Here! <span className="arrow">&#8600;</span>
          </span>
        </div>
      </div>
    </section>
  );
}
export default TestimonialsSection;