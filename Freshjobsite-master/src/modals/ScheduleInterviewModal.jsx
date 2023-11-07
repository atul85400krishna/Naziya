import React from "react";
import AlertInterviewModal from "./AlertInterviewModal";
import InputMUI from "../components/InputMUI";
import Dropdown from "../components/Dropdown";

const ScheduleInterviewModal = ({ handleClose, handleOpen, open }) => {
  const [timeZone, setTimeZone] = React.useState("");
  const [state, setState] = React.useState({
    date: "",
    time: "",
    meetingLink: "",
  });
  const handleTimeZoneChange = (data) => setTimeZone(data);
  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });
  return (
    <AlertInterviewModal
      title="Schedule An Interview"
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      modal_btn_class="alert_modal_btn interview_modal_btns"
      label="Send Email"
    >
      <Dropdown
        label="Time Zone"
        name="timeZone"
        value={timeZone}
        options={["Full time", "Part time"]}
        handleChange={handleTimeZoneChange}
        size="small"
        class_name="first_child"
      />
      <InputMUI
        inputField={{
          name: "date",
          value: state.date,
          size: "small",
          label: "Date",
          type: "date",
        }}
        handleChange={handleChange}
        classname="setinterview_modal_input"
      />
      <InputMUI
        inputField={{
          name: "time",
          value: state.time,
          type: "time",
          size: "small",
          label: "Time",
        }}
        handleChange={handleChange}
        classname="setinterview_modal_input"
      />
      <InputMUI
        inputField={{
          name: "meetingLink",
          value: state.meetingLink,
          type: "url",
          size: "small",
          label: "Meeting Link",
        }}
        handleChange={handleChange}
        classname="setinterview_modal_input"
      />
    </AlertInterviewModal>
  );
};

export default ScheduleInterviewModal;
