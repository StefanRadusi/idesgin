import React from "react";
import { withRouter } from "react-router-dom";
import { mergeCssClass } from "../../utils/helpers";
import { ProjectCover } from "../ProjectCover/ProjectCover";

import "./ProjectList.css";

const getCssClass = (index) =>
  index % 2 === 0
    ? "projects-list__project-cover--right"
    : "projects-list__project-cover--left";

export const ProjectList = withRouter(
  ({ projects, title, description, setProject, history }) => {
    return (
      (projects && projects.length && (
        <div className="projects-list">
          <div className="projects-list__title-container">
            <div className="projects-list__title">
              <div className="projects-list__title__text-container">
                {title && <p className="projects-list__title__text">{title}</p>}
                {description && (
                  <p className="projects-list__title__sub-text">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={mergeCssClass(
                "projects-list__project-cover-container",
                getCssClass(index)
              )}
              onClick={() => {
                setProject(project);
                history.push(`/project/${project.title}`);
              }}
            >
              <ProjectCover key={project.id} project={project} />
            </div>
          ))}
          {projects.length % 2 === 0 && (
            <div className="projects-list__project-cover-container project-dummy" />
          )}
        </div>
      )) ||
      null
    );
  }
);
