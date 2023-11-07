import React from "react";
import "./styles/navbar.css";
import { NavLink } from "react-router-dom";
import arrowForward from "../assets/icons/arrow_forward.svg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userType, setUserType }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar__logo" style={{ textDecoration: "none" }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span style={{ marginLeft: "10px", textDecoration: "none" }}>
            LOGO
          </span>
        </NavLink>
      </div>
      <div className="navbar__links">
        <NavLink
          className={`navbar__link${userType ? "--active" : ""}`}
          onClick={() => setUserType(true)}
        >
          Find Jobs
        </NavLink>
        <NavLink
          className={`navbar__link${!userType ? "--active" : ""}`}
          onClick={() => setUserType(false)}
        >
          Hire Jobseekers
        </NavLink>
      </div>
      <div className="navbar__login">
        <NavLink to="/login">
          <button className="navbar__login-btn">
            <h6>Login</h6>
            <span>
              <img src={arrowForward} alt="arrow" />
            </span>
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
