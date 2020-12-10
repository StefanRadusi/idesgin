import React from "react";

import "./ProjectBox.css";
import { ProjectImgs } from "./ProjectImgs/ProjectImgs";

export const ProjectBox = ({
  id,
  title,
  coverUrl,
  description,
  tags,
  openEditModal,
  showDeleteProjectModal,
  imgs,
  refetchProjects,
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
        <ProjectImgs
          projectId={id}
          imgs={imgs}
          refetchProjects={refetchProjects}
        />
      </div>
    </div>
  );
};
