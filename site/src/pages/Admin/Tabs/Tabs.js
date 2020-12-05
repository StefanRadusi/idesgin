import React from "react";
import { Link, Redirect, Route, withRouter } from "react-router-dom";
import { EditPortfolio } from "../EditPortfolio";
import { EditStaff } from "../EditStaff";

import "./Tabs.css";
import { TabsHeaderButton } from "./TabsHeaderButton";

export function isTabSelected(path, buttonName) {
  return path.includes(buttonName);
}

const shouldRedirect = (pathname) => {
  if (pathname === "/admin" || pathname === "/admin/") return true;

  return false;
};

export const Tabs = withRouter(({ location: { pathname } }) => {
  return (
    <div className="tabs">
      <div className="tabs-header">
        <Link to="/admin/edit-portfolio/residential">
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
        {shouldRedirect(pathname) ? (
          <Redirect to="/admin/edit-portfolio/residential" />
        ) : (
          <React.Fragment>
            <Route
              path="/admin/edit-portfolio/:projectType"
              component={EditPortfolio}
            />
            <Route path="/admin/edit-staff" component={EditStaff} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
});
