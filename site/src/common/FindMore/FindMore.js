import React from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./FindMore.css";

export const FindMore = ({ text, className }) => {
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
      <div className="find-more">
        <img className="find-more__arrows" src="/svg/arrows.svg" alt="arrows" />
        <p className="find-more__text">
          <span>{firstWord}</span> {restText}
        </p>
      </div>
    </div>
  );
};
