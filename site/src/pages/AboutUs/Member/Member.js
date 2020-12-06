import React from "react";
import { mergeCssClass } from "../../../utils/helpers";

import "./Member.css";

export const Member = ({
  coverImageUrl,
  name,
  description,
  author,
  orientation,
}) => {
  return (
    <div
      className={mergeCssClass(
        "staff-member",
        orientation === "right" && "staff-member--ort-right"
      )}
    >
      <div className="staff-member__cover-container">
        <div className="staff-member__cover">
          <img src={coverImageUrl} alt="staff cover" />
        </div>
      </div>

      <div className="staff-member__text">
        <div className="staff-member__text-container">
          <h3 className="staff-member__text__name">{name}</h3>
          <div className="staff-member__text__description-container">
            <p className="staff-member__text__description">{description}</p>
            <p className="staff-member__text__author"> - {author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
