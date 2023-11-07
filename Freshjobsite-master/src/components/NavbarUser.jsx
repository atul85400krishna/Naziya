import React, { useEffect, useState } from "react";
import "./styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import search from "../assets/icons/search.svg";
import building from "../assets/icons/building.svg";
import bell from "../assets/icons/bell.svg";
import application from "../assets/icons/application.svg";
import personality from "../assets/icons/personality.svg";
import assessment from "../assets/icons/assessment.svg";
import hamburger from "../assets/icons/hamburger.svg";
import logoutIcon from "../assets/icons/logout.png";
import hamburgerInactive from "../assets/icons/hamburger-inactive.svg";
import profile from "../assets/icons/profile.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import reject_image from "../assets/images/reject_image.png";
import ConfirmatonModal from "../modals/ComfirmationModal";
import sendIcon from "../assets/icons/sendDark.svg";
import settingIcon from "../assets/icons/setting.svg";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import defaultProfile from "../assets/images/default-profile-image.jpg";
import { useSelector } from "react-redux";
import { ReactionsValue, saveUser, savedReactions } from "../redux/actions";

const NavbarUser = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.reducer.user);

  const [menuOpen, setMenuOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const { state, logout } = useContext(AuthContext);
  console.log(state.profile);
  // console.log("http://52.1.41.162/media/" + user?.profile_picture);
  let pic = user?.profile_picture;
  if (user?.profile_picture?.includes("/media/")) {
    pic = user?.profile_picture?.replace("/media/", "");
  }
  useEffect(() => {
    if (state?.isAuthenticated === false)
      return navigate("/", { replace: true });
  }, [state]);

  console.log(state);

  return (
    <nav className="navbar">
      <ConfirmatonModal
        open={open}
        handleClose={() => setOpen(false)}
        image={reject_image}
        text={"Are you sure you want to Logout"}
        btnText={"Logout"}
        handleClick={() => {
          logout();
          setTimeout(() => {
            saveUser(null);
            savedReactions(false);
            ReactionsValue([
              { id: 1, rating: 0 },
              { id: 2, rating: 0 },
              { id: 3, rating: 0 },
              { id: 4, rating: 0 },
              { id: 5, rating: 0 },
            ]);
          }, 1000);
          setOpen(false);
        }}
      />
      <div className="navbar__logo" style={{ textDecoration: "none" }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span style={{ marginLeft: "20px", textDecoration: "none" }}>
            LOGO
          </span>
        </NavLink>
      </div>
      {/* <div className="search__input hero__input navbar__search">
        <img src={search} alt="search" />
        <input type="text" placeholder="Job, companies, skills" />
      </div> */}
      {!menuOpen && (
        <div className="navbar__links navbar-user__links">
          <ul>
            <li>
              <NavLink to="/jobs">
                <img src={building} alt="Jobs" />
                <p style={{ marginBottom: "0" }}>Jobs</p>
              </NavLink>
            </li>
            {state.role === "Candidate" && (
              <>
                <li>
                  <NavLink to="/applications">
                    <img src={application} alt="applications" />
                    <p style={{ marginBottom: "0" }}>Jobs Applied</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/personality-assessment">
                    <img src={personality} alt="Personality test" />
                    <p style={{ marginBottom: "0" }}>Personality Assessment</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/assessments">
                    <img src={assessment} alt="Assessment" />
                    <p style={{ marginBottom: "0" }}>Skills Assessment</p>
                  </NavLink>
                </li>
              </>
            )}
            <li className="navbar-user__notification">
              <NavLink to="/notifications">
                {/* <span>3</span> */}
                <img src={bell} alt="notifications" />
                <p style={{ marginBottom: "0" }}>Notifications</p>
              </NavLink>
            </li>
            <li className="navbar-user__notification">
              <NavLink to="/messages">
                <img src={sendIcon} alt="messages" />
                <p style={{ marginBottom: "0" }}>Messages</p>
              </NavLink>
            </li>
            {/* <li className="navbar-user__notification">
              <NavLink to="/settings">
                <img src={settingIcon} alt="settings" />
                <p>Settings</p>
              </NavLink>
            </li> */}
            <li className="navbar-user__profile">
              <NavLink to={"/profile"}>
                <img
                  src={
                    user?.profile_picture
                      ? "http://52.1.41.162/media/" + pic
                      : state?.profile
                  }
                  className="navbar__profile"
                  alt="profile"
                />
                <p>{state.name}</p>
              </NavLink>
            </li>
            <li className="navbar-user__profile">
              <NavLink onClick={() => setOpen(true)}>
                <p>Logout</p>
                <img src={logoutIcon} alt="logout" />
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <div
        className="navbar__links navbar-user__links navbar-user__links--desktop"
        style={{ alignItems: "center" }}
      >
        <ul style={{ alignItems: "center", gap: "15px" }}>
          <li>
            <NavLink to="/jobs">
              <img src={building} alt="Jobs" />
              <p style={{ margin: "0px", fontSize: "18px" }}>Jobs</p>
            </NavLink>
          </li>
          {state.role === "Candidate" && (
            <>
              <li>
                <NavLink to="/applications">
                  <img src={application} alt="Applications" />
                  <p style={{ marginBottom: "0" }}>Jobs Applied</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/personality-assessment">
                  <img src={personality} alt="personality test" />
                  <p style={{ marginBottom: "0" }}>Personality Assessment</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/assessments">
                  <img src={assessment} alt="assessments" />
                  <p style={{ marginBottom: "0" }}>Skills Assessment</p>
                </NavLink>
              </li>
            </>
          )}
          <li className="navbar-user__notification">
            <NavLink to="/notifications">
              {/* <span>3</span> */}
              <img src={bell} alt="notifications" />
            </NavLink>
          </li>
          <li className="navbar-user__notification ml-1 ">
            <NavLink to="/messages">
              {/* <span>3</span> */}
              <img src={sendIcon} alt="messages" />
            </NavLink>
          </li>
          {/* <li className="navbar-user__notification ml-1 ">
            <NavLink to="/settings">
              <img src={settingIcon} alt="settings" />
            </NavLink>
          </li> */}
          <li className="navbar-user__profile">
            <NavLink to={"/profile"}>
              <img
                src={
                  user?.profile_picture
                    ? "http://52.1.41.162/media/" + pic
                    : state?.profile
                    ? state?.profile
                    : defaultProfile
                }
                alt="profile"
                className="navbar__profile"
              />
              <span>{state.name}</span>
            </NavLink>
          </li>
          {/* <li className="navbar-user__profile">
            <NavLink onClick={() => setOpen(true)}> */}
          <li className="navbar-user__profile1">
            <NavLink
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: "100%",
              }}
              onClick={() => setOpen(true)}
            >
              <p className="logout-text" style={{ margin: "0" }}>
                Logout
              </p>
              {/* <img src={logoutIcon} alt="logout" /> */}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__menu-btn">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuOpen ? hamburger : hamburgerInactive} alt="menu" />
        </button>
      </div>
    </nav>
  );
};

export default NavbarUser;
