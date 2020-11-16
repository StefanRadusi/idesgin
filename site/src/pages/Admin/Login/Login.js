import React, { useState } from "react";
import { userLogin } from "../../../utils/api";

import "./Login.css";

const useHandleOnChange = () => {
  const [value, setValue] = useState("");

  const handleOnChange = ({ target: { value } }) => setValue(value);

  return [value, handleOnChange];
};

export const Login = ({ setLoginStatus }) => {
  const [value, handleOnChange] = useHandleOnChange();

  const handleEnter = ({ key, target: { value } }) => {
    if (key === "Enter" && value) {
      userLogin("admin@gmail.com", value)
        .then(({ message, token }) => {
          console.log(message, token);
          if (message === "Authentication successful" && token) {
            localStorage.setItem("token", token);
            setLoginStatus(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="login">
      <p className="login-title">Admin</p>
      <input
        className="login-input"
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleEnter}
      />
    </div>
  );
};
