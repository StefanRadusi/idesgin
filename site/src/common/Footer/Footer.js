import React from "react";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo-container">
        <img src="/svg/logo-black.svg" alt="logo black" />
      </div>
      <div className="footer__portfolio-container">
        <h3>PORTFOLIO</h3>
        <p>Commercial</p>
        <p>Residential</p>
      </div>
      <div className="footer__services-container">
        <h3>SERVICES</h3>
        <p>Prices</p>
        <p>Services</p>
        <p>Work Practice</p>
      </div>
      <div className="footer__contact-container">
        <h3> CONTACT US</h3>
        <p>Tel: +40740488935 / +40751195354</p>
        <p>Adress: str. Eroilor nr 32</p>
        <p>Mail: idizainstudio@gmail.com</p>
      </div>
      <div className="footer__keep-up-container">
        <h3> KEEP UP WITH US</h3>
        <div className="footer__social-media-icons">
          <a
            href="https://www.facebook.com/idizainstudio"
            className="footer__facebook-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="logo" src="/svg/facebook.svg" />
          </a>
          <a
            className="footer__instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/idizainstudio/?fbclid=IwAR2N-qG63_q1pHRIL7R3stExnEXxZ7G_YQJ917Dp7QmvmcecH20nlaH1oEo"
          >
            <img alt="logo" src="/svg/instagram.svg" />
          </a>
        </div>
      </div>

      <div
        className="footer__scroll-up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="/svg/arrows.svg" alt="arrows" />
      </div>
    </div>
  );
};
