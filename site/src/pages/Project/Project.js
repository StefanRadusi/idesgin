import React, { useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { Footer } from "../../common/Footer";
import { Loading } from "../../common/Loading";
import { PageCover } from "../../common/PageCover";
import { getProjectsById } from "../../utils/api";
import { ProjectImgs } from "./ProjectImgs";

export const Project = withRouter(({ project, setProject }) => {
  let { id } = useParams();
  const { coverImageUrl, title: projectTitle, description, imgs } =
    project || {};

  useEffect(() => {
    if (id) getProjectsById(id).then(({ project }) => setProject(project));
  }, [id, setProject]);

  return (
    <div className="project-page page">
      <PageCover
        src={coverImageUrl}
        backText="PROJECT"
        frontText={projectTitle && projectTitle.toUpperCase()}
        description={description}
        delay={project ? undefined : 1}
      />
      <ProjectImgs imgs={imgs} />
      <Footer />
      <Loading show={!project} />
    </div>
  );
});
