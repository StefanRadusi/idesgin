import React, { useEffect, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./CircleEffect.css";

const onScroll = (parentRef, setScaleValue) => {
  return () => {
    if (parentRef && parentRef.current) {
      const { top } = parentRef.current.getBoundingClientRect();
      console.log(top);

      const scaleValue = Math.floor((-(top - 600) / 500) * 100) / 100;

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

export const CircleEffect = ({ position, parentRef }) => {
  const [scaleValue, setScaleValue] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", onScroll(parentRef, setScaleValue));
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={mergeCssClass("circle", getCssClassByPosition(position))}
      style={{ transform: `scale(${scaleValue})` }}
    />
  );
};
