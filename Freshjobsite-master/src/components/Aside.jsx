import React from "react";
import check_circle_icon from "../assets/icons/check_circle.png";
import career_login from "../assets/images/career_login.png";

const texts = [
  "Tailored Job Recommendations",
  "Application Monitoring Hub",
  "Seamless Interview Scheduling",
];

const Aside = () => {
  return (
    <div className="container-aside">
      <div className="inside">
        <div className="aside-head">
          <h2>Connection Careers</h2>
          <p>Leading job seeker & employer platform</p>
        </div>
        <div className="aside-main">
          <img src={career_login} />
        </div>
        <div className="aside-footer">
          {texts.map((text, index) => (
            <div className="aside-footer-content" key={index}>
              <img src={check_circle_icon} width={24} height={24} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
