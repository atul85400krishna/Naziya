import React from "react";
import Spinner from "./Spinner";

const Button = ({ label, handleClick, btn, type, isLoading }) => {
  return (
    <button onClick={handleClick} className={btn} type={type || "button"}>
      {isLoading ? <Spinner size={25} color="white" /> : <p className="btn-text" >{label}</p>}
    </button>
  );
};

export default Button;
