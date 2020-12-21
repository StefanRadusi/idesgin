import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
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
  {
    path: "/portfolio",
    label: "PORTFOLIO",
  },
  {
    path: "/services",
    label: "SERVICES",
  },
  {
    path: "/contact",
    label: "CONTACT",
  },
];

const useOnScroll = () => {
  const [textColor, setTextColor] = useState("white");
  const [onFooter, setOnFooter] = useState(false);

  const onScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const finalPosition = document.documentElement.scrollHeight;

    const offset = window.innerWidth <= 414 ? 80 : 140;

    if (
      window.innerWidth >= 414 &&
      scrollPosition > window.innerHeight + 43 * pages.length
    ) {
      setTextColor("black");
    } else {
      setTextColor("white");
    }

    if (scrollPosition > finalPosition - offset) {
      window.requestAnimationFrame(() => {
        setOnFooter(scrollPosition - (finalPosition - offset));
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

export const Menu = withRouter(({ location: { pathname } }) => {
  const [textColor, onFooter] = useOnScroll();
  const [showMenu, setShowMenu] = useState(false);

  const isAdmin = pathname.includes("admin");
  const isContact = pathname.includes("contact");

  const menuRef = useRef();

  const handleClickOutside = ({ target }) => {
    if (target && menuRef.current && !menuRef.current.contains(target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    !isAdmin && (
      <React.Fragment>
        <div
          className={mergeCssClass(
            "menu",
            getCssClassTextColor(textColor),
            isContact && "menu-contact-page"
          )}
          style={{ transform: `translateY(-${onFooter}px)` }}
          ref={menuRef}
        >
          <div
            className={mergeCssClass(
              "menu-inner",
              showMenu && "menu-inner--active"
            )}
          >
            {pages.map(({ path, label }) => (
              <MenuItem
                key={path}
                path={path}
                label={label}
                hideMenu={() => setShowMenu(false)}
              />
            ))}
          </div>
          <div
            className={mergeCssClass(
              "menu__burger-button",
              showMenu && "menu__burger-button--hide"
            )}
            onClick={() => setShowMenu(true)}
          >
            <img src="/svg/menu.svg" alt="menu button" />
          </div>
        </div>
      </React.Fragment>
    )
  );
});

export default Menu;
