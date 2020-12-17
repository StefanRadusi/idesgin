import React from "react";
import { withImgPreviewer } from "../../../common/ImgPreviewer/ImgPreviewerContext";

import "./ProjectImgs.css";

export const ProjectImgs = withImgPreviewer(
  ({ imgs, setCurrentImgUrlPreview }) => {
    return imgs ? (
      <div className="project-page__project-imgs-container">
        <div className="project-page__project-imgs-container__circle" />
        <div className="project-page__project-imgs">
          {imgs.map((img) => (
            <div
              key={img}
              className="project-page__project-imgs__item"
              onClick={() => setCurrentImgUrlPreview(img)}
            >
              <img src={img} alt="project pic" />
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
);
