import React from "react";
import { Link } from "react-router-dom";
import { mergeCssClass } from "../../utils/helpers";

import "./FindMore.css";

export const FindMore = ({ text, className, path }) => {
  const [firstWord, restText] = text.split(" ").reduce((acc, word, index) => {
    if (index === 0) {
      acc.push(word);
    } else {
      acc[1] = acc[1] ? `${acc[1]} ${word}` : word;
    }

    return acc;
  }, []);

  return (
    <div className={mergeCssClass("find-more-container", className)}>
      <Link to={path}>
        <div className="find-more">
          <img
            className="find-more__arrows"
            src="/svg/arrows.svg"
            alt="arrows"
          />
          <p className="find-more__text">
            <span>{firstWord}</span> {restText}
          </p>
        </div>
      </Link>
    </div>
  );
};
