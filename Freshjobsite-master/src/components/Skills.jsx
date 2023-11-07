import React from "react";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import deleteIcon from "../assets/icons/bin.svg";
import add_icon from "../assets/icons/add_icon.png";
import Dropdown from "./Dropdown";

const _skills = [
  {
    label: "Tools",
    name: "tools",
    options: ["figma", "justinmind", "adobe"],
  },
  {
    label: "Languages",
    name: "languagaes",
    options: ["English", "French", "Urdu", "Kiswahili"],
  },
];

const Skills = ({
  showShadow,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <div
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
      <h2
        className="job_pref"
        style={showShadow ? { display: "block" } : { display: "none" }}
      >
        Skills
      </h2>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Autocomplete
          multiple
          options={[
            "Java",
            "Python",
            "Ruby",
            "JavaScript",
            "React.js",
            "Angular.js",
            "HTML",
            "CSS",
            "Nextjs13",
            "Material UI",
          ]}
          name="skills"
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Skills" />}
          value={
            values.skills === ""
              ? []
              : Array.isArray(values.skills)
              ? values.skills
              : (setFieldValue("skills", eval(values.skills)),
                eval(values.skills))
          }
          onChange={(event, newValue) => {
            setFieldValue("skills", newValue);
          }}
        />
        <Autocomplete
          multiple
          options={["figma", "justinmind", "adobe"]}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Tools" />}
          value={
            values.tools === ""
              ? []
              : Array.isArray(values.tools)
              ? values.tools
              : (setFieldValue("tools", eval(values.tools)), eval(values.tools))
          }
          onChange={(event, newValue) => {
            setFieldValue("tools", newValue);
          }}
        />
        {values.languages &&
          values?.languages?.map((role, index) => (
            <Stack
              spacing={0}
              sx={{
                position: "relative",
              }}
              key={index}
            >
              <button
                className="delete-btn"
                style={{ top: "1rem" }}
                onClick={() => {
                  const prevData = values.languages;
                  prevData.splice(index, 1);
                  setFieldValue(`languages`, prevData);
                }}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Autocomplete
                  value={values.languages[index].name}
                  onChange={(event, newValue) => {
                    setFieldValue(`languages[${index}].name`, newValue);
                  }}
                  id="controllable-states-demo"
                  options={["Hindi", "English", "Urdu", "Telugu"]}
                  sx={{ flex: "1" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Language" />
                  )}
                />
                <Autocomplete
                  value={values.languages[index].proficiency}
                  onChange={(event, newValue) => {
                    setFieldValue(`languages[${index}].proficiency`, newValue);
                  }}
                  id="controllable-states-demo"
                  options={[
                    "Elementary",
                    "Limited Working",
                    "Professional Working",
                    "Full Professional",
                    "Native / Bilingual",
                  ]}
                  sx={{ flex: "1" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Proficiency" />
                  )}
                />
              </Box>
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
              setFieldValue("languages", [
                ...values.languages,
                {
                  name: "",
                  proficiency: "",
                },
              ])
            }
          >
            <img src={add_icon} width={20} height={20} alt="" />
            Add
          </span>
        </div>
      </Stack>
    </div>
  );
};

export default Skills;
