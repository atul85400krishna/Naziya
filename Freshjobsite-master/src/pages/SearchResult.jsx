import { useState, useEffect, useContext } from "react";
import {
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { API, AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import { cities } from "../components/cities";
import NavbarUser from "../components/NavbarUser";
import InputMUI from "../components/InputMUI";
import Button from "../components/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "../components/Spinner";
import Navbar from "./../components/Navbar";
import "./styles/searchresult.css";
import searchIcon from "../assets/icons/search.svg";
import searchWhite from "../assets/icons/search_white.svg";
import filters from "../assets/icons/filters.svg";
import locationIcon from "../assets/icons/location.svg";
import bell from "../assets/icons/bell.svg";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarkFilled from "../assets/icons/bookmark-filled.svg";
import earth from "../assets/icons/earth.svg";
import payment from "../assets/icons/payment.svg";
import close from "../assets/icons/close.svg";
import arrowDropDown from "../assets/icons/arrow_drop_down.svg";
import suitcase from "../assets/icons/suitcase.svg";
import people from "../assets/icons/people.svg";
import checklist from "../assets/icons/checklist.svg";

const SearchBar = ({
  search,
  setSearch,
  location,
  setLocation,
  getResults,
}) => {
  return (
    <div className="hero__search-container hero__search-container--search-result">
      <div className="hero__search">
        <div className="search__input hero__input">
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="Job, companies, skills"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && search ? getResults() : null
            }
          />
        </div>
        <div className="search__location hero__input">
          <img src={locationIcon} alt="location" />
          <label>
            <Autocomplete
              value={location}
              onChange={(data) => setLocation(data.target.innerText)}
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
          <button onClick={getResults} disabled={!search && !location}>
            <img src={searchWhite} alt="" />
          </button>
        </div>
      </div>
      {/* <button className="search__filter"> */}
      {/* <img src={filters} alt="" /> */}
      {/* </button> */}
      {/* <button className="search__filter"> */}
      <img style={{ marginLeft: "20px" }} src={bell} alt="" />
      {/* </button> */}
    </div>
  );
};

const JobCard = ({ setOpen, data }) => {
  return (
    <div
      className="job-card job-card--search-result"
      onClick={() => setOpen(data)}
    >
      <div className="job-card__logo">
        <img src={data?.img} alt="" />
      </div>
      <div className="job-card__info">
        <div className="card-info__top">
          <h3>{data?.title}</h3>
          <span className="card-info__new">New</span>
        </div>
        <div className="card-info__middle">
          {data?.company_name && (
            <div className="card-middle__company-info">
              <span className="company-info__name">{data?.company_name}</span>
            </div>
          )}

          {/* <span className="company-info__time">2 days ago</span> */}
          <div className="card-middle__job-info">
            {data?.location && (
              <span className="company-info__location">
                <img src={locationIcon} alt="location" />
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
            {data?.source && (
              <span className="company-info__location company-info__salary job-info__source">
                <img src={earth} alt="salary" />
                <p>Source: {data?.source}</p>
              </span>
            )}
          </div>
        </div>
        {/* <div className="card-info__bottom">
          <ul className="card-bottom__list">
            <li>HTML</li>
            <li>CSS</li>
            <li>BOOTSTRAP</li>
            <li>+2</li>
          </ul>
          <button className="card-bottom__apply-btn">
            <p>Apply Now</p>
            <span>
              <img src={arrowForward} alt="arrow" />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

const CardInfo = ({ data }) => {
  console.log("save data", data);
  const { state, getSavedJobs } = useContext(AuthContext);
  const [applyLoading, setApplyLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const applied = appliedJobs.map((elem) => elem?.job_post_id);
  console.log("applied111", applied);
  console.log("applied", appliedJobs);

  const navigate = useNavigate();
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

  useEffect(() => {
    if (!state?.savedJobs) getSavedJobs();
  }, []);

  const applyJob = async (id) => {
    console.log(" state.token", state.token);
    setApplyLoading(true);
    try {
      const res = await API(
        "post",
        "/users/applyjob/",
        { job_id: id },
        state.token
      );
      console.log("", res);
      toast.success("Applied Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error");
    }
    setApplyLoading(false);
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
  }, [applyLoading]);

  // useEffect(() => {
  //   console.log("check login");
  //   if (state?.isAuthenticated === false)
  //     return navigate("/", { replace: true });
  // }, [state]);
  console.log("data?.link", data?.link);
  return (
    <div>
      <div className="job-card job-card--card-info">
        <div className="job-card__logo">
          <img src={data?.img} alt="" />
        </div>
        <div className="job-card__info">
          <div className="card-info__top">
            <h3>{data?.title}</h3>
          </div>
          <div className="card-info__middle">
            <div className="card-middle__company-info">
              {data?.company_name && (
                <span className="company-info__name">{data?.company_name}</span>
              )}
              {/* <span className="company-info__time">2 days ago</span> */}
            </div>
            <div className="card-middle__job-info">
              {data?.location && (
                <span className="company-info__location">
                  <img src={locationIcon} alt="location" />
                  <p>{data?.location || "Country, city, state"}</p>
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
              {/* <span className="company-info__location company-info__salary">
                <img src={people} alt="salary" />
                <p>Applicants: 22,456</p>
              </span> */}
            </div>
            {/* <div className="card-middle__job-info">
              <span className="company-info__location company-info__salary">
                <img src={checklist} alt="skills check" />
                <p>Skills match score: 4 / 8</p>
              </span>
            </div> */}
          </div>
          <div className="card-info__bottom">
            {data?.job_id ? (
              <button
                disabled={applied.includes(data.job_id)}
                className="cardinfo__apply"
                onClick={() => {
                  if (!state?.isAuthenticated) navigate("/login");
                  else if (data?.job_id) applyJob(data?.job_id);
                }}
              >
                {applyLoading ? (
                  <Spinner size={20} color="white" />
                ) : applied.includes(data.job_id) ? (
                  "Applied"
                ) : (
                  "Apply"
                )}
              </button>
            ) : (
              <NavLink
                to={
                  !state.isAuthenticated
                    ? "/login"
                    : data?.job_id
                    ? ""
                    : data?.link
                }
                target={!state.isAuthenticated || data?.job_id ? "" : "_blank"}
              >
                <button className="cardinfo__apply">
                  {applyLoading ? <Spinner size={20} color="white" /> : "Apply"}
                </button>
              </NavLink>
            )}
            {state?.isAuthenticated && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDescription = ({ data }) => {
  const sections = data?.job_desc?.split("\n\n");
  // console.log(sections);
  return (
    <div className="job-description">
      <h3>Job Description:</h3>
      {/* <p>
        {data?.job_desc
          ?.split(/\r?\n/)
          ?.filter((item) => item.trim() !== "")
          ?.map((item) => (
            <li key={item}>{item}</li>
          ))}
      </p> */}
      {sections.length <= 1 ? (
        <p>{sections[0]}</p>
      ) : (
        sections.map((section, index) => {
          const lines = section.split("\n");
          const title = lines[0];
          const content = lines.slice(1).join("\n");
          return (
            <div key={index}>
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

const LeftCardCollection = ({ setOpen, isLoading, results, page, setPage }) => {
  const [email, setEmail] = useState("");
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="card-collection__container">
      {results?.length > 0 ? (
        results?.map((card, index) => (
          <JobCard data={card} setOpen={setOpen} key={index} />
        ))
      ) : (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {isLoading ? (
        <>
          {results.length > 0 && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="loadmore-btn bg-white">
            <button
              onClick={() => {
                if (state?.isAuthenticated === false) {
                  return navigate("/login", { replace: true });
                } else {
                  setPage(page + 1);
                }
              }}
            >
              <span>Get More</span>
              <img src={arrowDropDown} alt="" />
            </button>
          </div>
          {state.isAuthenticated ? (
            <div className="job-notification">
              <h3>Get Notified for similar jobs</h3>
              <InputMUI
                inputField={{
                  label: "Email",
                  name: "email",
                  value: email,
                  type: "email",
                  size: "small",
                }}
                classname="input-items"
                handleChange={(e) => setEmail(e.target.value)}
              />
              <div className="login_btn_container" style={{ marginTop: 0 }}>
                <Button btn="login_btn" label="Notify Me" type="submit" />
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

const SetterFilters = ({ options }) => {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Select
      labelId="demo-select-small-label"
      id="demo-select-small"
      value={age}
      label="Age"
      onChange={handleChange}
      sx={{
        borderRadius: "20px",
        fontSize: "12px",
        backgroundColor: "white",
      }}
    >
      <MenuItem sx={{ fontSize: "12px" }} value="">
        None
      </MenuItem>
      {options.map((option) => (
        <MenuItem sx={{ fontSize: "12px" }} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

const FiltersGroup = () => {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const filters = [
    {
      name: "Location type",
      options: ["Onsite", "Remote", "Hybrid"],
    },
    {
      name: "Job type",
      options: ["Full time", "Part time"],
    },
    {
      name: "Education Level",
      options: ["Graduate", "PhD", "Bachelors", "Masters", "Class 12"],
    },
  ];

  return (
    <div
      className="filters__container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "20%",
        width: "57%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <div>
        {filters.map((filter) => {
          return (
            <FormControl
              sx={{ m: 0.5, minWidth: 140, maxWidth: 200 }}
              size="small"
            >
              <InputLabel
                id="demo-select-small-label"
                sx={{ fontSize: "12px", color: "black" }}
              >
                {filter.name}
              </InputLabel>
              <SetterFilters options={filter?.options} />
            </FormControl>
          );
        })}
      </div>
      <button
        style={{
          color: "purple",
          fontSize: "15px",
          border: "none",
          backgroundColor: "white",
        }}
      >
        <u>Reset</u>
      </button>
    </div>
  );
};

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState("");
  const [search, setSearch] = useState(searchParams.get("search"));
  let [location, setLocation] = useState(searchParams.get("location"));
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(AuthContext);

  // console.log("search", searchParams.get("search"));
  if (location == "UK") {
    location = "United Kingdom";
  }
  const location1 = useLocation();
  // console.log("location", location1);
  // console.log("results", results);
  // console.log(
  //   "url",
  //   `?job_name=${search || searchParams.get("search")}&location=${
  //     location || searchParams.get("location")
  //   }`
  // );
  console.log("next page", search);

  const getResults = async () => {
    try {
      setIsLoading(true);
      console.log("get results");
      const res = await API(
        "get",
        `jobs_list/${
          nextPage
            ? nextPage.slice(11)
            : (search || searchParams.get("search")) && location
            ? `?job_name=${search || searchParams.get("search")}&location=${
                location || searchParams.get("location")
              }`
            : searchParams.get("search") || search
            ? `?job_name=${search || searchParams.get("search")}`
            : searchParams.get("location") || location
            ? `?location=${location || searchParams.get("location")}`
            : ""
        }`
      );
      // console.log("search results", res);
      console.log(results.length > 0, "len");
      setResults(
        results.length > 0 ? [...results, ...res?.data?.data] : res?.data?.data
      );
      setIsOpen(res?.data[0]);
      setNextPage(res?.data?.next_page);
      setIsOpen(res?.data?.data[0]);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getSearchResults = async () => {
    const oldResults = results;
    setIsOpen();
    try {
      setResults([]);
      setIsLoading(true);
      const res = await API(
        "get",
        `jobs_list/${
          (search || searchParams.get("search")) && location
            ? `?job_name=${search || searchParams.get("search")}&location=${
                location || searchParams.get("location")
              }`
            : searchParams.get("search") || search
            ? `?job_name=${search || searchParams.get("search")}`
            : searchParams.get("location") || location
            ? `?location=${location || searchParams.get("location")}`
            : ""
        }`
      );
      console.log("settt result", res);
      setResults(res?.data?.data);
      setIsOpen(res?.data?.data[0]);
      setNextPage(res?.data?.next_page);
    } catch (err) {
      console.log(err);
      setResults(oldResults);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getResults();
  }, [page]);

  useEffect(() => {
    search && location
      ? setSearchParams({ search: search, location: location })
      : search
      ? setSearchParams({ search: search })
      : location
      ? setSearchParams({ location: location })
      : setSearchParams({});
  }, [search, location]);

  return (
    <>
      {state.isAuthenticated ? <NavbarUser /> : <Navbar />}

      <div className="search-result">
        <SearchBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          getResults={getSearchResults}
        />
        {state.isAuthenticated ? <FiltersGroup /> : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "30px",
            width: "57%",
            margin: "auto",
            backgroundColor: "#f0ecf7",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Helvetica Neue - 500",
              }}
            >
              Great job! 50% of your skills match with the requirements.
              Consider
              <br />
              adding more skills to improve your match potential.
            </p>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <p
                style={{
                  color: "#bb9bf3",
                  fontSize: "12px",
                  fontFamily: "Helvetica Neue - 500",
                }}
              >
                Skills Strength:
              </p>
              <div
                style={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "white",
                  marginTop: "6px",
                }}
              ></div>
              <p
                style={{ fontSize: "12px", fontFamily: "Helvetica Neue - 500" }}
              >
                50%
              </p>
            </div>
          </div>
          <button
            style={{
              fontWeight: "bold",
              color: "purple",
              fontSize: "13px",
              border: "none",
            }}
          >
            <u>Add Skills</u>
          </button>
        </div>

        <main className="search-result__container">
          <LeftCardCollection
            setOpen={(data) => setIsOpen(data)}
            isLoading={isLoading}
            results={results}
            page={page}
            setPage={setPage}
          />
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
                  <CardInfo data={isOpen} />
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

export default SearchResult;
