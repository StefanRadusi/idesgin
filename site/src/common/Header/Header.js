import React from "react";

import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" alt="logo" src="/svg/logo.svg" />
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
    </div>
  );
};
