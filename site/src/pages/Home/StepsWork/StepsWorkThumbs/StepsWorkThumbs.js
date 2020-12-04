import React from "react";

import "./StepsWorkThumbs.css";

export const StepsWorkThumbs = ({ url, title, description }) => {
  return (
    <div className="steps-work-thumbs">
      <img className="steps-work-thumbs__img" src={url} alt="steps thumbs" />
      <div className="steps-work-thumbs__text-container">
        <h3 className="steps-work-thumbs__title">{title}</h3>
        <p className="steps-work-thumbs__description">{description}</p>
      </div>
    </div>
  );
};
