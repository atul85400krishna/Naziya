import React, { useState, useEffect } from "react";
import CardCollection from "../components/CardCollection";
import NavbarUser from "../components/NavbarUser";
import { API, AuthContext } from "../context/AuthContext";
import arrowDropDown from "../assets/icons/arrow_drop_down.svg";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Jobs = () => {
  const [jobType, setJobType] = useState(0);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsBest, setResultsBest] = useState([]);
  const [pageBest, setPageBest] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobsLoading, setSavedJobsLoading] = useState(true);
  const { state, setSavedJobs } = useContext(AuthContext);
  const navigate = useNavigate();

  const getResults = async () => {
    try {
      setIsLoading(true);
      const res = await API("get", `jobs_list/?page=${page}`);
      console.log(res);
      setResults(
        results.length > 0 ? [...results, ...res?.data?.data] : res?.data?.data
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getBestMatches = async () => {
    try {
      setIsLoading(true);
      const res = await API(
        "get",
        `best_matches_job/?page=${pageBest}`,
        {},
        state.token
      );
      console.log(res);
      setResultsBest(
        resultsBest.length > 0
          ? [...resultsBest, ...res?.data?.data]
          : res?.data?.data
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBestMatches();
  }, [pageBest]);

  useEffect(() => {
    getResults();
  }, [page]);

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

  const getSavedJobs = async () => {
    try {
      const res = await API("get", "/users/savedjobs/", {}, state.token);
      console.log(res);
      setSavedJobs(res?.data);
    } catch (error) {
      console.log(error);
    }
    setSavedJobsLoading(false);
  };

  useEffect(() => {
    if (!state?.savedJobs) getSavedJobs();
  }, [jobType]);

  useEffect(() => {
    if (state?.isAuthenticated === false)
      return navigate("/", { replace: true });
  }, [state]);

  return (
    <>
      <NavbarUser />
      <main className="bg-gray jobs-container">
        <h1 className="heading">Jobs</h1>
        <div className="navigation-btns">
          <button
            onClick={() => setJobType(0)}
            style={{ color: jobType === 0 ? "white" : "black" }}
          >
            <p>Best Matches</p>
          </button>
          <button
            onClick={() => setJobType(1)}
            style={{ color: jobType === 1 ? "white" : "black" }}
          >
            <p>Recent Jobs</p>
          </button>
          <button
            onClick={() => setJobType(2)}
            style={{ color: jobType === 2 ? "white" : "black" }}
          >
            <p>Saved Jobs</p>
          </button>
          <span
            className="highlight"
            style={{ left: `${(jobType * 100) / 3}%` }}
          ></span>
        </div>
        {jobType === 1 ? (
          <>
            <CardCollection
              title=""
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
                <button onClick={() => setPage(page + 1)}>
                  <span>Get More</span>
                  <img src={arrowDropDown} alt="" />
                </button>
              </div>
            )}
          </>
        ) : jobType === 0 ? (
          <>
            <CardCollection
              title=""
              cardData={resultsBest}
              saveJob={saveJob}
              unsaveJob={unsaveJob}
            />
            {isLoading ? (
              <>
                {resultsBest.length > 0 && (
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
                <button onClick={() => setPageBest(pageBest + 1)}>
                  <span>Get More</span>
                  <img src={arrowDropDown} alt="" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <CardCollection
              title=""
              cardData={state?.savedJobs}
              saveJob={saveJob}
              unsaveJob={unsaveJob}
            />
            {savedJobsLoading ? (
              <>
                {state?.savedJobs?.length > 0 && (
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
                {/* <button onClick={() => setPage(page + 1)}>
                  <span>Get More</span>
                  <img src={arrowDropDown} alt="" />
                </button> */}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Jobs;
