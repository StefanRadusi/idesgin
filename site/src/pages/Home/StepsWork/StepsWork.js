import React, { useRef } from "react";
import { StepsWorkThumbs } from "./StepsWorkThumbs/StepsWorkThumbs";

import "./StepsWork.css";
import { CircleEffect } from "../../../common/CircleEffect";
import { FindMore } from "../../../common/FindMore";

const steps = [
  {
    url: "/img/space.jpg",
    title: "Space planning",
    description: "Shape forming.",
  },
  {
    url: "/img/concept.jpg",
    title: "Concept development",
    description:
      "Determining the best interior style for you. Developing the design concept.",
  },
  {
    url: "/img/product.jpg",
    title: "Product selection & buying",
    description: "Selection of the appropriate items and products required. ",
  },
  {
    url: "/img/project.jpg",
    title: "Project implementation",
    description: "Managing every stage of the interior design process.",
  },
];

export const StepsWork = () => {
  const compRef = useRef(null);

  return (
    <div className="steps-work-home-container" ref={compRef}>
      <CircleEffect
        position="right-bottom"
        parentRef={compRef}
        width="150%"
        breakpoint={1500}
      />
      <div className="steps-work-home">
        <div className="steps-work-home__thumbs">
          {steps.map((step) => (
            <StepsWorkThumbs key={step.title} {...step} />
          ))}
        </div>
        <div className="steps-work-home__title">
          <div className="steps-work-home__title__text-container">
            <p className="steps-work-home__title__text">HOW DO WE WORK</p>
            <p className="steps-work-home__title__sub-text">
              A strategic playground of shapes and colors chosen with care for
              the environment and economical sustainability, working together
              with local providers as much as possible. Designed homes that
              mirrors and shelters each and every lifestyle.
            </p>
            <FindMore
              text="CHECK OUT OUR WORKING PROCES"
              className="steps-work-home__find-more"
              path="/services"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
