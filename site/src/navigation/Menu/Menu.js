import React, { useEffect, useState } from "react";
import { mergeCssClass } from "../../utils/helpers";

import "./Menu.css";
import { MenuItem } from "./MenuItem";

const pages = [
  {
    path: "/",
    label: "HOME",
  },
  {
    path: "/about",
    label: "ABOUT US",
  },
];

const useOnScroll = () => {
  const [textColor, setTextColor] = useState("white");
  const [onFooter, setOnFooter] = useState(false);

  const onScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const finalPosition = document.documentElement.scrollHeight;

    if (scrollPosition > window.innerHeight + 30 * pages.length) {
      setTextColor("black");
    } else {
      setTextColor("white");
    }

    if (scrollPosition > finalPosition - 140) {
      window.requestAnimationFrame(() => {
        setOnFooter(scrollPosition - (finalPosition - 140));
      });
    } else {
      window.requestAnimationFrame(() => {
        setOnFooter(0);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, []);

  return [textColor, onFooter];
};

const getCssClassTextColor = (textColor) => {
  if (textColor === "white") return "menu--white";

  return "menu--black";
};

export const Menu = () => {
  const [textColor, onFooter] = useOnScroll();

  return (
    <div
      className={mergeCssClass("menu", getCssClassTextColor(textColor))}
      style={{ transform: `translateY(-${onFooter}px)` }}
    >
      {pages.map(({ path, label }) => (
        <MenuItem key={path} path={path} label={label} />
      ))}
    </div>
  );
};

export default Menu;
