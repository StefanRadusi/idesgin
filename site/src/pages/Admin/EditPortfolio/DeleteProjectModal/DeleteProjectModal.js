import React, { useState } from "react";
import { Loading } from "../../../../common/Loading";
import { deleteProject } from "../../../../utils/api";
import { mergeCssClass } from "../../../../utils/helpers";

import "./DeleteProjectModal.css";

const handleDeleteProject = (projectId, setLoading, hide, reFetchProjects) => {
  return () => {
    setLoading(true);
    deleteProject(projectId)
      .then(() => {
        setLoading(false);
        reFetchProjects();
        hide();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        hide();
      });
  };
};

export const DeleteProjectModal = ({
  show,
  hide,
  projectId,
  projectTitle,
  reFetchProjects,
}) => {
  const [showLoading, setLoading] = useState(false);

  return (
    show && (
      <div className="delete-project-modal">
        <div className="delete-project-modal__overlay" />
        <div className="delete-project-modal__content">
          <div className="delete-project-modal__content__message">
            <img src="/svg/trash.svg" alt="trash" />
            <div className="delete-project-modal__content__message__text">
              <p>Are sure you want to delete:</p>
              <p className="delete-project-modal__content__message__proj-title">
                {projectTitle}
              </p>
            </div>
          </div>

          <div className="add-project-modal__buttons">
            <button
              className="add-project-modal__buttons__button-cancel"
              onClick={hide}
            >
              No
            </button>
            <button
              className={mergeCssClass(
                "add-project-modal__buttons__button-apply",
                "add-project-modal__buttons__button-apply--enable"
              )}
              onClick={handleDeleteProject(
                projectId,
                setLoading,
                hide,
                reFetchProjects
              )}
            >
              Yes
            </button>
          </div>
          <Loading show={showLoading} />
        </div>
      </div>
    )
  );
};
