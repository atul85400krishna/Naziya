import React, { useContext, useEffect, useState } from "react";
import Page from "../components/Page";
import check_btn from "../assets/icons/check_btn.png";
import Button from "../components/Button";
import { useFormik } from "formik";
import { loginSchema } from "../validation/formSchema";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import InputMUI from "../components/InputMUI";
import SocialLogin from "../components/SocialLogin";
import { saveUser } from "../redux/actions/index";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { state, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          setIsLoading(true);
          const res = await login(values);
          console.log("logged user", res?.data);
          if (res?.status === 200) {
            saveUser(res?.data);
            navigate("/jobs", { replace: true });
          } else {
            console.log(res);
            toast.error("Invalid Credentials");
          }
        } catch (error) {
          console.log("error", error);
          toast.error("Invalid Credentials");
        }
        setIsLoading(false);
      },
    });

  useEffect(() => {
    if (state.isAuthenticated) navigate("/");
  }, [state]);

  return (
    <Page>
      <div className="container-main">
        <div className="header">
          <div className="login-head">
            <NavLink to="/">
              <h1>logo</h1>
            </NavLink>
          </div>
          <div className="login-para">
            <h2>Login</h2>
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
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="input-content">
              <div className="inputs">
                <div className="layout">
                  <div className="input">
                    <InputMUI
                      inputField={{
                        label: "Email",
                        name: "email",
                        value: values.email,
                        type: "email",
                        size: "small",
                        error: errors.email,
                      }}
                      classname="input-items"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="layout">
                  <div className="input">
                    <InputMUI
                      inputField={{
                        label: "Password",
                        name: "password",
                        value: values.password,
                        type: "password",
                        size: "small",
                        error: errors.password,
                      }}
                      classname="input-items"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="forgot">
                  <NavLink to="/forgot-password">
                    <p>Forgot Password?</p>
                  </NavLink>
                </div>
                <div
                  className="ckeck_btn_content"
                  style={{ visibility: "hidden" }}
                >
                  <img src={check_btn} width={44} height={24} alt="" />
                  <span>
                    By selecting this, you agree to the{" "}
                    <a href="/policies">
                      <span>Privacy Policy</span>
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="login_btn_container" style={{ marginTop: -40 }}>
              <Button
                btn="login_btn"
                label="Log In"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <p className="link">
            Need to create an account? <NavLink to="/signup">Signup</NavLink>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default Login;
