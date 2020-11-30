import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { mergeCssClass } from "../../utils/helpers";
import { random } from "lodash";

import "./Loading.css";

const cubeFaces = [
  "show-front",
  "show-right",
  "show-back",
  "show-left",
  "show-top",
  "show-bottom",
];

const getRandomCubeFace = (currentCubeFace) => {
  let cubeFace = cubeFaces[random(0, cubeFaces.length)];
  while (currentCubeFace === cubeFace) {
    cubeFace = cubeFaces[random(0, cubeFaces.length)];
  }
  return cubeFace;
};

export const Loading = ({ show }) => {
  const [cubeFace, setCubeFace] = useState("show-front");
  const [loadingCssState, setLoadingCssState] = useState("");
  const interval = useRef();

  useEffect(() => {
    if (show) {
      setLoadingCssState("render-loading");
      setTimeout(() => {
        setLoadingCssState("render-loading show-loading");
        setCubeFace(getRandomCubeFace(cubeFace));
      }, 10);

      interval.current = setInterval(() => {
        setCubeFace(getRandomCubeFace(cubeFace));
      }, 700);
    } else if (!show && interval.current) {
      clearInterval(interval.current);
      setLoadingCssState("render-loading");
      setTimeout(() => {
        setLoadingCssState("");
      }, 350);
    }

    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div className={mergeCssClass("loading-overlay", loadingCssState)}>
      <div className="loading">
        <div className={mergeCssClass("cube", cubeFace)}>
          <div className="cube__face cube__face--front" />
          <div className="cube__face cube__face--back" />
          <div className="cube__face cube__face--right" />
          <div className="cube__face cube__face--left" />
          <div className="cube__face cube__face--top" />
          <div className="cube__face cube__face--bottom" />
        </div>
      </div>
    </div>
  );
};
