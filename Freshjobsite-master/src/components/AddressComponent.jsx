import React from "react";

const AddressComponent = ({ image, label, value }) => {
  return (
    <p>
      <img
        src={image}
        width={15}
        height={13}
        alt=""
        style={{ borderRadius: 0 }}
      />
      <label>
        <span>{label}</span>:<span> {value}</span>
      </label>
    </p>
  );
};

export default AddressComponent;
