import React from "react";
import { mergeCssClass } from "../../../../utils/helpers";

import "./PortfolioProjectsHeader.css";

export const PortfolioProjectsHeader = ({ type, onClick }) => {
  return (
    <div className="portfolio-projects-header">
      <div className="portfolio-projects-header__buttons">
        <div
          className={mergeCssClass(
            "portfolio-projects-header__buttons__circle",
            type === "commercial" &&
              "portfolio-projects-header__buttons__circle--to-right"
          )}
        />
        <div
          className={mergeCssClass(
            "portfolio-projects-header__button",
            "portfolio-projects-header__button__residential",
            type === "residential" &&
              "portfolio-projects-header__button--selected"
          )}
          onClick={() => onClick("residential")}
        >
          RESIDENTIAL
        </div>
        <div
          className={mergeCssClass(
            "portfolio-projects-header__button",
            "portfolio-projects-header__button__commercial",
            type === "commercial" &&
              "portfolio-projects-header__button--selected"
          )}
          onClick={() => onClick("commercial")}
        >
          COMMERCIAL
        </div>
      </div>
    </div>
  );
};
