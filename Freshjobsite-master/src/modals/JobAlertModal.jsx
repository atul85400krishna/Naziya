import React from "react";
import AlertInterviewModal from "./AlertInterviewModal";
import notification_icon from "../assets/icons/notification_icon.png";
import InputMUI from "../components/InputMUI";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Text from "../components/Text";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const JobAlertModal = ({ handleClose, handleOpen, open }) => {
  const [email, setEmail] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  // console.log(checked, ">>>>");
  return (
    <AlertInterviewModal
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      label="Set Alert"
      title="Set Job Alert"
      modal_btn_class="alert_modal_btn"
    >
      <img
        src={notification_icon}
        width={16}
        height={19.5}
        alt=""
        className="notification_icon"
      />
      <Text class_name="alert_text">
        Add your email to receive job notifications.
      </Text>
      <div className="alert_content">
        <InputMUI
          classname="alert_modal_input"
          inputField={{
            label: "Email",
            name: "email",
            size: "small",
            type: "email",
            value: email,
          }}
          handleChange={(event) => setEmail(event.target.value)}
        />
        <div className="switch_content">
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            value={checked}
            onChange={() => setChecked((prevState) => !prevState)}
          />
          <Text class_name="alert_checked_text">
            Receive alerts for similar job opportunities.
          </Text>
        </div>
      </div>
    </AlertInterviewModal>
  );
};

export default JobAlertModal;
