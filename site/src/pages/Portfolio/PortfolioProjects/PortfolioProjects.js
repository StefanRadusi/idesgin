import React, { useEffect, useState } from "react";
import { ProjectList } from "../../../common/ProjectList/ProjectList";
import { getProjectsByType } from "../../../utils/api";
import { mergeCssClass } from "../../../utils/helpers";

import "./PortfolioProjects.css";
import { PortfolioProjectsHeader } from "./PortfolioProjectsHeader";

const useGetAllProjects = () => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    getProjectsByType("all").then(({ projects }) => {
      if (projects && projects.length) {
        const splitProjects = projects.reduce(
          (acc, project) => {
            switch (project.type) {
              case "residential":
                acc.residential.push(project);
                break;
              case "commercial":
                acc.commercial.push(project);
                break;
              default:
                break;
            }

            return acc;
          },
          { residential: [], commercial: [] }
        );
        setProjects(splitProjects);
      }
    });
  }, []);

  return projects;
};

export const PortfolioProjects = ({ setProject }) => {
  const [type, setType] = useState("commercial");
  const { residential, commercial } = useGetAllProjects();

  return (
    <div className="portfolio-projects-container">
      <div
        className={mergeCssClass(
          "portfolio-back-circle",
          type === "commercial" && "portfolio-back-circle--to-right"
        )}
      />
      <PortfolioProjectsHeader type={type} onClick={(type) => setType(type)} />
      <div className="portfolio-projects">
        <div
          className={mergeCssClass(
            "portfolio-projects__container",
            "portfolio-projects__commercial-container",
            type === "commercial" && "portfolio-projects__container--active"
          )}
        >
          {commercial && (
            <ProjectList
              projects={commercial}
              description="scroll to see more"
              setProject={setProject}
            />
          )}
        </div>
        <div
          className={mergeCssClass(
            "portfolio-projects__container",
            "portfolio-projects__residential-container",
            type === "residential" && "portfolio-projects__container--active"
          )}
        >
          {residential && (
            <ProjectList
              projects={residential}
              description="scroll to see more"
            />
          )}
        </div>
      </div>
    </div>
  );
};
