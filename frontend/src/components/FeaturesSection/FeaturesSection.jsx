import React from "react";
import "./FeaturesSection.scss";
import Card from "../Card/Card";
import image from "../../assets/hero-dark.png";
import Icon from "../../icons/Icon";
const FeaturesHeading = () => {
  const features = [
    {
      "image": image,
      "title": "Make Your Resume",
      "description": "Create a professional resume with modern templates.",
      "text": "Create Resume",
      "bgColor": "green",
    },
    {
      "image": image,

      "title": "Get Smart Notes",
      "description": "Access high-quality notes for every topic.",
      "text": "Explore Notes",
      "bgColor": "brown",
    },
    {
      "image": image,

      "title": "Buy a Project",
      "description": "Get source code of real-world projects.",
      "text": "Browse Projects",
      "bgColor": "green",
    },
    {
      "image": image,

      "title": "Mock Interview",
      "description": "Practice with AI-powered interviews.",
      "text": "Start Interview",
      "bgColor": "brown",
    },
    {
      "image": image,

      "title": "Collaborate",
      "description": "Work on projects with other learners and become part of a global community.",
      "text": "Join Community",
      "bgColor": "green",
    }
  ];
  const list = [
    {
      "icon": "user",
      "title": "10K+",
      "dec": "Active Learners",
      "color": "brown",
    },
    {
      "icon": "rocket",
      "title": "1K+",
      "dec": "Projects Shared",
      "color": "green",

    }
    ,
    {
      "icon": "bar",
      "title": "200+",
      "dec": "Collaborative Projects",
      "color": "brown",

    }
    ,
    {
      "icon": "win",
      "title": "95%",
      "dec": "User Saticfaction",
      "color": "brown",

    }

  ]
  return (
    <section className="features-section container">
      <div className="features-heading">
        <div className="mini-title">EXPLORE OUR FEATURES</div>
        <h2>
          Everything You Need in <span>One Place</span>
        </h2>
        <p>Powerful tools to help you learn, build, and grow every day.</p>
      </div>
      <div className="card-wrapper">
        {
          features.map((feature, id) => (
            <Card feature={feature} key={id} />
          ))
        }
      </div>
      <div className="list-wrapper">
        {
          list.map((i, id) => (
            <div key={id} className="item">
              <div className="image-wrapper"
                style={i.color == "brown" ? { background: "#a956322d" } : { background: "#16725e2f" }}>
                <Icon type={`${i.icon}`} size={35} />
              </div>
              <div className="text-wrapper">
                <h3>{i.title}</h3>
                <p>{i.dec}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default FeaturesHeading;
