import { NavLink } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import "./styles/assessment.css";
import { useContext, useEffect, useState } from "react";
import { API, AuthContext } from "../context/AuthContext";

const AssessmentCard = ({ data }) => {
  return (
    <div className="assessment__card">
      <div className="assessment__top">
        <h3>{data?.skill}</h3>
        <span>{data?.score}</span>
      </div>
      {/* <p className="assessment__info">
        {data?.desc ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem dolores eum, eveniet quidem eaque illum commodi omnis voluptates temporibus ipsa unde ullam iste ea quia, iure optio praes"}
      </p> */}
      <NavLink to={`/assessments/${data?.skill_id}/?skill=${data?.skill}`}>
        <div className="assessment__link">View full test description</div>
      </NavLink>
    </div>
  );
};

const Assessments = () => {
  const { state, updateSkills } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState([]);

  const getAssessments = async () => {
    setIsLoading(true);
    const token = state.token;
    try {
      const res = await API("get", "users/skills/", {}, token);
      console.log(res);
      setAssessmentData(res?.data);
      updateSkills(res?.data);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAssessments();
  }, []);

  console.log(state);

  return (
    <>
      <NavbarUser />
      <main className="assessments__container">
        <div className="assessments__data">
          <h2>Assesments</h2>
        </div>
        <ul>
          <li>
            {isLoading ? (
              <div className="center">
                <div className="lds-ellipsis center bg-white">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <>
                {assessmentData?.length > 0 ? (
                  assessmentData.map((data) => (
                    <NavLink
                      to={`/assessments/${data?.skill_id}/?skill=${data?.skill}`}
                      key={data?.title}
                    >
                      <AssessmentCard data={data} />
                    </NavLink>
                  ))
                ) : (
                  <div>Choose skills from your profile to give assessments</div>
                )}
              </>
            )}
          </li>
        </ul>
      </main>
    </>
  );
};

export default Assessments;
