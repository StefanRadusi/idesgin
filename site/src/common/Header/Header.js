import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Header.css";

export const Header = withRouter(({ location: { pathname } }) => {
  const isAdminPage = pathname.includes("admin");
  console.log(isAdminPage);

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" alt="logo" src="/svg/logo.svg" />
      </Link>

      {!isAdminPage && (
        <React.Fragment>
          <a
            href="https://www.facebook.com/idizainstudio"
            className="header__facebook-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="logo" src="/svg/facebook.svg" />
          </a>
          <a
            className="header__instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/idizainstudio/?fbclid=IwAR2N-qG63_q1pHRIL7R3stExnEXxZ7G_YQJ917Dp7QmvmcecH20nlaH1oEo"
          >
            <img alt="logo" src="/svg/instagram.svg" />
          </a>
        </React.Fragment>
      )}
      {isAdminPage && (
        <img
          className="header__instagram__logout"
          src="/svg/logout.svg"
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/admin";
          }}
        />
      )}
    </div>
  );
});
