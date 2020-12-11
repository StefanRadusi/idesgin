import React from "react";
import { mergeCssClass } from "../../../../utils/helpers";

import "./Steps.css";

const steps = [
  {
    title: "CONSULTANCY",
    description:
      "getting to know each other, learning about client’s preferences and the design studio’s background.",
    img: "/img/step1.png",
  },
  {
    title: "MEET THE SPACE",
    description:
      "this step is when the studio measures and takes notes and photos of the actual object of their work - the space!",
    img: "/img/step2.png",
  },
  {
    title: "ADMINISTRATIVE ",
    description:
      "all of the legal paperworks that need to be done so this collab is perfectly aligned with the law.",
    img: "/img/step3.png",
  },
  {
    title: "PROJECT - CONCEPT",
    description:
      "we think about a design that suits best your desires, this stage results in initial sketches and mood boards to help you understand the first glimpse of your future interior",
    img: "/img/step4.png",
  },
  {
    title: "PROJECT - RENDERINGS",
    description:
      "we proceed to 3D renderings which reflect the future interior in the most accurate way possible - you will get pictures of every room we design in different perspectives so that you can see the whole ensemble",
    img: "/img/step5.png",
  },
  {
    title: "PROJECT - ESTIMATION",
    description:
      "after you approved the final design we move forward and prepare an estimation for every material and object we proposed in your design. This comes with prices, quantities, places where you can find them and offers from suppliers when it comes to custom made things",
    img: "/img/step6.png",
  },
  {
    title: "PROJECT - SHOP WITH THE CLIENT",
    description:
      "this stage is available only if you choose PROPOSAL 2/OFFER 2/DEAL 2 here we assist you to various shops and retailers.",
    img: "/img/step7.png",
  },
  {
    title: "PROJECT - SITE MANAGEMENT",
    description:
      "this stage is available only if you choose PROPOSAL 2/OFFER 2/DEAL 2 - we provide assistance and all the materials and information the site crew needs from us in order to make sure that things fall in place as we designed them.",
    img: "/img/step8.png",
  },
  {
    title: "PROJECT - PHOTO SESSION",
    img: "/img/step9.png",
  },
];

export const Steps = () => {
  return (
    <div className="steps">
      {steps.map(({ img, title, description }, index) => {
        const isOnLeft = index % 2 === 1;
        const isFinal = index === steps.length - 1;

        return (
          <div
            key={index}
            className={mergeCssClass(
              "steps__step",
              isOnLeft && "steps__step--on-left"
            )}
          >
            <div className="steps__step__blank">
              {index === 0 && (
                <h2 className="steps__step__title">
                  <span>SO, </span>WHAT IF WE WORK TOGETHER?
                </h2>
              )}
            </div>
            <img src={img} className="steps__step__img" />
            <div className="steps__step__text">
              <h3 className="steps__step__text__title">
                {isFinal ? "FINAL STEP" : `STEP ${`${index + 1}`}`}
              </h3>
              <p className="steps__step__text__sub-title">{title}</p>
              <p className="steps__step__text__description">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
