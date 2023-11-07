import React from "react";
import Aside from "./Aside";

const Page = ({ children }) => {
  return (
    <div className="container">
      {children}
      <Aside />
    </div>
  );
};

export default Page;
