import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getLatestProjects } from "../../../utils/api";
import { ProjectCover } from "../../../common/ProjectCover/ProjectCover";

import "./LatestProjects.css";
import { mergeCssClass } from "../../../utils/helpers";

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

const onScroll = (circleRef, setScaleValue) => {
  return () => {
    if (circleRef.current) {
      const { top, height } = circleRef.current.getBoundingClientRect();

      const scaleValue = Math.floor((-(top - 600) / 500) * 100) / 100;

      if (scaleValue > 0 && scaleValue <= 1) {
        setScaleValue(scaleValue);
      } else if (scaleValue <= 0) {
        setScaleValue(0);
      } else {
        setScaleValue(1);
      }
    }
  };
};

export const LatestProjects = () => {
  const latestProjects = useGetLatestProject();
  const [scaleValue, setScaleValue] = useState(0);

  const circleRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", onScroll(circleRef, setScaleValue));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    latestProjects.length && (
      <div className="projects-list" ref={circleRef}>
        <div
          className="projects-list__circle"
          style={{ transform: `scale(${scaleValue})` }}
        />
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
        <div className="find-more-container">
          <div className="find-more">
            <img className="find-more__arrows" src="/svg/arrows.svg" />
            <p className="find-more__text">
              <span>FIND</span> OUT MORE
            </p>
          </div>
        </div>
      </div>
    )
  );
};
