import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin/Admin";

import "./App.css";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/admin" exact component={Admin} />
    </Switch>
  </Router>
);
