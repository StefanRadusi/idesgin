import React, { useEffect, useRef, useState } from "react";
import { getLatestProjects } from "../../../utils/api";
import { ProjectCover } from "../../../common/ProjectCover/ProjectCover";

import "./LatestProjects.css";
import { mergeCssClass } from "../../../utils/helpers";
import { CircleEffect } from "../../../common/CircleEffect";
import { FindMore } from "../../../common/FindMore";

const useGetLatestProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getLatestProjects().then(({ projects }) => {
      setProjects(projects);
    });
  }, []);

  return projects;
};

const getCssClass = (index) =>
  index % 2 === 0
    ? "projects-list__project-cover--right"
    : "projects-list__project-cover--left";

export const LatestProjects = () => {
  const latestProjects = useGetLatestProject();
  const compRef = useRef(null);

  return (
    latestProjects.length && (
      <div className="projects-list" ref={compRef}>
        <CircleEffect parentRef={compRef} />
        <div className="projects-list__title-container">
          <div className="projects-list__title">
            <div className="projects-list__title__text-container">
              <p className="projects-list__title__text">OUR LATEST PROJECTS</p>
              <p className="projects-list__title__sub-text">
                iDesign Studio's mission is to design and implement
                functionally-aesthetically balanced spaces tailored to the
                client's personality traits.
              </p>
            </div>
          </div>
        </div>
        {latestProjects.map((project, index) => (
          <div
            key={project.id}
            className={mergeCssClass(
              "projects-list__project-cover-container",
              getCssClass(index)
            )}
          >
            <ProjectCover key={project.id} project={project} />
          </div>
        ))}
        <FindMore text="FIND OUT MORE" className="latest-projects__find-more" />
      </div>
    )
  );
};
