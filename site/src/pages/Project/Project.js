import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { Footer } from "../../common/Footer";
import { PageCover } from "../../common/PageCover";
import { ProjectImgs } from "./ProjectImgs";

export const Project = withRouter(({ project }) => {
  let { title } = useParams();
  const { coverImageUrl, title: projectTitle, description, imgs } =
    project || {};
  console.log(title, project);

  return (
    <div className="project-page page">
      <PageCover
        src={coverImageUrl}
        backText="PROJECT"
        frontText={projectTitle && projectTitle.toUpperCase()}
        description={description}
      />
      <ProjectImgs imgs={imgs} />
      <Footer />
    </div>
  );
});
