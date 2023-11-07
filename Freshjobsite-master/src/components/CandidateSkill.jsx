import React from "react";
import star from "../assets/icons/start.png";

const CandidateSkill = ({ skill, rating }) => {
  return (
    <p className="rating">
      {skill} . {rating} <img src={star} width={15} height={15} alt="" />
    </p>
  );
};

export default CandidateSkill;
