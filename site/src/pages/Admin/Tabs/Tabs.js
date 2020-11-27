import React, { useEffect } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { EditPortfolio } from "../EditPortfolio";

import "./Tabs.css";
import { TabsHeaderButton } from "./TabsHeaderButton";

export function isTabSelected(path, buttonName) {
  return path.includes(buttonName);
}

export const Tabs = withRouter(({ location: { pathname }, history }) => {
  useEffect(() => {
    if (pathname === "/admin" || pathname === "/admin/") {
      history.push("/admin/edit-portfolio");
    }
  }, [pathname, history]);

  return (
    <div className="tabs">
      <div className="tabs-header">
        <Link to="/admin/edit-portfolio">
          <TabsHeaderButton
            label={"Portfolio"}
            selected={isTabSelected(pathname, "edit-portfolio")}
          />
        </Link>

        <Link to="/admin/edit-staff">
          <TabsHeaderButton
            label={"Staff"}
            selected={isTabSelected(pathname, "edit-staff")}
          />
        </Link>

        <Link to="/admin/edit-contact">
          <TabsHeaderButton
            label={"Contact"}
            selected={isTabSelected(pathname, "edit-contact")}
          />
        </Link>
      </div>
      <div className="tabs-body">
        <Route path="/admin/edit-portfolio" component={EditPortfolio} />
      </div>
    </div>
  );
});
