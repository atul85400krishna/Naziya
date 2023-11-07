import React, { useContext, useEffect, useState } from "react";
import man_image from "../assets/images/man_image.png";
import availability_icon from "../assets/icons/availability_icon.png";
import CandidateSkill from "../components/CandidateSkill";
import { skills } from "../components/dummy";
import CandidateWorkExperience from "../components/CandidateWorkExperience";
import CandidateEducation from "../components/CandidateEducation";
import NavbarUser from "./../components/NavbarUser";
import SelectDropdown from "../components/SelectDropdown";
import { useLocation } from "react-router-dom";
import { API, AuthContext } from "../context/AuthContext";
import mailIcon from "../assets/icons/mail.svg";
import locationIcon from "../assets/icons/location.svg";
import suitcaseIcon from "../assets/icons/suitcase.svg";
import defaultProfile from "../assets/images/default-profile-image.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function calculateYearsOfExperience(experiences) {
  const dateObjects = experiences.map((exp) => ({
    duration_from: new Date(exp.duration_from),
    duration_to: new Date(exp.duration_to),
  }));
  const mostRecentDate = new Date(
    Math.max(...dateObjects.map((exp) => exp.duration_to))
  );
  const mostPastDate = new Date(
    Math.min(...dateObjects.map((exp) => exp.duration_from))
  );
  return Math.round(
    (mostRecentDate - mostPastDate) / (365 * 24 * 60 * 60 * 1000)
  );
}

const arrGraph = [
  {
    name: "Conscientiousness",
    value: 50,
    color: "#64b2d1",
  },
  {
    name: "Openness to Experience",
    value: 20,
    color: "#5292ac",
  },
  {
    name: "Extraversion",
    value: 70,
    color: "#407286",
  },
  {
    name: "Agreeableness",
    value: 30,
    color: "#2e515f",
  },
  {
    name: "Neuroticism",
    value: 80,
    color: "#2e515f",
  },
];

const Candidate = ({ data, setEditMode }) => {
  const { pathname } = useLocation();
  const { state } = useContext(AuthContext);
  const [graph, setGraph] = React.useState([]);
  console.log("graph-state", graph);
  const [candidateData, setCandidateData] = useState();
  let dynamicStyles = null;

  function addAnimation(name, body) {
    if (!dynamicStyles) {
      dynamicStyles = document.createElement("style");
      dynamicStyles.type = "text/css";
      document.head.appendChild(dynamicStyles);
    }

    dynamicStyles.sheet.insertRule(
      `@keyframes ${name} {
    ${body}
  }`,
      dynamicStyles.length
    );
  }

  const getCandidateDetails = async () => {
    const token = state.token;
    console.log(token);
    try {
      const res = await API(
        "get",
        `users/applicant/${pathname.slice(11)}/`,
        {},
        token
      );
      console.log(res);
      setGraph(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getGraph = async () => {
    const token = state.token;
    console.log(token);
    try {
      const res = await API("get", "users/personality_graph/", {}, token);
      console.log("graphwalo", res);
      setGraph(res?.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!data) getCandidateDetails();

    getGraph();
  }, []);

  return (
    <div className="candidate_container">
      <header>
        <NavbarUser />
      </header>
      <div className="candidate_main">
        <div className="candidate">
          <img
            src={
              data?.profile_picture
                ? "http://52.1.41.162" + data?.profile_picture
                : candidateData?.profile_picture
                ? "http://52.1.41.162" + candidateData?.profile_picture
                : defaultProfile
            }
            width={155}
            height={155}
            alt=""
          />
          <div className="div11">
            <span className="head_1">
              <h2 className="heade__">{candidateData?.name || data?.name}</h2>
              {data ? (
                <button type="button" onClick={() => setEditMode(true)}>
                  Edit profile
                </button>
              ) : (
                <></>
                // <SelectDropdown
                //   value={status}
                //   handleChange={(event) => setStatus(event.target.value)}
                //   label="Status"
                //   items={["Awaiting response", "Rejected", "Accepted"]}
                //   width={200}
                //   form_control="form_control"
                // />
              )}
            </span>
            <p className="text1">
              {candidateData?.designation || data?.designation}
              {data?.employment_interest.length > 0 && (
                <span>
                  <img src={availability_icon} width={11} height={11} alt="" />
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 14,
                      height: 15,
                      color: "#001F3F99",
                      opacity: 0.6,
                      fontFamily: "poppins",
                    }}
                    className="text_avail"
                  >
                    Availability :
                  </span>
                  <span
                    style={{
                      color: "#001F3F",
                      fontWeight: 400,
                      fontSize: 14,
                      height: 22,
                      fontFamily: "poppins",
                    }}
                  >
                    {data?.employment_interest &&
                      data?.employment_interest.map((emp, index) => (
                        <span key={index}>
                          {emp}
                          {index === data?.employment_interest.length - 1
                            ? ""
                            : ","}
                        </span>
                      ))}
                  </span>
                </span>
              )}
            </p>

            {data?.about ||
              (candidateData?.about && (
                <p className="para2">{data?.about || candidateData?.about}</p>
              ))}

            <div className="card-middle__job-info">
              {data?.email ||
                (candidateData?.email && (
                  <span className="company-info__location company-info__salary">
                    <img src={mailIcon} alt="salary" />
                    <p>Email : {candidateData?.email}</p>
                  </span>
                ))}
              {data?.work_experience?.length > 0 ||
                (candidateData?.work_experience?.length > 0 && (
                  <span className="company-info__location company-info__work">
                    <img src={suitcaseIcon} alt="work" />
                    <p>
                      Years of experience :{" "}
                      {calculateYearsOfExperience(
                        data?.work_experience || candidateData?.work_experience
                      )}
                    </p>
                  </span>
                ))}
              {data?.location ||
                (candidateData?.location && (
                  <span className="company-info__location">
                    <img src={locationIcon} alt="location" />
                    <p>Location : {candidateData?.location}</p>
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="all__skills">
          <div className="skills">
            <h2 className="heade___">Skills</h2>
            <div>
              {(data?.skills
                ? data?.skills || []
                : candidateData?.skills || []
              ).map((skill, index) => (
                <CandidateSkill
                  key={index}
                  skill={skill}
                  // rating={skill.rating}
                />
              ))}
            </div>
          </div>
          <div className="personality__skills">
            <section className="bar-graph bar-graph-horizontal bar-graph-one">
              {/* <div className="bar-one">
                <div
                  style={{ width: `${graph[0]?.score}%` }}
                  className="bar"
                  data-percentage={`${graph[0]?.name}`}
                ></div>
              </div>
              <div className="bar-two">
                <div
                  className="bar"
                  style={{ width: `${graph[1]?.score}%` }}
                  data-percentage={`${graph[1]?.name}`}
                ></div>
              </div>
              <div className="bar-three">
                <div
                  className="bar"
                  style={{ width: `${graph[2]?.score}%` }}
                  data-percentage={`${graph[2]?.name}`}
                ></div>
              </div>
              <div className="bar-four">
                <div
                  className="bar"
                  style={{ width: `${graph[3]?.score}%` }}
                  data-percentage={`${graph[3]?.name}`}
                ></div>
              </div>
              <div className="bar-four">
                <div
                  className="bar"
                  style={{ width: `${graph[3]?.score}%` }}
                  data-percentage={`${graph[3]?.name}`}
                ></div>
              </div> */}
              {typeof graph === "object" && graph.length > 1
                ? graph?.map((item, index) => {
                    console.log(`bg-custom${index + 1}`);

                    return (
                      <div className="bar-one">
                        {item.score ? (
                          <div
                            style={{
                              backgroundColor: arrGraph[index].color,
                              width: `${item.score}%`,
                              borderRadius: 5,
                              color: "#fff",
                              fontSize: 13,
                              height: 30,
                              textAlign: "right",
                              padding: 5,
                              animation: "show-bar-one 2s ease-in-out",
                            }}
                            className="bar"
                            data-percentage={item?.name}
                          >
                            {/* <p>{item.name}</p> */}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </section>
          </div>
        </div>
        <div className="work_experience">
          <h2 className="heade___">Work Experience</h2>
          {(data?.work_experience || candidateData?.work_experience)?.map(
            (workExp, index) => (
              <CandidateWorkExperience
                key={index}
                company={workExp.company_name}
                duration={
                  new Date(workExp.duration_from).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                  }) +
                  " - " +
                  new Date(workExp.duration_to).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                  })
                }
                duties={workExp?.description}
                location={workExp?.location}
                title={workExp?.designation}
              />
            )
          )}
        </div>

        <div className="education">
          <h2 className="heade___">Education</h2>
          <span className="education_list">
            {(data?.education || candidateData?.education)?.map(
              (education, index) => (
                <CandidateEducation
                  course={education.degree}
                  duration={
                    new Date(education.duration_from).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "long",
                      }
                    ) +
                    " - " +
                    new Date(education.duration_to).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "long",
                      }
                    )
                  }
                  location_={education.location}
                  school={education.school_name}
                  key={index}
                />
              )
            )}
          </span>
        </div>

        <div style={{ marginTop: 10 }} className="education">
          <h2 className="heade___">Resume</h2>
          {data?.cv ? (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="education_list"
            >
              <iframe
                style={{ width: 300, height: 200 }}
                title="Your Resume"
                src={`http://52.1.41.162${data?.cv}`}
              ></iframe>
              <a
                style={{ marginTop: 10 }}
                href={`http://52.1.41.162${data?.cv}`}
              >
                You can see here...
              </a>
            </span>
          ) : null}
        </div>
        <div style={{ marginTop: 10 }} className="education">
          <h2 className="heade___">Certificates</h2>

          <span className="education_list">
            {data?.certificate?.map((certificate, index) => (
              <div key={index}>
                <p>{certificate?.name}</p>
                <p>{certificate?.organization}</p>
                {certificate?.certificate && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <iframe
                      style={{
                        objectFit: "center",
                        width: "100%",
                        height: 200,
                      }}
                      src={`http://52.1.41.162${certificate?.certificate}`}
                    ></iframe>
                    <a
                      style={{ marginTop: 10 }}
                      href={`http://52.1.41.162${certificate?.certificate}`}
                    >
                      You can see here...
                    </a>
                  </div>
                )}
              </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
