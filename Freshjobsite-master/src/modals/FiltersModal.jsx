import React from "react";
import AlertInterviewModal from "./AlertInterviewModal";
import { Autocomplete } from "@mui/material";
import { cities } from "../components/cities";
import { TextField } from "@mui/material";

const FiltersModal = ({
  handleClose,
  handleOpen,
  open,
  location,
  setLocation,
  selected,
  setSelected,
}) => {
  return (
    <AlertInterviewModal
      title="Filters"
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      modal_btn_class="alert_modal_btn interview_modal_btns"
      label="Apply"
    >
      <Autocomplete
        value={selected}
        onChange={(event, newValue) => setSelected(newValue)}
        disablePortal
        id="combo-box-demo"
        options={["Onsite", "Remote", "Hybrid"]}
        sx={{ marginBottom: "1rem" }}
        renderInput={(params) => <TextField {...params} label="Job Type" />}
      />
      <Autocomplete
        value={location}
        onChange={(event, newValue) => setLocation(newValue)}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={cities.map((option) => option)}
        sx={{ marginBottom: "1rem" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </AlertInterviewModal>
  );
};

export default FiltersModal;
