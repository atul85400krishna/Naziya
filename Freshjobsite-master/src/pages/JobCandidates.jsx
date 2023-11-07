import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import home from "../assets/icons/home.png";
import arrow from "../assets/icons/arrow.png";
import up_down_arrow from "../assets/icons/up_down_arrow.png";
// import { candidates } from "../components/dummy";
import Row from "../components/Row";
import SelectDropdown from "../components/SelectDropdown";
import NavbarUser from "../components/NavbarUser";
import { Pagination, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { API, AuthContext } from "../context/AuthContext";

const JobCandidates = () => {
  const [job, setJob] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [candidates, setCandidates] = useState([]);
  console.log(candidates, "candidates");

  const candidatesPerPage = 4;
  const lastIndex = currentPage * candidatesPerPage;
  const firstIndex = lastIndex - candidatesPerPage;
  const numberOfPages = Math.ceil(candidates.length / candidatesPerPage);
  const candidatesToShow = candidates.slice(firstIndex, lastIndex);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const { pathname } = useLocation();
  const { state } = useContext(AuthContext);
  console.log("object", pathname.slice(15));

  const getJobCandidates = async () => {
    const token = state.token;
    console.log(token);
    try {
      const res = await API(
        "get",
        `users/applicants/${pathname.slice(15)}/`,
        {},
        token
      );
      console.log(res);
      setCandidates(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getJobCandidates();
  }, []);

  return (
    <div>
      <NavbarUser />
      <div className="job_candidate">
        <p className="jc_head">
          <img
            src={home}
            width={16.67}
            height={14.17}
            alt=""
            color="#001F3F66"
          />
          <img
            src={arrow}
            width={10}
            height={16}
            alt=""
            color="#001F3F66"
            className="img"
          />
          <span>Candidates</span>
        </p>
        <SelectDropdown
          value={job}
          handleChange={(event) => setJob(event.target.value)}
          label="Jobs"
          items={["Senior UXUI designer", "Web developer", "Analyst"]}
          form_control="form_control_job"
        />
        <div className="table">
          <table>
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", minWidth: 80, paddingLeft: 20 }}
                ></th>
                <th style={{ minWidth: 150, textAlign: "left" }}>Name</th>
                {/* <th style={{ textAlign: "left", minWidth: 200 }}>
                  Recent Expertise
                </th> */}
                <th style={{ minWidth: 126 }}>
                  Skills match
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th>
                <th style={{ textAlign: "center", minWidth: 146 }}>
                  Date{" "}
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th>
                <th style={{ textAlign: "center", width: 186 }}>
                  Status{" "}
                  <img src={up_down_arrow} width={7.75} height={15} alt="" />
                </th>
                <th style={{ minWidth: 76, textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {candidatesToShow.length <= 0 ? (
                <div className="table-empty">No data available</div>
              ) : (
                candidatesToShow?.map((candidate, index) => (
                  <Row candidate={candidate} key={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Stack sx={{ m: 4 }} justifyContent="center" alignItems="center">
          <Pagination count={numberOfPages} onChange={handlePageChange} />
        </Stack>
      </div>
    </div>
  );
};

export default JobCandidates;
