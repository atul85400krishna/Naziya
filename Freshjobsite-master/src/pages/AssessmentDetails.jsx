import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import { useContext, useEffect, useState } from "react";
import { API, AuthContext } from "../context/AuthContext";

const AssessmentDetails = () => {
  const { pathname } = useLocation();
  const { state, updateSkills } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [skill, setSkill] = useState();
  const test = pathname.slice(13, -1);
  console.log(test, skill);

  const getAssessments = async () => {
    const token = state.token;
    try {
      const res = await API("get", "users/skills/", {}, token);
      console.log(res);
      updateSkills(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  if (state?.skills === undefined) {
    getAssessments();
  }

  useEffect(() => {
    setSkill(state?.skills?.find((obj) => obj.skill_id == test));
  }, [state?.skills]);

  return (
    <>
      <NavbarUser />
      <main className="assessment__container">
        <section className="assesment__details">
          <div className="assessment__info assesment__detail">
            <h3>Assessment Test</h3>
            <ul>
              <li>
                This is a skill test assessment to understand how good you are
                in your skill.
              </li>
              <li>
                The result derived from this assessment will help us match you
                with the right jobs.
              </li>
              <li>
                It requires prior preparation, and results in failure is going to
                hinder you from moving to the next stage.
              </li>
            </ul>
          </div>
          <div className="assessment__scheme assesment__detail">
            <h3>Test Score</h3>
            <ul>
              <li>
                <span className="bold">TO PASS:</span> 35%
              </li>
              <li>
                <span className="bold">YOUR SCORE:</span> {Number(skill?.score)*100}%
              </li>
              <li>
                <span className="bold">YOUR PROGRESS:</span> {Number(skill?.score)*100}%
              </li>
            </ul>
            <div className="assessment__progress">TEST COMPLETED: 0/10</div>
          </div>
        </section>
        <section className="assessment__instructions">
          <h3>{searchParams.get("skill") || skill?.skill}</h3>
          <p>
            Do not press back button or refresh the page, or else your test will be automatically submitted
          </p>
          <ul>
            <li>
              <span className="bold">TIME:</span> 10 MIN
            </li>
            {/* <li>
              <span className="bold">QUESTIONS:</span> 10 / 10
            </li> */}
            <li>
              <span className="bold">STATUS:</span> {skill?.score ? "COMPLETED" : "NOT COMPLETED"}
            </li>
          </ul>
          <div className="assessment__start">
            <NavLink to={`/assessment/${test}`}>
              <button>Start Test</button>
            </NavLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default AssessmentDetails;
