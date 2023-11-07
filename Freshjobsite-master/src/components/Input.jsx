import React from "react";

const Input = ({
  type,
  name,
  value,
  handleChange,
  classname,
  placeholder,
  checked,
  id,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className={classname}
      placeholder={placeholder}
      checked={checked}
      id={id}
    />
  );
};

export default Input;
