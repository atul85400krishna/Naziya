import React from "react";
import Input from "./Input";

const InputLayout = ({ type, name, placeholder }) => {
  return (
    <div className="layout">
      <div className="input">
        <Input
          type={type}
          name={name}
          classname="input-items"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputLayout;
