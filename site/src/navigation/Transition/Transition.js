import React, { useEffect, useRef, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./Transition.css";

export const Transition = ({ match, children }) => {
  const [onLeft, setOnLeft] = useState(false);
  const [onRight, setOnRight] = useState(!match);
  const [hide, setHide] = useState(!match);

  const pageRef = useRef();

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (match) {
      setHide(false);
      setTimeout(() => {
        setOnRight(false);
      }, 100);
    } else if (!onRight) {
      setTimeout(() => {
        setOnLeft(true);
      }, 100);
      setTimeout(() => {
        setHide(true);
        setOnLeft(false);
        setOnRight(true);
      }, 700);
    }
  }, [match]);

  return (
    <div
      className={mergeCssClass(
        "transition-container",
        onRight && "transition-container--right",
        onLeft && "transition-container--left"
      )}
      style={{ display: hide ? "none" : "block" }}
      ref={pageRef}
    >
      {children}
    </div>
  );
};
