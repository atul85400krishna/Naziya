import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const MultipleTags = ({ label, options, handleChange, name }) => {
  return (
    <Autocomplete
      multiple
      options={options}
      name={name}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleChange}
    />
  );
};

export default MultipleTags;
