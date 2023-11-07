import React from "react";
import menu_icon from "../assets/icons/menu_icon.png";
import search_icon from "../assets/icons/search_icon.png";
import Input from "./Input";

const Navigation = ({ show_search = true }) => {
  return (
    <div className="application_head">
      <h2>logo</h2>
      <div>
        <span style={show_search ? { display: "block" } : { display: "none" }}>
          <img src={search_icon} alt="" />
          <Input
            type="text"
            name="search"
            classname="input_application"
            placeholder="Job title, company or keywords"
          />
        </span>
      </div>
      <img src={menu_icon} height={12} width={18} alt="" />
    </div>
  );
};

export default Navigation;
