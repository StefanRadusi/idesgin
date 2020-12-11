import React from "react";

import "./ProjectImgs.css";

export const ProjectImgs = ({ imgs }) => {
  return imgs ? (
    <div className="project-page__project-imgs-container">
      <div className="project-page__project-imgs-container__circle" />
      <div className="project-page__project-imgs">
        {imgs.map((img) => (
          <div key={img} className="project-page__project-imgs__item">
            <img src={img} alt="project pic" />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
