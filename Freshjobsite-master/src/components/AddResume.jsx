import { useContext, useState } from "react";
import career_icon from "../assets/icons/career_icon.png";
import FileUpload from "react-material-file-upload";
import { API, AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const AddResume = ({ showShadow }) => {
  console.log("values");
  const [file, setFile] = useState([]);
  console.log(file);
  const { state } = useContext(AuthContext);

  const uploadCV = async (e) => {
    // console.log(e);
    // try {
    //   const formData = new FormData();
    //   formData.append("cv", e[0]);
    //   const res = await API("post", "users/upload_cv/", formData, state.token);
    //   console.log(res);
    //   toast.success("CV Uploaded successfully");
    // } catch (error) {
    //   console.log(error);
    // }
    if (e[0].type?.includes("pdf")) {
      try {
        const formData = new FormData();
        formData.append("cv", e[0]);
        const res = await API(
          "post",
          "users/upload_cv/",
          formData,
          state.token
        );
        console.log(res);
        toast.success("CV Uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please upload pdf file");
    }
  };
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
        Add Resume
      </h2>
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

export default AddResume;
