import React, { useState } from "react";
import { isAdminLogged } from "./AminUtils";
import { Login } from "./Login";
import { Tabs } from "./Tabs";

import "./Admin.css";

export const Admin = () => {
  const [userLogged, setLoginStatus] = useState(false);

  return (
    <div className="page admin">
      {isAdminLogged(userLogged) ? (
        <Tabs />
      ) : (
        <Login setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
