import React from "react";
import ComfirmatonModal from "./ComfirmationModal";
import accept from "../assets/images/accept.png";

const AcceptComfirmationModal = ({ open, handleOpen, handleClose }) => {
  return (
    <ComfirmatonModal
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      image={accept}
      text="an acceptance"
    />
  );
};

export default AcceptComfirmationModal;
