import TextField from "@mui/material/TextField";

const InputMUI = ({
  inputField: { label, value, name, type, size, error, marginBottom },
  handleChange,
  classname,
}) => {
  return (
    <TextField
      error={error}
      helperText={error}
      type={type}
      // id="outlined-basi"
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      className={classname}
      sx={{ marginBottom: marginBottom !== undefined ? marginBottom : 2, fontSize: 6 }}
      size={size}
      inputProps={{ style: { fontSize: 14 } }} // font size of input text
      InputLabelProps={{ style: { fontSize: 14 } }}
    />
  );
};

export default InputMUI;
