import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const SocialLogin = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLogin(codeResponse),
    flow: "auth-code",
  });
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleFailure = (result) => {
    alert(result);
    console.log(result);
  };
  const { socialLogin } = useContext(AuthContext);
  const handleLogin = async (googleData) => {
    console.log(googleData);
    console.log(jwt_decode(googleData?.credential));
    const res = await axios.post(BASE_URL + "/api/google_login/", {
      access_token: googleData.credential,
    });
    console.log(res);
    socialLogin(res?.data);
    // setLoginData(data);
    // localStorage.setItem("loginData", JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const [code, setCode] = React.useState("");

  const { linkedInLogin } = useLinkedIn({
    clientId: "77y2bjb2r736vn",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      // setErrorMessage("");
    },
    scope: "openid profile w_member_social email",
    onError: (error) => {
      console.log(error);
      setCode("");
      // setErrorMessage(error.errorMessage);
    },
  });

  const getUserDetails = async () => {
    try {
      const res = await axios.post(BASE_URL + "/api/linkedin_login/", {
        code: code,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) getUserDetails();
  }, [code]);

  return (
    <>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={handleFailure}
        useOneTap
        shape="circle"
        size="medium"
      />
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: "160px", cursor: "pointer" }}
      />
    </>
  );
};

export default SocialLogin;
