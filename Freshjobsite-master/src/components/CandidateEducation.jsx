import React from "react";
import location from "../assets/icons/location.png";

const CandidateEducation = ({ school, duration, course, location_ }) => {
  return (
    <div>
      <span>
        <p>{school}</p>
        <p>{duration}</p>
      </span>
      <span style={{ marginTop: 10 }}>
        <p className="it_txt">{course}</p>
        <p className="it_txt">3.56</p>
      </span>
      <p className="it_txt">
        <img src={location} width={17} height={17} color="#8B5CF6" />
        {location_}
      </p>
    </div>
  );
};

export default CandidateEducation;
