import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Admin } from "./pages/Admin";

import { Loading } from "./common/Loading";

import "./App.css";
import Menu from "./navigation/Menu/Menu";
import { Transition } from "./navigation/Transition";
import { Header } from "./common/Header";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      {/* <Loading show={loading} white /> */}

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
