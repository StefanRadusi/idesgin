import React, { useState } from "react";
import { Loading } from "../../../../../common/Loading";
import { addImageToProject } from "../../../../../utils/api";
import { mergeCssClass, resizeImg } from "../../../../../utils/helpers";
import { UploadButton } from "../../UploadButton/UploadButton";

import "./ProjectImgs.css";

const handleUploadImg = (setLoading, projectId, refetchProjects) => {
  return async ({ target }) => {
    const [file] = target.files;
    if (file) {
      const image = await resizeImg(file);

      const [, imgData] = image.split(",");

      const payload = {
        projectId,
        imgData,
        imgType: file.type,
      };

      setLoading(true);
      addImageToProject(payload)
        .then(() => {
          setLoading(false);
          refetchProjects();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
};

export const ProjectImgs = ({ projectId, imgs, refetchProjects }) => {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={mergeCssClass(
        "project-imgs",
        collapsed && "project-imgs--collapsed"
      )}
    >
      <div
        className="project-imgs__show-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        <img
          src="/svg/picture.svg"
          alt="project img"
          className="project-imgs__show-button__img"
        />

        <img
          src="/svg/arrow.svg"
          alt="arrow"
          className={mergeCssClass(
            "project-imgs__show-button__arrow",
            collapsed && "project-imgs__show-button__arrow--collapsed"
          )}
        />
      </div>

      {!collapsed && (
        <div className="project-imgs__container">
          <div className="project-imgs__container_inner">
            <UploadButton
              onChange={handleUploadImg(setLoading, projectId, refetchProjects)}
            />
            {imgs &&
              imgs.length &&
              imgs.map((src) => (
                <div
                  key={src}
                  className="project-imgs__container_img-container"
                >
                  <img
                    src={src}
                    className="project-imgs__container_img"
                    alt="project img"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <Loading show={loading} />
    </div>
  );
};
