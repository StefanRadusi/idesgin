import React from "react";

import "./ProjectBox.css";

export const ProjectBox = ({
  title,
  coverUrl,
  description,
  tags,
  openEditModal,
  showDeleteProjectModal,
}) => {
  return (
    <div className="edit-portfolio__project__container">
      <div className="edit-portfolio__project__cover">
        <img src={coverUrl} alt="project cover" />
      </div>
      <div className="edit-portfolio__project__details">
        <h2 className="edit-portfolio__project__details__title">{title}</h2>
        <p className="edit-portfolio__project__details__description">
          {description}
        </p>
        <p className="edit-portfolio__project__details__tags">{`tags: ${tags.join(
          ", "
        )}`}</p>
        <div className="edit-portfolio__project__buttons">
          <img
            src="/svg/edit.svg"
            alt="edit project"
            className="edit-portfolio__project__buttons__button edit-portfolio__project__buttons__button__edit"
            onClick={openEditModal}
          />

          <img
            src="/svg/trash.svg"
            alt="delete project"
            className="edit-portfolio__project__buttons__button edit-portfolio__project__buttons__button__delete"
            onClick={showDeleteProjectModal}
          />
        </div>
      </div>
    </div>
  );
};
