import React from "react";
import error_image from "../assets/images/error_image.png";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="error_content">
      <img src={error_image} alt="" />
      <p className="error_para_1">
        This content is for USA located visitors only!
      </p>
      <p className="error_para_2">
        Sorry the page you are looking for is not accessible from your location
      </p>
      <NavLink to="/">
        <button type="button">Back to Logo</button>
      </NavLink>
    </div>
  );
};

export default Error;
