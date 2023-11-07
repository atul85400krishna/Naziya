import { useContext, useEffect, useState } from "react";
import "./styles/jobcard.css";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarkFilled from "../assets/icons/bookmark-filled.svg";
import location from "../assets/icons/location.svg";
import arrowForward from "../assets/icons/arrow_forward.svg";
import payment from "../assets/icons/payment.svg";
import earth from "../assets/icons/earth.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const JobCard = ({ data, saveJob, unsaveJob }) => {
  console.log("job card", data);
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const bookmarked = state?.savedJobs
    ? state?.savedJobs?.filter((elem) =>
        // elem?.title === data?.title &&
        // elem?.company_name === data?.company_name &&
        // elem?.job_desc === data?.job_desc &&
        // elem?.location === data?.location &&
        // elem?.salary === data?.salary &&
        elem?.source
          ? elem?.source === data?.source
          : elem?.title === data?.title &&
            elem?.company_name === data?.company_name &&
            elem?.job_desc === data?.job_desc
      )
    : [];

  return (
    <div className="job-card">
      <div className="job-card__logo">
        <img src={data?.img} alt="" />
      </div>
      <div className="job-card__info">
        <div className="card-info__top">
          <h3>
            {data?.title ||
              "Senior UI/UX Designer, Trilogy (Remote) - $ 100,000/year USD"}
          </h3>
          <span className="card-info__new">New</span>
          {state.isAuthenticated && (
            <span
              className="card-bookmark"
              onClick={() =>
                state.isAuthenticated
                  ? bookmarked.length > 0
                    ? unsaveJob(bookmarked[0])
                    : saveJob(data)
                  : navigate("/login")
              }
            >
              <img
                src={bookmarked.length > 0 ? bookmarkFilled : bookmark}
                alt="bookmark"
              />
            </span>
          )}
        </div>
        <div className="card-info__middle">
          <div className="card-middle__company-info">
            <span className="company-info__name">
              {data?.company_name || "United Health Group"}
            </span>
            <span className="company-info__time">New</span>
          </div>
          <div className="card-middle__job-info">
            {data?.location && (
              <span className="company-info__location">
                <img src={location} alt="location" />
                <p>{data?.location}</p>
              </span>
            )}
            {/* <span className="company-info__location company-info__work">
              <img src={suitcase} alt="work" />
              <p>Work : Fulltime, Remote</p>
            </span> */}
            {data?.salary && (
              <span className="company-info__location company-info__salary">
                <img src={payment} alt="salary" />
                <p>{data?.salary}</p>
              </span>
            )}
          </div>
        </div>
        {data?.source && (
          <span className="company-info__location company-info__salary job-info__source">
            <img src={earth} alt="salary" />
            <p>Source: {data?.source}</p>
          </span>
        )}
        <div className="card-info__bottom">
          {/* <ul className="card-bottom__list">
            <li>HTML</li>
            <li>CSS</li>
            <li>BOOTSTRAP</li>
            <li>+2</li>
          </ul> */}
          <NavLink
            to={
              data?.job_id
                ? state.isAuthenticated
                  ? `/job/${data.job_id}`
                  : "/login"
                : data?.link
            }
            target={data?.job_id ? "" : "_blank"}
          >
            <button className="card-bottom__apply-btn">
              <p>Apply Now</p>
              <span>
                <img src={arrowForward} alt="arrow" />
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
