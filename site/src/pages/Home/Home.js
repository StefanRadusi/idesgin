import React from "react";
import { Header } from "../../common/Header";
import { HomeCover } from "./HomeCover";
import { LatestProjects } from "./LatestProjects";
import { StepsWork } from "./StepsWork";
import { Footer } from "../../common/Footer";

import "./Home.css";

export const Home = () => {
  return (
    <div className="page home">
      <Header />
      <HomeCover />
      <LatestProjects />
      <StepsWork />
      <Footer />
    </div>
  );
};
