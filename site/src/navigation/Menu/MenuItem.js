import React from "react";
import { Link, withRouter } from "react-router-dom";
import { mergeCssClass } from "../../utils/helpers";

import "./MenuItem.css";

export const MenuItem = withRouter(
  ({ path, label, location: { pathname }, hideMenu }) => {
    const [firstLetter, rest] = label.split("").reduce((acc, letter, index) => {
      if (index === 0) {
        acc.push(letter);
      } else {
        acc[1] = acc[1] ? acc[1] + letter : letter;
      }

      return acc;
    }, []);

    return (
      <div
        className={mergeCssClass(
          "menu-item",
          pathname === path && "menu-item--selected"
        )}
        onClick={hideMenu}
      >
        <img src="/svg/arrows-orange.svg" alt="arrows" />
        <Link to={path}>
          <p>
            <span>{firstLetter}</span>
            {rest}
          </p>
        </Link>
      </div>
    );
  }
);
