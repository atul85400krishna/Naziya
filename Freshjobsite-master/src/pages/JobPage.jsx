import { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import locationIcon from "../assets/icons/location.svg";
import checklist from "../assets/icons/checklist.svg";
import bell from "../assets/icons/bell.svg";
import people from "../assets/icons/people.svg";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarkFilled from "../assets/icons/bookmark-filled.svg";
import suitcase from "../assets/icons/suitcase.svg";
import payment from "../assets/icons/payment.svg";
import close from "../assets/icons/close.svg";
import "./styles/searchresult.css";
import { API, AuthContext } from "./../context/AuthContext";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import NavbarUser from "../components/NavbarUser";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const CardInfo = ({ data, isLoading, applyJob }) => {
  console.log("job-id", data);
  const [appliedJobs, setAppliedJobs] = useState([]);
  console.log("applied", appliedJobs);
  const { state, getSavedJobs } = useContext(AuthContext);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const bookmarked = state?.savedJobs
    ? state?.savedJobs.filter((elem) =>
        elem?.link
          ? elem?.link === data?.link
          : elem?.title === data?.title &&
            elem?.company_name === data?.company_name &&
            elem?.job_desc === data?.job_desc
      )
    : [];

  const saveJob = async (job) => {
    console.log(job);
    try {
      const res = await API("post", "/users/savedjobs/", job, state.token);
      console.log(res);
      toast.success("Saved Successfully");
      getSavedJobs();
    } catch (error) {
      console.log(error);
    }
  };
  const getAppliedJobs = async () => {
    try {
      const res = await API("get", "/users/appliedjobs/", null, state.token);
      console.log("applied jobs", res.data);
      setAppliedJobs(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, [counter]);
  const unsaveJob = async (job) => {
    console.log(job);
    try {
      const res = await API(
        "delete",
        "/users/deletesavedjob/",
        { job_id: job?.id },
        state.token
      );
      console.log(res);
      toast.success("Removed Successfully");
      getSavedJobs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="job-card job-card--card-info jobs-job">
        <div className="job-card__logo">
          <img src={data?.img} alt="" />
        </div>
        <div className="job-card__info">
          <div className="card-info__top">
            <h3>
              {data?.title ||
                "Senior UI/UX Designer, Trilogy (Remote) - $ 100,000/year USD"}
            </h3>
            {/* <span className="card-info__new">New</span>
            <span className="card-bookmark">
              <img src={bookmark} alt="bookmark" />
            </span> */}
          </div>
          <div className="card-info__middle">
            <div className="card-middle__company-info">
              <span className="company-info__name">
                {data?.company_name || "United Health Group"}
              </span>
              <span className="company-info__time">Recent</span>
            </div>
            <div className="card-middle__job-info">
              <span className="company-info__location">
                <img src={locationIcon} alt="location" />
                <p>{data?.location || "Country, city, state"}</p>
              </span>
              <span className="company-info__location company-info__work">
                <img src={suitcase} alt="work" />
                <p>Work : Fulltime, Remote</p>
              </span>
              <span className="company-info__location company-info__salary">
                <img src={payment} alt="salary" />
                <p>{data?.salary || "$240k-300k per year"}</p>
              </span>
              <span className="company-info__location company-info__salary">
                <img src={people} alt="salary" />
                <p>Applicants: 22,456</p>
              </span>
            </div>
            <div className="card-middle__job-info">
              <span className="company-info__location company-info__salary">
                <img src={checklist} alt="skills check" />
                <p>Skills match score: 4 / 8</p>
              </span>
            </div>
          </div>
          <div className="card-info__bottom">
            <button
              disabled={
                isLoading ||
                appliedJobs.map((item) => item.title).includes(data.title)
              }
              className={`cardinfo__apply ${
                isLoading ? "cardinfo__apply--jobs" : ""
              }`}
              onClick={() => {
                applyJob(data?.job_post_id);
                setCounter(counter + 1);
              }}
            >
              {isLoading ? (
                <Spinner size={20} color="white" />
              ) : appliedJobs.map((item) => item.title).includes(data.title) ? (
                "Applied"
              ) : (
                "Apply"
              )}
            </button>
            <button
              className="cardinfo__circle-btn"
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
            </button>
            {/* <button className="cardinfo__circle-btn">
              <img src={bell} alt="job alert" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDescription = ({ data }) => {
  return (
    <div className="job-description">
      <h3>Job Description:</h3>
      <p>{data?.job_desc}</p>
    </div>
  );
};

const JobPage = () => {
  const data = {
    job_id: 1,
    title: "Delivery Representative",
    link: "",
    company_link: "",
    company_name: "Job Portal",
    location: "PLATTEVILLE, CO, 80651",
    img: "",
    salary: "ESTIMATED: $43,524 per year  TOP MATCH NEW",
    job_desc:
      "Job Title:A Compensation: At least $22.00/hour, plus overtime and benefits Amazon DSPs (Delivery Service Partners) are looking ...",
    source: "Local",
  };
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log("pathname", pathname.slice(5));
  const navigate = useNavigate();

  const getResults = async () => {
    try {
      setIsLoading(true);
      const res = await API(
        "post",
        `/users/jobfetchbyid/`,
        { job_post_id: pathname.slice(5) },
        state.token
      );
      console.log(res);
      setIsOpen(res?.data);
    } catch (err) {
      console.log(err);
      navigate("error");
    }
    setIsLoading(false);
  };

  const applyJob = async (id) => {
    setApplyLoading(true);
    try {
      const res = await API(
        "post",
        "/users/applyjob/",
        { job_id: id },
        state.token
      );
      console.log(res);
      toast.success("Applied Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error");
    }
    setApplyLoading(false);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      {state.isAuthenticated ? <NavbarUser /> : <Navbar />}

      <div className="search-result">
        <main className="search-result__container">
          {(isOpen || window.innerWidth > 800) && (
            <div className="card-job-info">
              <button
                className="job-info__close"
                onClick={() => setIsOpen(false)}
              >
                <img src={close} alt="close" />
              </button>
              {isOpen ? (
                <>
                  <CardInfo
                    data={isOpen}
                    isLoading={applyLoading}
                    applyJob={applyJob}
                  />
                  <CardDescription data={isOpen} />
                </>
              ) : (
                <>
                  <div className="card-info__loading card-info__loading--1">
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div className="card-info__loading card-info__loading--2">
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default JobPage;
