import React, { useEffect, useState } from "react";
import { getLatestProjects } from "../../../utils/api";
import { ProjectCover } from "../../../common/ProjectCover/ProjectCover";

import "./LatestProjects.css";
import { mergeCssClass } from "../../../utils/helpers";
import { CircleEffect } from "../../../common/CircleEffect";
import { FindMore } from "../../../common/FindMore";
import { ProjectList } from "../../../common/ProjectList";

const useGetLatestProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getLatestProjects().then(({ projects }) => {
      setProjects(projects);
    });
  }, []);

  return projects;
};

export const LatestProjects = () => {
  const latestProjects = useGetLatestProject();

  return (
    latestProjects.length && (
      <div className="projects-list-container">
        <CircleEffect />
        <ProjectList
          projects={latestProjects}
          title=" OUR LATEST PROJECTS"
          description="iDesign Studio's mission is to design and implement
                  functionally-aesthetically balanced spaces tailored to the
                  client's personality traits."
        />

        <FindMore text="FIND OUT MORE" className="latest-projects__find-more" />
      </div>
    )
  );
};
