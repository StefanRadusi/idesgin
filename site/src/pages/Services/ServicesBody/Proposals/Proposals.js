import React from "react";

import "./Proposals.css";

const proposals = [
  {
    title: "Proposal 1",
    subTitle: "INTERIOR DESIGN PROJECT",
    description:
      "- concept, sketches, mood boards, 3D renderings and estimation",
    src: "/img/proposal1.png",
  },
  {
    title: "Proposal 2",
    subTitle: "INTERIOR DESIGN PROJECT + SITE MANAGEMENT",
    description:
      "- concept, sketches, mood boards, 3D renderings, estimation, retailer shop visits and site management",
    src: "/img/proposal2.png",
  },
  {
    title: "Proposal 3",
    subTitle: "FULL HOUSE",
    description:
      "- everything from design concept to buying the necessary materials and objects so that you only come in and start enjoying it",
    src: "/img/proposal3.png",
  },
];

export const Proposals = () => {
  return (
    <div className="proposals">
      {proposals.map(({ src, title, subTitle, description }, index) => (
        <div key={index} className="proposals__proposal">
          <img className="proposals__proposal__cover" src={src}></img>
          <h3 className="proposals__proposal__title">{title}</h3>
          <div className="proposals__proposal__text">
            <p className="proposals__proposal__sub-title">{subTitle}</p>
            <p className="proposals__proposal__description">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
