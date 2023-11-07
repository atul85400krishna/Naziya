import React, { useState } from "react";
import NavbarUser from "../components/NavbarUser";
import InputMUI from "../components/InputMUI";
import Button from "../components/Button";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <NavbarUser />
      <main className="notifications__container">
        <h3>Settings</h3>
        {/* <div className="layout signup-input settings__input">
          <div className="input">
            <p>Change Email</p>
            <InputMUI
              classname="input-items"
              handleChange={(e) => setEmail(e.target.value)}
              inputField={{
                label: "Email",
                name: "email",
                value: email,
                size: "small",
                type: "email",
                error: "",
                // marginBottom: errors.email ? 0 : 2,
              }}
            />
          </div>
        </div> */}
        <div className="layout signup-input settings__input">
          <div className="input">
            <p>Change Password</p>
            <InputMUI
              classname="input-items"
              handleChange={(e) => setPassword(e.target.value)}
              inputField={{
                label: "Password",
                name: "email",
                value: password,
                size: "small",
                type: "email",
                error: "",
                // marginBottom: errors.email ? 0 : 2,
              }}
            />
          </div>
        </div>
        <div className="settings__button">
          <Button btn="login_btn" label="Submit" type="submit" />
        </div>
      </main>
    </>
  );
};

export default Settings;
