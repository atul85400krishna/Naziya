import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import filters from "../assets/icons/filters.svg";
import locationIcon from "../assets/icons/location.svg";
import searchIcon from "../assets/icons/search.svg";
import searchWhite from "../assets/icons/search_white.svg";
import arrowDropDown from "../assets/icons/arrow_drop_down.svg";
import "./styles/landing.css";
import "./styles/dropdown.css";
import CardCollection from "../components/CardCollection";
import poster from "../assets/images/poster.svg";
import posterArrow from "../assets/images/poster-arrow.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { API, AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import NavbarUser from "../components/NavbarUser";
import JobAlertModal from "../modals/JobAlertModal";
import ScheduleInterviewModal from "../modals/ScheduleInterviewModal";
import AcceptComfirmationModal from "../modals/AcceptComfirmationModal";
import RejectComfirmation from "../modals/RejectComfirmation";
import { Autocomplete } from "@mui/material";
import { cities } from "../components/cities";
import { toast } from "react-toastify";
import FiltersModal from "../modals/FiltersModal";
import CandidateCard from "../components/CandidateCard";

const Hero = ({
  heroTitle1,
  heroTitle2,
  heroSubtitle,
  showSearch,
  search,
  setSearch,
  location,
  setLocation,
  selected,
  setSelected,
  setOpen,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { state } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero">
        <h1>{heroTitle1}</h1>
        <h1>{heroTitle2}</h1>
        <p>Explore jobs or post opportunities to find your ideal candidate.</p>
        {showSearch && (
          <div className="hero__search-container">
            <div className="hero__search">
              <div className="search__dropdown">
                <div className="dropdown">
                  <div
                    onClick={(e) => {
                      setIsActive(!isActive);
                    }}
                    className="dropdown-btn"
                  >
                    <h3>{selected}</h3>
                    <span>
                      <img src={arrowDropDown} alt="" />
                    </span>
                  </div>
                  <div
                    className="dropdown-content"
                    style={{ display: isActive ? "block" : "none" }}
                  >
                    {selected === "Remote" ? (
                      <>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          All
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Onsite
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Hybrid
                        </div>
                      </>
                    ) : selected === "Hybrid" ? (
                      <>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          All
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Onsite
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Remote
                        </div>
                      </>
                    ) : selected === "Onsite" ? (
                      <>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          All
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Remote
                        </div>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Hybrid
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Remote
                        </div>

                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Hybrid
                        </div>

                        <div
                          onClick={(e) => {
                            setSelected(e.target.textContent);
                            setIsActive(!isActive);
                          }}
                          className="item"
                        >
                          Onsite
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="search__input hero__input">
                <img src={searchIcon} alt="search" />
                <input
                  type="text"
                  placeholder="Job, companies, skills"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && search
                      ? !state.isAuthenticated
                        ? navigate("/login")
                        : navigate(
                            !state.isAuthenticated
                              ? "/login"
                              : search && location
                              ? `/search-result?search=${search}&location=${location}`
                              : search && !location
                              ? `/search-result?search=${search}`
                              : `/search-result?location=${location}`
                          )
                      : null
                  }
                />
              </div>
              <div className="search__location hero__input">
                <img src={locationIcon} alt="location" />
                <label>
                  <Autocomplete
                    value={location}
                    onChange={(event, newValue) => {
                      console.log("newValue", newValue);
                      setLocation(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    sx={{
                      display: "inline-block",
                      "& input": {
                        width: 200,
                        bgcolor: "background.paper",
                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.background.paper
                          ),
                        height: "2.6rem",
                      },
                    }}
                    id="custom-input-demo"
                    options={cities}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          {...params.inputProps}
                          placeholder="Country, city"
                        />
                      </div>
                    )}
                  />
                </label>
              </div>
              <div className="search__btn">
                <button
                  onClick={() =>
                    navigate(
                      search && location
                        ? `/search-result?search=${search}&location=${location}`
                        : search && !location
                        ? `/search-result?search=${search}`
                        : `/search-result?location=${location}`
                    )
                  }
                  disabled={!search && !location}
                >
                  <img src={searchWhite} alt="" />
                </button>
              </div>
            </div>
            <button className="search__filter" onClick={() => setOpen(true)}>
              <img src={filters} alt="" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

const SearchSuggest = ({
  setSearch,
  setSelected,
  setLocation,
  popularSearches,
}) => {
  const data = [
    {
      name: "Location Type",
      search_topics: ["Onsite", "Remote", "Hybrid"],
    },
    {
      name: "Locations",
      search_topics: ["Canada", "Ireland", "UK", "USA"],
    },
  ];

  return (
    <>
      <section className="search-suggest search-suggest--mobile">
        <div className="search-suggest__type">
          <button>Popular Searches</button>
        </div>
        <div className="search-suggest__data">
          <ul>
            {popularSearches.length > 0 &&
              popularSearches?.map((topic) => (
                <li
                  key={topic.jobo_name}
                  onClick={(e) => setSearch(e.target.textContent)}
                >
                  {topic.job_name}
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="search-suggest search-suggest--desktop">
        <div className="search-suggest__data search-suggest__data--desktop">
          <div key={data.name} className="search-suggest__data-container">
            <h3>Popular Searches</h3>
            <ul>
              {popularSearches.map((topic) => (
                <li
                  key={topic.job_name}
                  onClick={(e) => setSearch(e.target.textContent)}
                >
                  {topic.job_name}
                </li>
              ))}
            </ul>
          </div>
          {data.map((data, index) => (
            <div key={data.name} className="search-suggest__data-container">
              <h3>{data.name}</h3>
              <ul>
                {data.search_topics.map((topic) => (
                  <li
                    key={topic}
                    onClick={
                      index === 0
                        ? (e) => {
                            console.log("elephant", e.target.textContent);
                            setSelected(e.target.textContent);
                          }
                        : index === 1
                        ? (e) => {
                            console.log("elephant", e.target.textContent);
                            setLocation(e.target.textContent);
                          }
                        : index === 2
                        ? (e) => {
                            console.log("elephant", e.target.textContent);
                            setLocation(e.target.textContent);
                          }
                        : null
                    }
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const Poster = () => {
  return (
    <div className="poster-container">
      <div className="poster__title">
        <h1>Unlocking Opportunities for Success</h1>
        <img src={posterArrow} alt="" />
      </div>
      <div className="poster__tabs">
        <div className="tab">
          <p>Active Candidates Today</p>
          <h2>18k+</h2>
        </div>
        <div className="tab">
          <p>Covered Countries</p>
          <h2>240+</h2>
        </div>
        <div className="tab">
          <p>Employment Accuracy</p>
          <h2>98%</h2>
        </div>
        <div className="tab">
          <p>Active Employers Today</p>
          <h2>12k+</h2>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const [results, setResults] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [totalJobs, setTotalJobs] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [jobSeekersLoading, setJobSeekersLoading] = useState(true);
  const { state, getSavedJobs, getAllChats } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = React.useState(false);
  const [userType, setUserType] = useState(true);
  const navigate = useNavigate();
  const [popularSearches, setPopularSearches] = useState([
    { job_name: "Software Development" },
    { job_name: "App Development" },
    { job_name: "Graphic designing" },
  ]);

  const getResults = async () => {
    try {
      setIsLoading(true);
      const res = await API("get", `jobs_list/?page=${page}`);

      setResults(
        results.length > 0 ? [...results, ...res?.data?.data] : res?.data?.data
      );
      setTotalJobs(res?.data?.job_count);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

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

  const getPopularSearches = async () => {
    try {
      const res = await API("get", `popular_search/`, {}, state.token);
      console.log(res);
      setPopularSearches(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!state?.savedJobs) getSavedJobs();
    if (!state?.allChats) getAllChats();
    getResults();
  }, [page]);

  useEffect(() => {
    getPopularSearches();
  }, []);

  const getJobSeekers = async () => {
    setJobSeekersLoading(true);
    try {
      // const res = await API("post", "users/applicant_data/", {}, state.token);
      fetch("http://52.1.41.162/users/applicant_data/", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          setJobSeekers(data);
        });
      // setJobSeekers(res?.data);
    } catch (error) {
      console.log(error);
    }
    setJobSeekersLoading(false);
  };

  useEffect(() => {
    getJobSeekers();
  }, []);

  return (
    <>
      {state.isAuthenticated ? (
        <NavbarUser />
      ) : (
        <Navbar userType={userType} setUserType={setUserType} />
      )}
      {userType && state.role !== "Employer" ? (
        <main className="landing-container">
          <Hero
            heroTitle1="Empower your career"
            heroTitle2="journey today"
            heroSubtitle="Explore jobs or post opportunities to find your ideal candidate."
            showSearch={true}
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            selected={selected}
            setSelected={setSelected}
            setOpen={setOpen}
          />
          <SearchSuggest
            setSearch={setSearch}
            setSelected={setSelected}
            setLocation={setLocation}
            popularSearches={popularSearches}
          />
          <Poster />
          <CardCollection
            title={`${totalJobs
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Jobs`}
            cardData={results}
            saveJob={saveJob}
            unsaveJob={unsaveJob}
          />
          {isLoading ? (
            <>
              {results.length > 0 && (
                <div className="center">
                  <div className="lds-ellipsis center">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="loadmore-btn">
              <button
                onClick={() =>
                  state.isAuthenticated ? setPage(page + 1) : navigate("/login")
                }
              >
                <span>
                  {state.isAuthenticated ? "Get More" : "Login to view more"}
                </span>
                <img
                  src={state.isAuthenticated ? arrowDropDown : null}
                  alt=""
                />
              </button>
            </div>
          )}
        </main>
      ) : (
        <main className="landing-container">
          <Hero
            heroTitle1="Employ the best brains"
            heroTitle2="in the world here."
            heroSubtitle="Explore jobs or post opportunities to find your ideal candidate."
            showSearch={false}
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            selected={selected}
            setSelected={setSelected}
            setOpen={setOpen}
          />
          <h2 className="candidates__head">Job Seekers</h2>
          <div className="min-hei">
            {jobSeekersLoading ? (
              <div className="center">
                <div className="lds-ellipsis center">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="candidates__container">
                {jobSeekers.map((jobSeeker, index) => {
                  return <CandidateCard data={jobSeeker} key={index} />;
                })}
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
      <FiltersModal
        open={open}
        handleClose={() => setOpen(false)}
        selected={selected}
        setSelected={setSelected}
        location={location}
        setLocation={setLocation}
      />
      {/* <JobAlertModal
        handleClose={handleModal.handleClose}
        handleOpen={handleModal.handleOpen}
        open={open}
      /> */}
      {/* <ScheduleInterviewModal open={open} /> */}
      {/* <AcceptComfirmationModal
        handleClose={handleModal.handleClose}
        open={open}
      /> */}
      {/* <RejectComfirmation handleClose={handleModal.handleClose} open={open} /> */}
    </>
  );
};

export default Landing;
