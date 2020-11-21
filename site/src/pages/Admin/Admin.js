import React, { useState } from "react";
import { isAdminLogged } from "./AminUtils";
import { Login } from "./Login";
import { Tabs } from "./Tabs";

export const Admin = () => {
  const [userLogged, setLoginStatus] = useState(false);

  return (
    <div className="admin page">
      {isAdminLogged(userLogged) ? (
        <Tabs />
      ) : (
        <Login setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
