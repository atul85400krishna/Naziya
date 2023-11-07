import add_icon from "../assets/icons/add_icon.png";
import deleteIcon from "../assets/icons/bin.svg";
import { Autocomplete, Stack, TextField } from "@mui/material";
import InputMUI from "./InputMUI";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";

const Education = ({
  showShadow,
  values,
  errors,
  handleChange,
  setFieldValue,
}) => {
  const schoolProps = [
    {
      label: "School Name",
      name: "school_name",
      type: "text",
    },
    { label: "Degree", name: "degree", type: "text" },
    { label: "Grade", value: values.grade, name: "grade", type: "text" },
  ];

  return (
    <>
      <div
        className="work_exp"
        style={
          showShadow
            ? {
                boxShadow: "0 0 10px 0 #001F3F14",
                padding: 16,
                borderRadius: 12,
                margin: "10px 0 10px 0",
                width: "100%",
                backgroundColor: "#fff",
              }
            : {}
        }
      >
        <span>
          <h2
            className="job_pref"
            style={showShadow ? { display: "block" } : { display: "none" }}
          >
            Education
          </h2>
        </span>

        {values.education &&
          values?.education?.map((role, index) => (
            <Stack
              spacing={2}
              sx={{
                position: "relative",
                padding: "1rem 0",
                borderBottom:
                  index !== values.education.length - 1
                    ? "1px dashed rgb(0, 0, 0, 0.3)"
                    : "none",
              }}
              key={index}
            >
              <button
                className="delete-btn"
                onClick={() => {
                  const prevData = values.education;
                  prevData.splice(index, 1);
                  setFieldValue(`education`, prevData);
                }}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
              {schoolProps.map((school) => (
                <InputMUI
                  inputField={{
                    ...school,
                    error: errors?.education?.[index]?.[school.name],
                    value: values.education[index][school.name],
                    name: `education[${index}][${school.name}]`,
                  }}
                  classname="input_content"
                  handleChange={handleChange}
                  key={school.name}
                />
              ))}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Duration (From)"
                    value={dayjs(values.education[index].duration_from)}
                    onChange={(newValue) => {
                      console.log(values.education[index].duration_from);
                      setFieldValue(
                        `education[${index}].duration_from`,
                        dayjs(newValue).toISOString()
                      );
                    }}
                  />
                  {errors?.education?.[index]?.duration_from && (
                    <p className="error-message" style={{ marginTop: "15px" }}>
                      This field is required
                    </p>
                  )}
                  <DatePicker
                    label="Durartion (To)"
                    value={dayjs(values.education[index].duration_to)}
                    onChange={(newValue) =>
                      setFieldValue(
                        `education[${index}].duration_to`,
                        dayjs(newValue).toISOString()
                      )
                    }
                  />
                  {errors?.education?.[index]?.duration_to && (
                    <p className="error-message" style={{ marginTop: "15px" }}>
                      This field is required
                    </p>
                  )}
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                type="text"
                id="outlined-basic"
                label="Description"
                value={values.education[index].description}
                name={`education[${index}].description`}
                multiline
                rows={4}
                className="input_content"
                onChange={handleChange}
              />
              <Autocomplete
                options={["Canada", "Ireland", "UK", "USA"]}
                name="skills"
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
                value={values.education[index].location}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setFieldValue(
                    `education[${index}].location`,
                    newValue ? newValue : ""
                  );
                }}
              />
            </Stack>
          ))}
        <div style={{ textAlign: "end" }}>
          <span
            style={{
              marginBottom: 10,
              cursor: "pointer",
              justifyContent: "end",
              gap: "5px",
              color: "#5A52FF",
            }}
            onClick={() =>
              setFieldValue(`education`, [
                ...values.education,
                {
                  school_name: "",
                  degree: "",
                  description: "",
                  duration: "",
                },
              ])
            }
          >
            <img src={add_icon} width={20} height={20} alt="" />
            Add
          </span>
        </div>
      </div>
    </>
  );
};

export default Education;
