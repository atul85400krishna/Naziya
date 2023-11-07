import React, { useContext, useEffect, useState } from "react";
import About from "../components/About";
import JobPreferences from "../components/JobPreferences";
import Skills from "../components/Skills";
import Education from "../components/Education";
import draft from "../assets/icons/draft.png";
import forward from "../assets/icons/forward.png";
import WorkExperience from "../components/WorkExperience";
import NavbarUser from "../components/NavbarUser";
import { useFormik } from "formik";
import { profileSchema } from "../validation/formSchema";
import { API, AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Candidate from "./Candidate";
import AddResume from "../components/AddResume";
import AddCertificates from "../components/AddCertificates";
import { BsCloudCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { saveUser } from "../redux/actions";

const initialValues = {
  email: "",
  name: "",
  role: "",
  picture: "",
  phone_number: "",
  location: "",
  designation: "",
  top_skills: "",
  github_profile: "",
  linkedin_profile: "",
  about: "",
  skills: [],
  tools: [],
  languages: [
    // { name: "", proficiency: "" },
    // { name: "", proficiency: "" },
  ],
  proficiency: "",
  desired_salary: "",
  desired_company_size: "",
  employment_interest: [],
  desired_location: [],
  desired_location_type: [],
  work_experience: [
    // {
    //   company_name: "",
    //   designation: "",
    //   employment_type: "",
    //   description: "",
    //   duration_from: "",
    //   duration_to: "",
    //   location: "",
    //   skills: [],
    // },
  ],
  education: [
    // {
    //   school_name: "",
    //   degree: "",
    //   grade: "",
    //   description: "",
    //   duration_from: "",
    //   duration_to: "",
    //   location: "",
    // },
  ],
};

const Profile = () => {
  const [showItems, setShowItems] = React.useState("resume");
  const { state } = useContext(AuthContext);
  const [initialForm, setInitialForm] = useState(initialValues);
  const [image, setImage] = useState();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.reducer.user);
  console.log("user", user);

  const getFormDetails = async () => {
    try {
      const res = await API("get", "/users/profile/", {}, state.token);
      // console.log(res?.data);
      saveUser({ ...user, ...res?.data });
      setInitialForm(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFormDetails();
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialForm,
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        cv: "",
      };
      // delete payload.cv;
      const formData = new FormData();
      formData.append("json", JSON.stringify(payload));
      if (image) formData.append("profile_picture", image);
      console.log("profile_picture", image);

      try {
        const res = await API(
          "put",
          "/users/profile_update/",
          formData,
          state.token
        );
        toast.success("Profile Updated Successfully");
        getFormDetails();
      } catch (error) {
        console.log(error);
        toast.error("Failed");
      }
    },
  });
  console.log("values", values);

  return (
    <div>
      {editMode ? (
        <>
          <div className="small_devices">
            <header>
              <NavbarUser show_search={false} />
            </header>
            <div className="profile_main profile__container">
              <div className="profile_div1">
                <h2>Profile</h2>
              </div>
              <About
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                image={image}
                setImage={setImage}
                setEditMode={setEditMode}
              />
              <AddResume
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <JobPreferences
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <Skills
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <WorkExperience
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <Education
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <AddCertificates
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                showShadow={true}
                setFieldValue={setFieldValue}
              />
              <div
                style={{
                  marginTop: "0px",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: "auto",
                  marginBottom: ".5rem",
                }}
              >
                <span>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    style={{
                      border: "1px solid #5A52FF",
                      borderRadius: 100,
                      width: 130,
                      fontFamily: "poppins",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#fff",
                      height: 48,
                      margin: 5,
                      backgroundColor: "#5A52FF",
                      paddingRight: 20,
                    }}
                  >
                    Submit
                  </button>
                  <img
                    src={forward}
                    width={16}
                    height={16}
                    alt=""
                    style={{
                      position: "absolute",
                      margin: "22px 25px 0 -30px",
                      transform: "translateX(-10px)",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="large_devices">
            <header>
              <NavbarUser show_search={true} />
            </header>
            <div className="large_profile profile__container">
              <div className="large_about">
                <About
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  image={image}
                  setImage={setImage}
                  setEditMode={setEditMode}
                />
              </div>
              <div
                className="profile main_profile"
                style={{ margin: "10px 0 0 20px", width: "75%" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="large_profile">
                    <div>
                      <ul className="ul">
                        <li
                          id="resume"
                          style={
                            showItems === "resume"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("resume")}
                        >
                          Resume
                        </li>
                        <li
                          id="jobPref"
                          style={
                            showItems === "jobPref"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("jobPref")}
                        >
                          Job Preferences
                        </li>
                        <li
                          id="skills"
                          style={
                            showItems === "skills"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("skills")}
                        >
                          Skills
                        </li>
                        <li
                          id="workExp"
                          style={
                            showItems === "workExp"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("workExp")}
                        >
                          Work Experience
                        </li>
                        <li
                          id="education"
                          style={
                            showItems === "education"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("education")}
                        >
                          Education
                        </li>
                        <li
                          id="certificate"
                          style={
                            showItems === "certificate"
                              ? {
                                  color: "#5A52FF",
                                  borderBottom: "2px solid #5A52FF",
                                }
                              : { color: "#001F3F99", borderBottom: "none" }
                          }
                          onClick={() => setShowItems("certificate")}
                        >
                          Certifications
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    {showItems === "skills" ? (
                      <Skills
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : showItems === "jobPref" ? (
                      <JobPreferences
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : showItems === "education" ? (
                      <Education
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : showItems === "workExp" ? (
                      <WorkExperience
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : showItems === "resume" ? (
                      <AddResume
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : showItems === "certificate" ? (
                      <AddCertificates
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        border: "1px solid rgba(0, 0, 0, .2)",
                        borderRadius: 100,
                        paddingLeft: 15,

                        margin: 5,
                        backgroundColor: "#fff",
                        width: 148,
                        fontFamily: "poppins",
                        fontSize: 16,
                        fontWeight: 500,
                        height: 48,
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                      }}
                    >
                      <BsCloudCheck style={{}} color="#5A52FF" size={20} />
                      <button
                        type="submit"
                        style={{
                          border: 0,
                          color: "#5A52FF",
                          marginLeft: 5,
                          fontSize: 16,
                          fontWeight: 600,
                          backgroundColor: "transparent",
                        }}
                      >
                        Save draft
                      </button>
                    </span>
                    <span>
                      <button
                        type={showItems === "certificate" ? "submit" : "button"}
                        style={{
                          border: "1px solid #5A52FF",
                          borderRadius: 100,
                          width: 120,
                          fontFamily: "poppins",
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#fff",
                          height: 48,
                          margin: 5,
                          backgroundColor: "#5A52FF",
                          paddingRight: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          showItems === "resume"
                            ? setShowItems("jobPref")
                            : showItems === "jobPref"
                            ? setShowItems("skills")
                            : showItems === "skills"
                            ? setShowItems("workExp")
                            : showItems === "workExp"
                            ? setShowItems("education")
                            : showItems === "education"
                            ? setShowItems("certificate")
                            : null;
                        }}
                      >
                        {showItems === "certificate" ? "Submit" : "Next"}
                      </button>
                      <img
                        src={forward}
                        width={16}
                        height={16}
                        alt=""
                        style={{
                          position: "absolute",
                          margin: "22px 25px 0 -30px",
                          transform: "translateX(-10px)",
                        }}
                      />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Candidate data={initialForm} setEditMode={setEditMode} />
        </>
      )}
    </div>
  );
};

export default Profile;
