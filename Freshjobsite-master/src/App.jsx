import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import SearchResult from "./pages/SearchResult";
import TokenExpirationTime from "./context/TokenExpirationTime";
import { API, AuthContext } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Application from "./pages/Application";
import "./pages/styles/application.css";
import JobsCandidate from "./pages/JobsCandidate";
// import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Candidate from "./pages/Candidate";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import JobCandidates from "./pages/JobCandidates";
import EmployerJobs from "./pages/EmployerJobs";
import PostJob from "./pages/PostJob";
import Error from "./pages/Error";
import Assessments from "./pages/Assessments";
import AssessmentDetails from "./pages/AssessmentDetails";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Assessment from "./pages/Assessment";
import JobPage from "./pages/JobPage";
import Notifications from "./pages/Notifications";
import PersonalityAssessment from "./pages/PersonalityAssessment";
import Messages from "./pages/Messages";
import "react-chat-elements/dist/main.css";
import Settings from "./pages/Settings";
import ProfileEmployer from "./pages/ProfileEmployer";
import { savedReactions } from "./redux/actions";

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  const getGraph = async () => {
    const token = state.token;
    console.log(token);
    try {
      const res = await API("get", "users/personality_graph/", {}, token);
      console.log("graph app", res);
      savedReactions(res?.data.is_submitted);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    TokenExpirationTime({ state, dispatch });
    getGraph();
  }, [state]);

  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={3000}
        position="bottom-left"
        closeOnClick
        hideProgressBar
      />
      <Router>
        <Routes>
          <Route exact path="/linkedin" element={<LinkedInCallback />} />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="search-result" element={<SearchResult />} />
          <Route
            exact
            path="jobs"
            element={
              state.role === "Candidate" ? (
                <ProtectedRoute role="Candidate">
                  <JobsCandidate />
                </ProtectedRoute>
              ) : (
                <ProtectedRoute role="Employer">
                  <EmployerJobs />
                </ProtectedRoute>
              )
            }
          />
          <Route exact path="job/:id" element={<JobPage />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="personality-assessment"
            element={
              <ProtectedRoute role="Candidate">
                <PersonalityAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="assessments"
            element={
              <ProtectedRoute role="Candidate">
                <Assessments />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="assessments/:id"
            element={
              <ProtectedRoute role="Candidate">
                <AssessmentDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="assessment/:id"
            element={
              <ProtectedRoute role="Candidate">
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="applications"
            element={
              <ProtectedRoute role="Candidate">
                <Application />
              </ProtectedRoute>
            }
          />
          <Route exact path="settings" element={<Settings />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route
            exact
            path="/profile"
            element={
              state.role === "Candidate" ? (
                <ProtectedRoute role="Candidate">
                  <Profile />
                </ProtectedRoute>
              ) : (
                <ProtectedRoute role="Employer">
                  <ProfileEmployer />
                </ProtectedRoute>
              )
            }
          />
          <Route
            exact
            path="/candidate/:id"
            element={
              <ProtectedRoute role="Employer">
                <Candidate />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jobcandidates/:id"
            element={
              <ProtectedRoute role="Employer">
                <JobCandidates />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/employerjobs"
            element={
              <ProtectedRoute role="Employer">
                <EmployerJobs />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/postjob"
            element={
              <ProtectedRoute role="Employer">
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
