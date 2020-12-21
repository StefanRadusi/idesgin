import React, { useEffect, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./ImgPreviewer.css";

export const ImgPreviewer = ({
  currentImgUrlPreview,
  setCurrentImgUrlPreview,
}) => {
  const [active, setActive] = useState(false);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      setCurrentImgUrlPreview(null);
    }, 350);
  };

  useEffect(() => {
    if (currentImgUrlPreview) {
      setActive(true);
    }
  }, [currentImgUrlPreview]);

  return (
    <div
      className={mergeCssClass(
        "img-previewer-container",
        active && "img-previewer-container--active"
      )}
    >
      <img src={currentImgUrlPreview} alt="img preview" />
      <button className="img-previewer-container__close" onClick={handleClose}>
        X
      </button>
    </div>
  );
};
