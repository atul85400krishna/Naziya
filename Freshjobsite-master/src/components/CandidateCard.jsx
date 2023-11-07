import { useContext } from "react";
import "./styles/jobcard.css";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarkFilled from "../assets/icons/bookmark-filled.svg";
import location from "../assets/icons/location.svg";
import arrowForward from "../assets/icons/arrow_forward.svg";
import payment from "../assets/icons/payment.svg";
import earth from "../assets/icons/earth.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CandidateCard = ({ data }) => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-card__logo">
        <img src={data?.img} alt="" />
      </div>
      <div className="job-card__info">
        <div className="card-info__top">
          <h3>{data?.name}</h3>
          {/* <span className="card-info__new">New</span> */}
          {/* {state.isAuthenticated && (
            <span
              className="card-bookmark"
            >
              <img
                src={bookmarked.length > 0 ? bookmarkFilled : bookmark}
                alt="bookmark"
              />
            </span>
          )} */}
        </div>
        <div className="card-info__middle">
          <div className="card-middle__company-info">
            <span className="company-info__name">
              {data?.designation || "United Health Group"}
            </span>
            {/* <span className="company-info__time">New</span> */}
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
          <ul className="card-bottom__list">
            {data?.skills &&
              eval(data?.skills)?.map((skill) => {
                return <li key={skill}>{skill}</li>;
              })}
          </ul>
          <NavLink
            to={
              state.isAuthenticated
                ? `/candidate/${data.applicant_id}`
                : "/login"
            }
            // target={data?.job_id ? "" : "_blank"}
          >
            <button className="card-bottom__apply-btn">
              <p style={{ padding: "5px", marginBottom: "0" }}>Hire Now</p>
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

export default CandidateCard;
