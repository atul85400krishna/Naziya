import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import locationIcon from "../assets/icons/location.svg";
import suitcase from "../assets/icons/suitcase.svg";
import payment from "../assets/icons/payment.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: 669,
      overflowX: "hidden",
    },
  },
}));
const CardInfo = ({ data }) => {
  return (
    <div>
      <div className="job-card job-card--card-info">
        <div className="job-card__logo">
          {data?.source_picture && (
            <img src={"http://52.1.41.162" + data?.source_picture} alt="jjo" />
          )}
        </div>
        <div className="job-card__info">
          <div className="card-info__top">
            <h3>{data?.title || "Job Title here"}</h3>
          </div>
          <div className="card-info__middle">
            <div className="card-middle__company-info">
              <span className="company-info__name">
                {data?.company_name || "United Health Group"}
              </span>
              {/* <span className="company-info__time">2 days ago</span> */}
            </div>
            <div className="card-middle__job-info">
              <span className="company-info__location">
                <img src={locationIcon} alt="location" />
                <p>{data?.location || "Job country here"}</p>
              </span>
              <span className="company-info__location company-info__work">
                <img src={suitcase} alt="work" />
                <p>
                  Work :{" "}
                  {data?.worktype +
                    `${data?.worktype && data?.emptype && ", "}` +
                    data?.emptype || "Location Type here"}
                </p>
              </span>
              <span className="company-info__location company-info__salary">
                <img src={payment} alt="salary" />
                <p>{data?.salary || "Job salary here"}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDescription = ({ data }) => {
  console.log(data.skills.replace(/[\[\]'""]+/g, "").split(","));
  return (
    <div className="job-description">
      <h3>Job Description:</h3>
      <p>{data?.job_desc || "Job description here"}</p>
      <h3>Required Skills:</h3>
      <ul className="card-bottom__list">
        {data?.skills && data?.skills?.length > 0
          ? data.skills
              .replace(/[\[\]'""]+/g, "")
              .split(",")
              .map((skill) => <li>{skill}</li>)
          : "Required skills here"}
      </ul>
      <h3>Key Responsibilities:</h3>
      <ul>
        {data?.responsibilities
          ?.split(/\r?\n/)
          ?.filter((item) => item.trim() !== "").length > 0
          ? data?.responsibilities
              ?.split(/\r?\n/)
              ?.filter((item) => item.trim() !== "")
              ?.map((item) => <li key={item}>{item}</li>)
          : "Job responsibilities here"}
      </ul>
      <h3>Salary and Benefit:</h3>
      <ul>
        {data?.benifits?.split(/\r?\n/)?.filter((item) => item.trim() !== "")
          .length > 0
          ? data?.benifits
              ?.split(/\r?\n/)
              ?.filter((item) => item.trim() !== "")
              ?.map((item) => <li>{item}</li>)
          : "Job benefits here"}
      </ul>
    </div>
  );
};
const JobViewModal = ({ handleClose, handleOpen, open, data }) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <section className="post-job__display">
        <CardInfo data={data} />
        <CardDescription data={data} />
      </section>
    </BootstrapDialog>
  );
};

export default JobViewModal;
