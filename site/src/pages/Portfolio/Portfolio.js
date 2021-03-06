import React from "react";
import { Footer } from "../../common/Footer";

import "./Portfolio.css";
import { PortfolioCover } from "./PortfolioCover";
import { PortfolioProjects } from "./PortfolioProjects";

export const Portfolio = ({ setProject }) => {
  return (
    <div className="page portfolio">
      <PortfolioCover />
      <PortfolioProjects setProject={setProject} />
      <Footer />
    </div>
  );
};
