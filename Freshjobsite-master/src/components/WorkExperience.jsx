import React, { useEffect } from "react";
import add_icon from "../assets/icons/add_icon.png";
import { Autocomplete, Stack, TextField } from "@mui/material";
import InputMUI from "./InputMUI";
import Dropdown from "./Dropdown";
import deleteIcon from "../assets/icons/bin.svg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const WorkExperience = ({
  showShadow,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  console.log("alues.work_experience ", values.work_experience);

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
            Work Experience
          </h2>
        </span>

        {values.work_experience &&
          values.work_experience.map((role, index) => (
            <Stack
              spacing={2}
              sx={{
                padding: "1rem 0",
                position: "relative",
                borderBottom:
                  index !== values.work_experience.length - 1
                    ? "1px dashed rgb(0, 0, 0, 0.4)"
                    : "none",
              }}
              key={index}
            >
              <button
                className="delete-btn"
                onClick={() => {
                  const prevData = values.work_experience;
                  prevData.splice(index, 1);
                  setFieldValue(`work_experience`, prevData);
                }}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
              <InputMUI
                classname="input_content"
                inputField={{
                  label: "Company Name",
                  name: `work_experience[${index}].company_name`,
                  value: values?.work_experience?.[index]?.company_name,
                  type: "text",
                  error: errors?.work_experience?.[index]?.company_name,
                }}
                handleChange={handleChange}
              />
              <InputMUI
                classname="input_content"
                inputField={{
                  label: "Designation",
                  name: `work_experience[${index}].designation`,
                  value: values?.work_experience[index].designation,
                  error: errors?.work_experience?.[index]?.designation,
                  type: "text",
                }}
                handleChange={handleChange}
              />
              <Autocomplete
                options={["Full-time", "Part-time"]}
                name="skills"
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Employment Type" />
                )}
                value={values?.work_experience[index]?.employment_type}
                onChange={(event, newValue) =>
                  setFieldValue(
                    `work_experience[${index}].employment_type`,
                    newValue
                  )
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                name={`work_experience[${index}].description`}
                value={values.work_experience[index].description}
                className="input_content"
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                multiline
                rows={4}
                label="Responsibilities"
              />
              <Autocomplete
                multiple
                options={[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React.js",
                  "Angular.js",
                  "Nextjs13",
                  "Material UI",
                ]}
                name="skills"
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Skills" />
                )}
                value={
                  values?.work_experience[index]?.skills === ""
                    ? []
                    : Array.isArray(values.work_experience[index].skills)
                    ? values.work_experience[index].skills
                    : (setFieldValue(
                        `work_experience[${index}].skills`,
                        eval(values.work_experience[index].skills)
                      ),
                      eval(values.work_experience[index].skills))
                }
                onChange={(event, newValue) => {
                  setFieldValue(`work_experience[${index}].skills`, newValue);
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Duration (From)"
                    value={dayjs(values.work_experience[index].duration_from)}
                    onChange={(newValue) =>
                      setFieldValue(
                        `work_experience[${index}].duration_from`,
                        dayjs(newValue).toISOString()
                      )
                    }
                  />
                  <DatePicker
                    label="Durartion (To)"
                    value={dayjs(values.work_experience[index].duration_to)}
                    onChange={(newValue) =>
                      setFieldValue(
                        `work_experience[${index}].duration_to`,
                        dayjs(newValue).toISOString()
                      )
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>

              <InputMUI
                classname="input_content"
                inputField={{
                  label: "Location",
                  name: `work_experience[${index}].location`,
                  value: values?.work_experience?.[index]?.location,
                  type: "text",
                  error: errors?.work_experience?.[index]?.location,
                }}
                handleChange={handleChange}
              />
            </Stack>
          ))}
        <div style={{ textAlign: "end" }}>
          <span
            style={{
              display: "inline-block",
              marginBottom: 10,
              cursor: "pointer",
              color: "#5A52FF",
            }}
            onClick={() =>
              setFieldValue(`work_experience`, [
                ...values.work_experience,
                {
                  company_name: "",
                  designation: "",
                  employment_type: "",
                  description: "",
                  duration: "",
                  location: "",
                  duration_from: "", //add
                  duration_to: "", //add
                  skills: [],
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

export default WorkExperience;
