import React, { useEffect, useRef } from "react";
import { HomeCover } from "./HomeCover";
import { LatestProjects } from "./LatestProjects";
import { StepsWork } from "./StepsWork";
import { Footer } from "../../common/Footer";

import "./Home.css";

export const Home = ({ setProject }) => {
  const pageRef = useRef();

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="page home" ref={pageRef}>
      <HomeCover />
      <LatestProjects setProject={setProject} />
      <StepsWork />
      <Footer />
    </div>
  );
};
