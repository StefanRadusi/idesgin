import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Admin } from "./pages/Admin";

import "./App.css";
import Menu from "./navigation/Menu/Menu";
import { Transition } from "./navigation/Transition";
import { Header } from "./common/Header";
import { Portfolio } from "./pages/Portfolio/Portfolio";
import { Project } from "./pages/Project";

export const App = () => {
  const [project, setProject] = useState(null);

  return (
    <React.Fragment>
      <div className="router-container">
        <Router>
          <Header />
          <Menu />

          <Route
            path="/"
            exact
            children={(props) => (
              <Transition {...props}>
                <Home />
              </Transition>
            )}
          />
          <Route
            path="/about"
            children={(props) => (
              <Transition {...props}>
                <AboutUs />
              </Transition>
            )}
          />
          <Route
            path="/portfolio"
            children={(props) => (
              <Transition {...props}>
                <Portfolio setProject={setProject} />
              </Transition>
            )}
          />

          <Route
            path="/project/:title"
            children={(props) => (
              <Transition {...props}>
                <Project project={project} />
              </Transition>
            )}
          />

          <Route
            path="/admin"
            children={(props) => (
              <Transition {...props}>
                <Admin />
              </Transition>
            )}
          />
        </Router>
      </div>
    </React.Fragment>
  );
};
