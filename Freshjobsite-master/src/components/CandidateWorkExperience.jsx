import React from "react";

const CandidateWorkExperience = ({ title, duration, company, duties,location }) => {
  return (
    <div className="past_job">
      <span>
        <h3>{title}</h3>
        <p>{duration}</p>
      </span>
      <p>{company} | {location}</p>
      <ul>{duties}</ul>
    </div>
  );
};

export default CandidateWorkExperience;
