import React, { useContext, useState } from "react";
import Page from "../components/Page";
import check_btn from "../assets/icons/check_btn.png";
import Button from "../components/Button";
import { useFormik } from "formik";
import { forgotPasswordSchema, loginSchema } from "../validation/formSchema";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import InputMUI from "../components/InputMUI";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const { state, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values) => {
        console.log(values);
        // try {
        //   setIsLoading(true);
        //   const res = await login(values);
        //   console.log(res);
        //   if (res?.status === 200) {
        //     navigate("/jobs", { replace: true });
        //   } else {
        //     console.log(res);
        //     toast.error(
        //       res?.response?.data?.message
        //         ? res?.response?.data?.message
        //         : res?.response?.data?.msg
        //     );
        //   }
        // } catch (error) {
        //   console.log("error", error);
        //   toast.error(res?.response?.data?.msg);
        // }
        setIsLoading(false);
      },
    });

  return (
    <Page>
      <div className="container-main">
        <div className="header">
          <div className="login-head">
            <h1>logo</h1>
          </div>
          <div className="login-para">
            <h2>Forgot Password?</h2>
          </div>
        </div>
        <p className="forgot-password__text">
          Enter your email below to receive your password reset instructions
        </p>
        <div className="login-main">
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="input-content">
              <div className="inputs">
                <div className="layout">
                  <div className="input">
                    <InputMUI
                      inputField={{
                        label: "Registered Email ID",
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
                {/* <div className="layout">
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
                </div> */}
                {/* <div className="forgot">
                  <NavLink to="/login">
                    <p>Login</p>
                  </NavLink>
                </div> */}
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
                label="Send"
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

export default ForgotPassword;
