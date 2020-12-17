import React from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./ImgPreviewer.css";

export const ImgPreviewer = ({ currentImgUrlPreview, onClose }) => {
  return (
    currentImgUrlPreview && (
      <div className={mergeCssClass("img-previewer-container")}>
        <img src={currentImgUrlPreview} />
        <button className="img-previewer-container__close" onClick={onClose}>
          X
        </button>
      </div>
    )
  );
};
