import React from "react";
import calender from "../assets/icons/calendar.svg";

const JobCard = ({ application }) => {
  const output = application?.applied_date;

  return (
    <div
      className="job"
      sx={{
        borderTop: `4px solid ${
          application?.status === "Pending"
            ? "#69CA8F"
            : application.status === "Rejected"
            ? "#f00"
            : "#EA4335"
        }`,
      }}
    >
      <div className="job_top">
        <img
          src={"http://52.1.41.162" + application?.source_picture}
          width={50}
          height={50}
          alt=""
        />
        <p
          style={{
            backgroundColor:
              application?.status === "Pending"
                ? "#69CA8F"
                : application.status === "Rejected"
                ? "#f00"
                : "#EA4335",
          }}
        >
          {application?.status}
        </p>
      </div>
      <div className="job_content">
        <p>{application?.title}</p>
        <p className="para">{application?.company_name}</p>
        <span>
          <img src={calender} width={13.5} height={15} alt="" />
          {((output) => new Date(application?.applied_date))(
            output
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
