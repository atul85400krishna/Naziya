import React, { useContext, useEffect, useState } from "react";
import Page from "../components/Page";
import Button from "../components/Button";
import career_icon from "../assets/icons/career_icon.png";
import Input from "../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../validation/formSchema";
import { toast } from "react-toastify";
import InputMUI from "../components/InputMUI";
import { API, AuthContext } from "./../context/AuthContext";
import SocialLogin from "./../components/SocialLogin";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const Signup = () => {
  const [job_seeker, setJob_seeker] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const ref = React.useRef();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  React.useEffect(() => {
    if (checked) {
      ref.current.style.transform = "translateX(12px)";
      ref.current.style.transition = ".2s";
    } else {
      ref.current.style.transform = "translateX(0)";
      ref.current.style.transition = ".2s";
    }
  }, [checked]);

  useEffect(() => {
    if (state.isAuthenticated) navigate("/");
  }, [state]);

  const handleChangeSignup = (setChange) =>
    setChange((prevState) => !prevState);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        console.log(values);
        if (!checked) {
          toast.error("Please agree to the privacy policy");
          return;
        }
        try {
          setIsLoading(true);
          const res = await API(
            "post",
            !job_seeker ? "/users/employer/" : "/users/register/",
            !job_seeker
              ? {
                  email: values.email,
                  password: values.password,
                  password2: values.confirmPassword,
                  account_type: job_seeker ? "applicant" : "recruiter",
                  name: values.name,
                  company_name: values.name,
                }
              : {
                  email: values.email,
                  password: values.password,
                  password2: values.confirmPassword,
                  account_type: job_seeker ? "applicant" : "recruiter",
                  name: values.name,
                }
          );
          console.log(res);

          toast.success("Account created successfully");
          navigate("/login");
        } catch (error) {
          console.log("error", error?.response?.data?.email[0]);
          console.log("error", error?.message);
          toast.error(error?.response?.data?.email[0] || error.message);
        }
        setIsLoading(false);
      },
    });

  return (
    <Page>
      <div className="container-main">
        <div className="header">
          <div className="login-head signup_logo">
            <NavLink to="/">
              <h1>logo</h1>
            </NavLink>
          </div>
          {!job_seeker ? (
            <div className="signup-div">
              <Button
                label="Job Seeker"
                btn="job_seeker_btn"
                handleClick={() => handleChangeSignup(setJob_seeker)}
              />
              <Button label="Employer" btn="employer_btn" />
            </div>
          ) : (
            <div className="signup-div">
              <Button label="Job Seeker" btn="employer_btn" />
              <Button
                label="Employer"
                btn="job_seeker_btn"
                handleClick={() => handleChangeSignup(setJob_seeker)}
              />
            </div>
          )}
          <div className="login-para">
            <h2>Signup</h2>
          </div>
        </div>
        <div className="login-main">
          <div className="social-links">
            <SocialLogin />
          </div>
          <div className="or">
            <span className="line"></span>
            <span className="or-text">or</span>
            <span className="line"></span>
          </div>

          <form className="form-content signup-form" onSubmit={handleSubmit}>
            <div className="input-content">
              <div className="inputs">
                <label
                  htmlFor="resume"
                  className="resume_label"
                  style={job_seeker ? { display: "flex" } : { display: "none" }}
                >
                  <img src={career_icon} width={20} height={14} alt="" />
                  <p style={{ marginTop: 5, marginBottom: 5, fontSize: 13 }}>
                    Select or drop{" "}
                    <span style={{ fontWeight: 400, color: "#001F3F" }}>
                      here
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 400,
                      fontSize: 10,
                      color: "#001F3F66",
                      opacity: 0.6,
                    }}
                  >
                    {file?.name ||
                      "JPG, PNG or PDF, file size no more than 10MB"}
                  </p>

                  <input
                    type="file"
                    id="resume"
                    onChange={(event) => setFile(event.currentTarget.files[0])}
                  />
                </label>

                <div className="layout signup-input">
                  <div className="input">
                    <InputMUI
                      classname="input-items"
                      handleChange={handleChange}
                      inputField={{
                        label: job_seeker ? "Email" : "Company Email",
                        name: "email",
                        value: values.email,
                        size: "small",
                        type: "email",
                        error: errors.email,
                        marginBottom: errors.email ? 0 : 2,
                      }}
                    />
                  </div>
                </div>

                {job_seeker && (
                  <div className="layout signup-input">
                    <div className="input">
                      <InputMUI
                        classname="input-items"
                        handleChange={handleChange}
                        inputField={{
                          label: "Your name",
                          name: "name",
                          value: values.name,
                          type: "text",
                          size: "small",
                          error: errors.name,
                        }}
                      />
                    </div>
                  </div>
                )}

                {!job_seeker && (
                  <div className="layout signup-input">
                    <div className="input">
                      <InputMUI
                        classname="input-items"
                        handleChange={handleChange}
                        inputField={{
                          label: "Company name",
                          name: "name",
                          value: values.name,
                          type: "text",
                          size: "small",
                          error: errors.name,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="layout signup-input">
                  <div className="input">
                    <InputMUI
                      classname="input-items"
                      handleChange={handleChange}
                      inputField={{
                        type: "password",
                        label: "Password",
                        value: values.password,
                        name: "password",
                        size: "small",
                        error: errors.password,
                        marginBottom: errors.password ? 0 : 2,
                      }}
                    />
                  </div>
                </div>

                <div className="layout signup-input">
                  <div className="input">
                    <InputMUI
                      classname="input-items"
                      handleChange={handleChange}
                      inputField={{
                        type: "password",
                        label: "Confirm Password",
                        value: values.confirmPassword,
                        name: "confirmPassword",
                        size: "small",
                        error: errors.confirmPassword,
                        marginBottom: errors.confirmPassword ? 0 : 2,
                      }}
                    />
                  </div>
                </div>

                <div className="ckeck_btn_content" style={{ display: "flex" }}>
                  <label htmlFor="checked">
                    <Input
                      type="checkbox"
                      checked={checked}
                      id="checked"
                      classname="checked"
                      handleChange={() => handleChangeSignup(setChecked)}
                    />
                    <div className="check_btn"></div>
                    <div className="toggle" ref={ref}></div>
                  </label>
                  <span>
                    By selecting this, you agree to the{" "}
                    <a href="/policies">
                      <span>Privacy Policy</span>
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="login_btn_container">
              <Button
                btn="login_btn"
                label="Sign Up"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <p className="link">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default Signup;
