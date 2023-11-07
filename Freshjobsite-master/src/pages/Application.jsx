import React, { useState } from "react";
import search_icon from "../assets/icons/search_icon.png";
import Input from "../components/Input";
import menu_icon_two from "../assets/icons/menu_icon_two.png";
import JobCard from "../components/JobCardApplication";
import NavbarUser from "../components/NavbarUser";
import { useContext } from "react";
import { API, AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SelectDropdown from "../components/SelectDropdown";

const Application = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const [date, setDate] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [applications, setApplications] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = async () => {
    try {
      const res = await API("get", `/users/appliedjobs/`, {}, state.token);
      console.log(res);
      setApplications(res?.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (state?.isAuthenticated === false)
      return navigate("/", { replace: true });
  }, [state]);

  return (
    <div className="application_container">
      <NavbarUser />
      <div className="application_main">
        <h2>Applied Jobs</h2>
        <div>
          <div className="date_status">
            <span className="application_search">
              <img src={search_icon} alt="" />
              <Input
                type="text"
                name="search"
                classname="input_application"
                placeholder="Job title, company or keywords"
              />
            </span>
            {/* <span>
              <img src={menu_icon_two} className="menu_icon_two" alt="" />
              <SelectDropdown
                value={date}
                handleChange={(event) => setDate(event.target.value)}
                label="Date"
                items={["Date 1", "Date 2", "Date 3"]}
              />
              <SelectDropdown
                value={status}
                handleChange={(event) => setStatus(event.target.value)}
                label="Status"
                items={["Applied", "Rejected"]}
              />
            </span> */}
          </div>
          <div className="job_listings">
            {isLoading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : ( 
              <>
                {applications ? (
                  applications.map((application) => (
                    <JobCard application={application} key={application.id} />
                  ))
                ) : (
                  <div>No applications found</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
