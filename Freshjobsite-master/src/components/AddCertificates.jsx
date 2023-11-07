import React, { useContext, useState } from "react";
import InputMUI from "./InputMUI";
import MultipleTags from "./MultipleTags";
import { Autocomplete, Stack, TextField } from "@mui/material";
import career_icon from "../assets/icons/career_icon.png";
import FileUpload from "react-material-file-upload";
import { API, AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";

const AddCertificates = ({
  showShadow,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const [file, setFile] = useState([]);
  const { state } = useContext(AuthContext);

  const uploadCV = async (e) => {
    console.log("event", e[0]);
    console.log("event", state.token);
    if (e[0].type?.includes("pdf")) {
      try {
        const formData = new FormData();
        formData.append("name", e[0].name);
        formData.append("organization", "organization");
        formData.append("certificate", e[0]);
        const res = await API(
          "post",
          "users/upload_certificate/",
          formData,
          state.token
        );
        console.log(res);
        toast.success("Certificate Uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please upload pdf file");
    };
  }

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
        Add Certifications
      </h2>
      {/* <label
        htmlFor="resume"
        className="resume_label"
      >
        <img src={career_icon} width={20} height={14} alt="" />
        <p style={{ marginTop: 5, marginBottom: 5, fontSize: 13 }}>
          Select or drop{" "}
          <span style={{ fontWeight: 400, color: "#001F3F" }}>here</span>
        </p>
        {file ? (
          <p
            style={{
              fontFamily: "poppins",
              fontWeight: 400,
              fontSize: 10,
              color: "#001F3F66",
              opacity: 0.6,
            }}
          >
            {file?.name}
          </p>
        ) : (
          <p
            style={{
              fontFamily: "poppins",
              fontWeight: 400,
              fontSize: 10,
              color: "#001F3F66",
              opacity: 0.6,
            }}
          >
            JPG, PNG or PDF, file size no more than 10MB
          </p>
        )}

        <input
          type="file"
          id="resume"
          onChange={(event) => setFile(event.currentTarget.files[0])}
        />
      </label> */}
      <FileUpload
        value={file}
        onChange={(e) => {
          setFile(e);
          uploadCV(e);
        }}
      />
    </div>
  );
};

export default AddCertificates;
