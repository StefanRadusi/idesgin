import React from "react";

import "./ContactBody.css";

export const ContactBody = () => {
  return (
    <div className="contact-body-container">
      <div className="contact-body">
        <div className="contact-info">
          <h3>
            <span>i</span>DESIGN STUDIO
          </h3>
          <p>Mobil: 0740 488 935</p>
          <p>E-mail: dizainstudio@gmail.com</p>
        </div>
        <div className="contact-mail">
          <div className="contact-mail__item contact-mail__name">
            <p>NAME</p>
            <input />
          </div>
          <div className="contact-mail__item contact-mail__mail">
            <p>E-MAIL</p>
            <input />
          </div>
          <div className="contact-mail__item contact-mail__subject">
            <p>SUBJECT</p>
            <input />
          </div>
          <div className="contact-mail__item contact-mail__message">
            <p>MESSAGE</p>
            <textarea />
          </div>
        </div>
      </div>
    </div>
  );
};
