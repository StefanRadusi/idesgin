import React from "react";
import { addNewLine } from "../../utils/helpers";

import "./ProjectCover.css";

export const ProjectCover = ({ project }) => {
  const { title, description, coverImageUrl } = project;
  return (
    <div
      className="project-cover"
      style={{ backgroundImage: `url("${coverImageUrl}"` }}
    >
      <div className="project-cover__overlay" />
      <div className="project-cover__title-container">
        <h3 className="project-cover__title">{title && title.toUpperCase()}</h3>
      </div>

      <div className="project-cover__description-container">
        <p
          className="project-cover__description"
          dangerouslySetInnerHTML={{ __html: addNewLine(description) }}
        />
      </div>
    </div>
  );
};
