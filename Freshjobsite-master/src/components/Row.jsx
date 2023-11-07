import React, { useContext, useEffect, useState } from "react";
import eye from "../assets/icons/eye.svg";
import chat from "../assets/icons/chat.svg";
import SelectDropdown from "./SelectDropdown";
import { useNavigate } from "react-router-dom";
import { API, AuthContext } from "../context/AuthContext";

const Row = ({ candidate }) => {
  const {
    image,
    name,
    designation,
    prevEmployer,
    duration,
    skillMatch,
    date,
    status: status2,
    applicant_id,
    applied_job_id,
    profile_picture,
  } = candidate;
  console.log("image", candidate);
  const [status, setStatus] = React.useState(status2 || "");
  const [style, setStyle] = React.useState({
    borderColor: "",
    backgroundColor: "",
  });
  React.useEffect(() => {
    switch (status) {
      case "Accepted":
        setStyle({
          borderColor: "#4CAF50",
          backgroundColor: "rgb(236, 248, 236)",
        });
        break;
      case "Pending":
        setStyle({ borderColor: "#316BD6", backgroundColor: "#f2f7fc" });
        break;
      case "Rejected":
        setStyle({ borderColor: "#E53935", backgroundColor: "#fcecee" });
        break;
      case "Interview":
        setStyle({ borderColor: "#FFC107", backgroundColor: "#FFFFED" });
        break;
      default:
        setStyle({ borderColor: "#EEEEEE", backgroundColor: "#fff" });
        break;
    }
  }, [status]);
  const navigate = useNavigate();
  const { state, getAllChats, getSavedJobs } = useContext(AuthContext);

  const createChat = async (id) => {
    const findChat = state?.allChats?.find((e) => e.participants.includes(id));
    console.log("object", findChat);
    if (findChat) {
      navigate(`/messages/?chat_id=${findChat?.id}`);
    } else {
      try {
        const res = await API(
          "post",
          "/users/create_chat/",
          {
            participants: [Number(state.id), Number(id)],
          },
          state.token
        );
        console.log(res);
        getAllChats();
        navigate("/messages");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(state);
    if (!state.allChats) getAllChats();
    if (!state.allChats) getSavedJobs();
  }, []);

  const updateStatus = async (newStatus) => {
    console.log(newStatus);
    try {
      const res = await API(
        "put",
        `users/change_status/${applied_job_id}/`,
        { status: newStatus },
        state.token
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <img
          src={profile_picture ? "http://52.1.41.162/" + profile_picture : null}
          width={48}
          height={48}
          alt=""
        />
      </td>
      <td className="candidate_name">
        <div>
          <p>{name}</p>
          <p>{designation}</p>
        </div>
      </td>
      <td className="skills_match">
        <p>3/5</p>
      </td>
      <td className="_date">
        <p>12/10/2023</p>
      </td>
      <td className="status">
        <SelectDropdown
          value={status}
          handleChange={(event) => {
            updateStatus(event.target.value);
            setStatus(event.target.value);
          }}
          label="Status"
          items={["Accepted", "Pending", "Rejected"]}
          form_control="job_row"
          borderColor={style.borderColor}
          color={style.backgroundColor}
        />
      </td>
      <td className="image__row icons_">
        <button onClick={() => navigate(`/candidate/${applicant_id}`)}>
          <img src={eye} alt="" />
        </button>
        <button onClick={() => createChat(applicant_id)}>
          <img src={chat} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default Row;
