import React, { useState } from "react";
import { isAdminLogged } from "./AminUtils";
import { Login } from "./Login/Login";

export const Admin = () => {
  const [userLogged, setLoginStatus] = useState(false);

  return (
    <div className="admin page">
      {isAdminLogged(userLogged) ? (
        "admin"
      ) : (
        <Login setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
