import React, { useEffect, useRef, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./CircleEffect.css";

const DEFAULT_RANGE = 300;

const onScroll = (compRef, setScaleValue, position, breakpoint) => {
  return () => {
    if (compRef && compRef.current) {
      const { top, height, bottom } = compRef.current.getBoundingClientRect();

      let x = top + height * 0.5;
      if (position === "right-bottom") {
        x = bottom - height / 2 - (breakpoint || 1300);
      }

      const scaleValue =
        Math.floor(((x - DEFAULT_RANGE) / -DEFAULT_RANGE) * 100) / 100;

      window.requestAnimationFrame(() => {
        if (scaleValue > 0 && scaleValue <= 1) {
          setScaleValue(scaleValue);
        } else if (scaleValue <= 0) {
          setScaleValue(0);
        } else {
          setScaleValue(1);
        }
      });
    }
  };
};

const getCssClassByPosition = (position) => {
  switch (position) {
    case "right-bottom":
      return "circle__position--right-bottom";

    default:
      return null;
  }
};

export const CircleEffect = ({ position, width, breakpoint }) => {
  const [scaleValue, setScaleValue] = useState(0);

  const compRef = useRef(null);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      onScroll(compRef, setScaleValue, position, breakpoint)
    );
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, []);

  const translate =
    position === "right-bottom"
      ? "translate(60%, 60%)"
      : "translate(-60%, -60%)";

  return (
    <div
      ref={compRef}
      className={mergeCssClass("circle", getCssClassByPosition(position))}
      style={{ transform: `${translate} scale(${scaleValue})`, width: width }}
    />
  );
};
