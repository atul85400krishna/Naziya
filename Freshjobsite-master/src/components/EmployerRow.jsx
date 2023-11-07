import React, { useContext, useState } from "react";
import bin from "../assets/icons/bin.svg";
import eye from "../assets/icons/eye.svg";
import candidate from "../assets/icons/candidate.png";
import SelectDropdown from "./SelectDropdown";
import { useNavigate } from "react-router-dom";
import ConfirmatonModal from "../modals/ComfirmationModal";
import reject_image from "../assets/images/reject_image.png";
import { API, AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import JobViewModal from "../modals/JobViewModal";

const EmployerRow = ({ candidate, refreshJobs }) => {
  const { title, created_at, job_desc, job_post_id, job_status } = candidate;
  const { state } = useContext(AuthContext);
  const [status, setStatus] = React.useState(job_status || "");
  const [open, setOpen] = useState(false);
  const [style, setStyle] = React.useState({
    borderColor: "",
    backgroundColor: "",
  });
  React.useEffect(() => {
    switch (status) {
      case "open":
        setStyle({
          borderColor: "#4CAF50",
          backgroundColor: "rgb(236, 248, 236)",
        });
        break;
      case "Closed":
        setStyle({ borderColor: "#E53935", backgroundColor: "#fcecee" });
        break;
      case "paused":
        setStyle({ borderColor: "#FFC107", backgroundColor: "#FFFFED" });
        break;
      default:
        setStyle({ borderColor: "#EEEEEE", backgroundColor: "#fff" });
        break;
    }
  }, [status]);
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    setOpen(false);
    try {
      const res = await API(
        "delete",
        "users/deletepostedjob/",
        { job_id: id },
        state.token
      );
      toast.success("Job deleted successfully");
      console.log(res);
      refreshJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (newStatus) => {
    console.log(newStatus);
    try {
      const res = await API(
        "put",
        `users/jobpost/`,
        { job_id: job_post_id, job_status: newStatus },
        state.token
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <tr className="candidate_job_row">
      <td className="candidate_job">
        <p>{title}</p>
        <p>{job_desc}</p>
      </td>
      <td className="status">
        <SelectDropdown
          value={status}
          label="Status"
          handleChange={(event) => {
            updateStatus(event.target.value);
            setStatus(event.target.value);
          }}
          items={["paused", "open"]}
          form_control="candidate_job_dropdown"
          borderColor={style.borderColor}
          color={style.backgroundColor}
        />
      </td>
      <td className="_date">
        <p>{new Date(created_at).toLocaleDateString()}</p>
      </td>
      {/* <td className="candidate_job_candidates_">
        <div>
          <img src={candidate} width={32} height={32} alt="" />
          <img
            src={candidate}
            width={32}
            height={32}
            alt=""
            className="img_abs"
          />
          <img
            src={candidate}
            width={32}
            height={32}
            alt=""
            className="img_abs"
          />
          <img
            src={candidate}
            width={32}
            height={32}
            alt=""
            className="img_abs"
          />
          <span
            style={{
              fontFamily: "poppins",
              fontSize: 12,
              color: "#6B7280",
              margin: "5px 0 0 3px",
            }}
          >
            +12
          </span>
        </div>
      </td> */}
      <td className="icons_">
        <button
          onClick={() => {
            // navigate(`/jobcandidates/${job_post_id}`)
            setIsModalOpen(true);
          }}
        >
          <img src={eye} alt="view" className="view_icon" />
        </button>
        <button
          onClick={() => {
            navigate(`/jobcandidates/${job_post_id}`);
          }}
        >
          <img src={eye} alt="view 2" className="view_icon" />
        </button>
        <button onClick={() => setOpen(true)}>
          <img src={bin} alt="delete" />
        </button>
        <ConfirmatonModal
          open={open}
          handleClose={() => setOpen(false)}
          image={reject_image}
          text={"Are you sure you want to delete this job post"}
          btnText={"Delete"}
          handleClick={() => deleteJob(job_post_id)}
        />
        <JobViewModal
          open={isModalOpen}
          data={candidate}
          handleClose={() => {
            setIsModalOpen(false);
          }}
        />
      </td>
    </tr>
  );
};

export default EmployerRow;
