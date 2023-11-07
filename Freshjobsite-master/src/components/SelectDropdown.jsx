import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectDropdown = ({
  label,
  value,
  handleChange,
  items,
  form_control,
  borderColor,
  color,
}) => {
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 100,
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor,
        },
        ".MuiSvgIcon-root ": {
          fill: borderColor,
        },
      }}
      size="small"
      className={form_control}
    >
      <InputLabel id="dropdown" style={{ fontFamily: "poppins" }}>
        {label}
      </InputLabel>
      <Select
        labelId="dropdown"
        id="demo-simple-select-autowidth"
        value={value}
        onChange={handleChange}
        autoWidth
        label={label}
        style={{ borderRadius: 100, fontFamily: "poppins", background: color }}
      >
        <MenuItem value="" style={{ fontFamily: "poppins" }}>
          {label}
        </MenuItem>
        {items.map((item, index) => (
          <MenuItem value={item} key={index} style={{ fontFamily: "poppins" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
