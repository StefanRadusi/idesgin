import React, { useState } from "react";
import emailjs from "emailjs-com";
import { mergeCssClass } from "../../../utils/helpers";

import { CircleEffect } from "../../../common/CircleEffect";
import { Loading } from "../../../common/Loading";

import "./ContactBody.css";

const handleSendMail = (
  name,
  mail,
  subject,
  message,
  setLoading,
  setMailSent,
  setRunInvalidAnimation
) => {
  return () => {
    if (name && mail && subject && message) {
      setLoading(true);
      emailjs
        .send(
          "service_7xeiopl",
          "contact_form",
          {
            name,
            mail,
            subject,
            message,
            to_email: "radusi.stefan@gmail.com",
          },
          "user_xlyLUbENywvyi5Vh77nQj"
        )
        .then(
          (result) => {
            console.log(result.text);
            setLoading(false);
            setMailSent(true);
          },
          (error) => {
            console.log(error.text);
            setLoading(false);
            setMailSent(true);
          }
        );
    } else {
      setRunInvalidAnimation(true);
      setTimeout(() => {
        setRunInvalidAnimation(false);
      }, 500);
    }
  };
};

const isInvalid = (value) =>
  value === undefined || value === null || value === "";

export const ContactBody = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runInvalidAnimation, setRunInvalidAnimation] = useState(false);

  return (
    <div className="contact-body-container">
      <CircleEffect />
      <div className="contact-body">
        <div className="contact-info">
          <h3>
            <span>i</span>DESIGN STUDIO
          </h3>
          <p>
            <span>Mobil</span>: 0740 488 935
          </p>
          <p>
            <span>E-mail</span>: dizainstudio@gmail.com
          </p>
          <p>
            <span>Address</span>: Eroilor, nr.32 / 4, Cluj-Napoca, Romania
          </p>
        </div>
        <div className="contact-mail">
          <h3 className="contact-mail__description">
            LET`S GET TO KNOW EACH OTHER <span>SEND US</span> AN EMAIL
          </h3>
          <div
            className={mergeCssClass(
              "contact-mail__item",
              "contact-mail__name",
              isInvalid(name) && runInvalidAnimation && "invalid-animation"
            )}
          >
            <p>NAME</p>
            <input
              onChange={({ target: { value } }) => setName(value)}
              value={name}
            />
          </div>
          <div
            className={mergeCssClass(
              "contact-mail__item",
              "contact-mail__mail",
              isInvalid(mail) && runInvalidAnimation && "invalid-animation"
            )}
          >
            <p>E-MAIL</p>
            <input
              onChange={({ target: { value } }) => setMail(value)}
              value={mail}
            />
          </div>
          <div
            className={mergeCssClass(
              "contact-mail__item",
              "contact-mail__subject",
              isInvalid(subject) && runInvalidAnimation && "invalid-animation"
            )}
          >
            <p>SUBJECT</p>
            <input
              onChange={({ target: { value } }) => setSubject(value)}
              value={subject}
            />
          </div>
          <div
            className={mergeCssClass(
              "contact-mail__item",
              "contact-mail__message",
              isInvalid(message) && runInvalidAnimation && "invalid-animation"
            )}
          >
            <p>MESSAGE</p>
            <textarea
              onChange={({ target: { value } }) => setMessage(value)}
              value={message}
            />
          </div>
          <button
            className="contact-mail__send-button"
            onClick={handleSendMail(
              name,
              mail,
              subject,
              message,
              setLoading,
              setMailSent,
              setRunInvalidAnimation
            )}
          >
            <img src="/svg/arrows-orange.svg" alt="arrows" />
            <span>S</span>END
          </button>
        </div>
      </div>
      <Loading show={loading} white />
      <div
        className={mergeCssClass(
          "contact-mail__email-sent",
          mailSent && "contact-mail__email-sent--active"
        )}
      >
        <div className="contact-mail__email-sent__inner">
          <img
            src="/svg/paper-plane.svg"
            className="contact-mail__email-sent__icon"
          />
          <p>Mail sent, check your mail for a automatic reply.</p>
        </div>
        <button
          className="contact-mail__email-sent__button"
          onClick={() => {
            setName("");
            setMail("");
            setSubject("");
            setMessage("");
            setMailSent(false);
          }}
        >
          <span>O</span>k
        </button>
      </div>
    </div>
  );
};
