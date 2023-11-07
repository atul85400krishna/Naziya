import React from "react";
import JobCard from "./JobCard";
import "./styles/cardcollection.css";

const CardCollection = ({ title, cardData, saveJob, unsaveJob }) => {
  return (
    <section className="card-collection">
      {title && <h2>{title}</h2>}
      {cardData?.length > 0 ? (
        cardData?.map((card, index) => (
          <JobCard
            data={card}
            key={card?.title + index}
            saveJob={saveJob}
            unsaveJob={unsaveJob}
          />
        ))
      ) : (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </section>
  );
};

export default CardCollection;
