import React from "react";
import ComfirmatonModal from "./ComfirmationModal";
import reject_image from "../assets/images/reject_image.png";

const RejectComfirmation = ({ handleClose, handleOpen, open }) => {
  return (
    <ComfirmatonModal
      handleClose={handleClose}
      handleOpen={handleOpen}
      image={reject_image}
      open={open}
      text="a reject"
    />
  );
};

export default RejectComfirmation;
