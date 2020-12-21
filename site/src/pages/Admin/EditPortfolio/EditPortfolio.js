import React, { useEffect, useState } from "react";

import "./EditPortfolio.css";
import { Link, useParams, withRouter } from "react-router-dom";
import { TabsHeaderButton } from "../Tabs/TabsHeaderButton";
import { isTabSelected } from "../Tabs";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { Loading } from "../../../common/Loading";
import { getProjectsByType } from "../../../utils/api";
import { ProjectBox } from "./ProjectBox";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";

const getProject = (type, setProjects, setLoadingProjects) => {
  setLoadingProjects(true);
  getProjectsByType(type)
    .then((response) => {
      console.log(response);
      const { projects } = response || {};
      setProjects(
        (projects || []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );

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
        <button
          className="add-project-button"
          onClick={() => {
            setCurrentProject(null);
            setShowEditProjectModal(true);
          }}
        >
          add project
        </button>

        <div className="edit-portfolio__projects-container">
          {projects.map((project) => {
            const {
              id,
              title,
              coverImageUrl,
              description,
              tags,
              imgs,
            } = project;
            return (
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
