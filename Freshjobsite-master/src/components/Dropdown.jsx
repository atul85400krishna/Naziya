import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const Dropdown = ({
  label,
  handleChange,
  options,
  value,
  name,
  size,
  class_name,
}) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      name={name}
      renderInput={(params) => (
        <TextField {...params} label={label} value={value} size={size} />
      )}
      onChange={(event, value) => handleChange(value)}
      sx={{ marginBottom: 2 }}
      className={class_name}
    />
  );
};

export default Dropdown;
