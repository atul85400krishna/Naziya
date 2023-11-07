import React from "react";

const Text = ({ children, class_name }) => (
  <span className={class_name}>{children}</span>
);

export default Text;
