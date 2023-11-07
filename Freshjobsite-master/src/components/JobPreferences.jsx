import React from "react";
import InputMUI from "./InputMUI";
import MultipleTags from "./MultipleTags";
import { Autocomplete, Stack, TextField } from "@mui/material";

const JobPreferences = ({
  showShadow,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const preferences = [
    {
      label: "What type of employement are you interested in?",
      options: ["Internship", "Fulltime", "Part-time", "Contarct"],
    },
    {
      label: "What locations do you want to work in?",
      options: [
        "UK",
        "Pakistan",
        "USA",
        "India",
        "Aouth Africa",
        "Phillipines",
        "Brzil",
      ],
    },
  ];

  console.log(errors);

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
        Job Preferences
      </h2>
      <div className="pref_inputs">
        <InputMUI
          inputField={{
            label: "What is your desired salary?",
            name: "desired_salary",
            value: values.desired_salary,
            type: "text",
          }}
          classname="input_content"
          handleChange={handleChange}
        />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Autocomplete
            multiple
            options={["Internship", "Fulltime", "Part-time", "Contarct"]}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="What type of employement are you interested in?"
              />
            )}
            value={
              values.employment_interest === ""
                ? []
                : Array.isArray(values.employment_interest)
                ? values.employment_interest
                : (setFieldValue(
                    "employment_interest",
                    eval(values.employment_interest)
                  ),
                  eval(values.employment_interest))
            }
            onChange={(event, newValue) => {
              setFieldValue("employment_interest", newValue);
            }}
          />
          <Autocomplete
            multiple
            options={["Onsite", "Remote", "Hybrid"]}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="What job location type are you interested in?"
              />
            )}
            value={
              values.desired_location_type === ""
                ? []
                : Array.isArray(values.desired_location_type)
                ? values.desired_location_type
                : (setFieldValue(
                    "desired_location_type",
                    eval(values.desired_location_type)
                  ),
                  eval(values.desired_location_type))
            }
            onChange={(event, newValue) => {
              setFieldValue("desired_location_type", newValue);
            }}
          />
          <Autocomplete
            multiple
            options={[
              "Canada",
              "Ireland",
              "UK",
              "USA",
            ]}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="What locations do you want to work in?"
              />
            )}
            value={
              values.desired_location === ""
                ? []
                : Array.isArray(values.desired_location)
                ? values.desired_location
                : (setFieldValue(
                    "desired_location",
                    eval(values.desired_location)
                  ),
                  eval(values.desired_location))
            }
            onChange={(event, newValue) => {
              setFieldValue("desired_location", newValue);
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default JobPreferences;
