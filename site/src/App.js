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
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { ImgPreviewer } from "./common/ImgPreviewer";
import { ImgPreviewerContext } from "./common/ImgPreviewer/ImgPreviewerContext";

export const App = () => {
  const [project, setProject] = useState(null);
  const [currentImgUrlPreview, setCurrentImgUrlPreview] = useState(null);

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
                <Home setProject={setProject} />
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
            path="/project/:id"
            children={(props) => (
              <Transition {...props}>
                <ImgPreviewerContext.Provider value={setCurrentImgUrlPreview}>
                  <Project project={project} setProject={setProject} />
                </ImgPreviewerContext.Provider>
              </Transition>
            )}
          />

          <Route
            path="/services"
            children={(props) => (
              <Transition {...props}>
                <Services />
              </Transition>
            )}
          />

          <Route
            path="/contact"
            children={(props) => (
              <Transition {...props}>
                <Contact />
              </Transition>
            )}
          />

          <Route
            path="/admin"
            children={(props) => (
              <Transition {...props}>
                <ImgPreviewerContext.Provider value={setCurrentImgUrlPreview}>
                  <Admin />
                </ImgPreviewerContext.Provider>
              </Transition>
            )}
          />
        </Router>
        <ImgPreviewer
          currentImgUrlPreview={currentImgUrlPreview}
          onClose={() => setCurrentImgUrlPreview(null)}
        />
      </div>
    </React.Fragment>
  );
};
