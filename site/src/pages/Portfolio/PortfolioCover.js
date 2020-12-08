import React from "react";
import { PageCover } from "../../common/PageCover";

const getCoverSrc = (type) => {
  return "/img/residential.jpg";
};

export const PortfolioCover = ({ type }) => {
  return (
    <PageCover
      src={getCoverSrc(type)}
      backText="OUR"
      frontText="PORTFOLIO"
      description="iDesign Studio's mission is to design and implement functionally-aesthetically balanced spaces tailored to the client's personality traits."
    />
  );
};
