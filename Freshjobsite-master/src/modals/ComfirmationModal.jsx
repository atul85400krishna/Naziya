import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ComfirmatonModal = ({
  open,
  handleClose,
  handleClick,
  image,
  text,
  btnText,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxWidth: 386,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0px 0px 0px",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <img src={image} alt="" width={48} height={48} />
      </DialogTitle>
      <DialogContent>
        <p className="comfirmation_modal_text">{text}</p>
      </DialogContent>
      <DialogActions className="comfirmation_btns">
        <button type="button" className="comfirmation_accept_btn" onClick={handleClick} >
          {btnText}
        </button>
        <button
          type="button"
          className="comfirmation_accept_btn comfirmation_reject_btn"
          onClick={handleClose}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ComfirmatonModal;
