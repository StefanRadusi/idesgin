import React from "react";
import { mergeCssClass } from "../../../utils/helpers";

import "./TabsHeaderButton.css";

export const TabsHeaderButton = ({ selected, label }) => {
  return (
    <div
      className={mergeCssClass(
        "tabs-header-button",
        selected && "tabs-header-button--selected"
      )}
    >
      <p className="tabs-header-button__text">{label}</p>
    </div>
  );
};
