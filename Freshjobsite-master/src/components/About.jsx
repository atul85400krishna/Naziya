import React, { useState } from "react";
import camera from "../assets/icons/camera.svg";
import InputMUI from "./InputMUI";
import { TextField } from "@mui/material";

const About = ({
  values,
  errors,
  handleBlur,
  handleChange,
  image,
  setImage,
  setEditMode,
}) => {
  const [showImage, setShowImage] = useState();
  const formFields = [
    {
      label: "Name",
      name: "name",
      value: values.name,
      type: "text",
      required: true,
    },
    {
      label: "Designation",
      name: "designation",
      value: values.designation,
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      value: values.email,
      type: "email",
      required: true,
    },
    {
      label: "GitHub Profile",
      name: "github_profile",
      value: values.github_profile,
      type: "text",
    },
    {
      label: "LinkedIn Profile",
      name: "linkedin_profile",
      value: values.linkedin_profile,
      type: "text",
    },
    {
      label: "Location",
      name: "location",
      value: values.location,
      type: "text",
    },
  ];
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("iamge", imageUrl);
      setShowImage(imageUrl);
    }
  };

  return (
    <div className="profile">
      <button type="button" onClick={() => setEditMode(false)}>
        See public view
      </button>
      <div className="image_sec">
        <img
          src={showImage || "http://52.1.41.162" + values.profile_picture}
          width={155}
          height={155}
          alt=""
          className="image_sec-image"
        />
        <label htmlFor="image">
          <img src={camera} height={18} width={22} />
          <input
            className="upload2"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="profile_inputs">
        {formFields.map((field, index) => (
          <InputMUI
            inputField={{
              ...field,
              error: field.required ? errors[field.name] : null,
            }}
            key={index}
            handleChange={handleChange}
            classname="input_content"
          />
        ))}
        <TextField
          type="text"
          id="outlined-basic"
          label="About"
          value={values.about}
          name="about"
          multiline
          rows={4}
          className="input_content"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default About;
