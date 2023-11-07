import React, { useContext, useEffect, useState } from "react";
import search_icon from "../assets/icons/search_icon.png";
import Input from "../components/Input";
import up_down_arrow from "../assets/icons/up_down_arrow.png";
import EmployerRow from "../components/EmployerRow";
import NavbarUser from "../components/NavbarUser";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { API, AuthContext } from "../context/AuthContext";

const EmployerJobs = () => {
  const [jobTitle, setJobTitle] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [jobs, setJobs] = useState([]);
  const { state } = useContext(AuthContext);

  const jobsPerPage = 5;
  const lastIndex = currentPage * jobsPerPage;
  const firstIndex = lastIndex - jobsPerPage;
  const numberOfPages = Math.ceil(jobs.length / jobsPerPage);
  const jobsToBeShown = jobs?.slice(firstIndex, lastIndex);
  const handleChange = (event, value) => setCurrentPage(value);

  const getPostedJobs = async () => {
    const token = state.token;
    console.log(token);
    try {
      const res = await API("get", "users/jobpost/", {}, token);
      console.log("emp jobs", res);
      setJobs(res?.data?.data);
    } catch (error) {
      console.log("error", error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  return (
    <div>
      <NavbarUser />
      <div className="job_candidate">
        <div className="div1">
          <h2>Jobs</h2>
          <div>
            <img src={search_icon} height={17.06} width={17.06} alt="" />
            <Input
              type="text"
              placeholder="Search Job title"
              value={jobTitle}
              handleChange={(event) => setJobTitle(event.target.value)}
              classname="employer_input"
            />
            <NavLink to="/postjob">
              <button type="button">Post a job</button>
            </NavLink>
          </div>
        </div>
        <div className="table employer_table">
          <table>
            <thead>
              <tr>
                <th className="employer_jobs_job">Jobs</th>
                <th className="employer_jobs_status">
                  Status{" "}
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th>
                <th className="employer_jobs_date">
                  Date{" "}
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th>
                {/* <th className="employer_jobs_candidates">
                  Candidates{" "}
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th> */}
                <th className="employer_jobs_icons"></th>
              </tr>
            </thead>
            <tbody>
              {jobsToBeShown.length <= 0 ? (
                <div className="table-empty">No data available</div>
              ) : (
                jobsToBeShown?.map((job, index) => (
                  <EmployerRow
                    candidate={job}
                    key={index}
                    refreshJobs={getPostedJobs}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Stack sx={{ m: 2 }} justifyContent="center" alignItems="center">
          <Pagination count={numberOfPages} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default EmployerJobs;
