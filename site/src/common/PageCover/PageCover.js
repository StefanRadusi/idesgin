import React, { useEffect, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./PageCover.css";

export const PageCover = ({ src, backText, frontText, description, delay }) => {
  const [runAnimation, setRunAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRunAnimation(true);
    }, delay * 1000 || 0);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page-cover">
      <img src={src} alt="cover img" className="page-cover__img" />
      <div className="page-cover__overlay" />
      <div className="page-cover__title-container">
        <div
          className={mergeCssClass(
            "page-cover__back-text-container",
            runAnimation && "back-text-container-animation"
          )}
        >
          <p
            className={mergeCssClass(
              "page-cover__back-text",
              runAnimation && "back-text-animation"
            )}
          >
            {backText}
          </p>
        </div>
        <div
          className={mergeCssClass(
            "page-cover__front-text-container",
            runAnimation && "front-text-container-animation"
          )}
        >
          <p
            className={mergeCssClass(
              "page-cover__front-text",
              runAnimation && "front-text-animation"
            )}
          >
            {frontText}
          </p>
        </div>
        <p
          className={mergeCssClass(
            "page-cover__description",
            runAnimation && "description-animation"
          )}
        >
          {description}
        </p>
        <div
          className={mergeCssClass(
            "page-cover__line",
            runAnimation && "line-animation"
          )}
        />
      </div>
    </div>
  );
};

export default PageCover;
