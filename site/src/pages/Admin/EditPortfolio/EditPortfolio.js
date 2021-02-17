import React, { useEffect, useState } from "react";

import { Link, useParams, withRouter } from "react-router-dom";
import { TabsHeaderButton } from "../Tabs/TabsHeaderButton";
import { isTabSelected } from "../Tabs";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { Loading } from "../../../common/Loading";
import { getProjectsByType, reorderProjects } from "../../../utils/api";
import { ProjectBox } from "./ProjectBox";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";

import "./EditPortfolio.css";

const sortProjects = (a, b) => (a.createdAt < b.createdAt ? 1 : -1);

const getProject = (type, setProjects, setLoadingProjects) => {
  setLoadingProjects(true);
  getProjectsByType(type)
    .then((response) => {
      const { projects } = response || {};
      setProjects((projects || []).sort(sortProjects));

      setLoadingProjects(false);
    })
    .catch((error) => {
      console.error(error);
      setLoadingProjects(false);
    });
};

const useGetProjects = (setLoadingProjects, projectType) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProject(projectType, setProjects, setLoadingProjects);
  }, [projectType, setLoadingProjects]);

  return [projects, setProjects];
};

export const EditPortfolio = withRouter(({ location: { pathname } }) => {
  let { projectType } = useParams();

  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [currentProject, setCurrentProject] = useState();
  const [projects, setProjects] = useGetProjects(
    setLoadingProjects,
    projectType
  );

  const [reorderMode, setReorderMode] = useState(false);

  const reorderProject = (index, direction) => {
    const currentProjectId = projects[index].id;
    const currentProjectCreatedDate = projects[index].createdAt;
    const nextProject = projects[direction === "up" ? index - 1 : index + 1];
    const nextProjectId = nextProject.id;
    const nextProjectCreatedDate = nextProject.createdAt;

    setProjects(
      projects
        .map((project) => {
          if (project.id === currentProjectId) {
            return {
              ...project,
              createdAt: nextProjectCreatedDate,
            };
          }

          if (project.id === nextProjectId) {
            return {
              ...project,
              createdAt: currentProjectCreatedDate,
            };
          }

          return project;
        })
        .sort(sortProjects)
    );
  };

  const saveProjectsOrder = (projects) => {
    setLoadingProjects(true);
    reorderProjects({ projects }).then(() => {
      setLoadingProjects(false);
    });
  };

  return (
    <div className="edit-portfolio">
      <div className="tabs-header portfolio-tab-header">
        <Link to="/admin/edit-portfolio/residential">
          <TabsHeaderButton
            label={"Residential"}
            selected={isTabSelected(pathname, "residential")}
          />
        </Link>
        <Link to="/admin/edit-portfolio/commercial">
          <TabsHeaderButton
            label={"Commercial"}
            selected={isTabSelected(pathname, "commercial")}
          />
        </Link>
      </div>
      <div className="tabs-body edit-portfolio-tabs-body">
        <div className="edit-portfolio-tabs-body__actions">
          <button
            className="add-project-button"
            onClick={() => {
              setCurrentProject(null);
              setShowEditProjectModal(true);
            }}
          >
            add project
          </button>
          <button
            className="reorder-projects-button"
            onClick={() => {
              if (reorderMode) {
                saveProjectsOrder(projects);
              }

              setReorderMode(!reorderMode);
            }}
          >
            {reorderMode ? "save order" : "reorder projects"}
          </button>
        </div>

        <div className="edit-portfolio__projects-container">
          {projects.map((project, index) => {
            const {
              id,
              title,
              coverImageUrl,
              description,
              tags,
              imgs,
            } = project;
            return (
              <div key={id} className="edit-portfolio__project">
                {reorderMode && (
                  <div className="edit-portfolio__project__reorder-buttons">
                    {index !== 0 && (
                      <img
                        src="/svg/up-arrow.svg"
                        alt="up-arrow"
                        className="edit-portfolio__project__reorder-buttons__button"
                        onClick={() => reorderProject(index, "up")}
                      />
                    )}

                    {index !== projects.length - 1 && (
                      <img
                        src="/svg/down-arrow.svg"
                        alt="down-arrow"
                        className="edit-portfolio__project__reorder-buttons__button"
                        onClick={() => reorderProject(index, "down")}
                      />
                    )}
                  </div>
                )}

                <ProjectBox
                  key={id}
                  id={id}
                  title={title}
                  coverUrl={coverImageUrl}
                  description={description}
                  tags={tags}
                  openEditModal={() => {
                    setShowEditProjectModal(true);
                    setCurrentProject(project);
                  }}
                  showDeleteProjectModal={() => {
                    setCurrentProject(project);
                    setShowDeleteProjectModal(true);
                  }}
                  imgs={imgs}
                  refetchProjects={() =>
                    getProject(projectType, setProjects, setLoadingProjects)
                  }
                />
              </div>
            );
          })}
        </div>
        <Loading show={loadingProjects} />
      </div>
      <UpdateProjectModal
        show={showEditProjectModal}
        hideModal={() => {
          setCurrentProject(null);
          setShowEditProjectModal(false);
        }}
        type={projectType}
        currentProject={currentProject}
        reFetchProjects={() =>
          getProject(projectType, setProjects, setLoadingProjects)
        }
      />
      <DeleteProjectModal
        show={showDeleteProjectModal}
        hide={() => {
          setCurrentProject(null);
          setShowDeleteProjectModal(false);
        }}
        projectId={currentProject && currentProject.id}
        projectTitle={currentProject && currentProject.title}
        reFetchProjects={() =>
          getProject(projectType, setProjects, setLoadingProjects)
        }
      />
    </div>
  );
});
