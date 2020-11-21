import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

import "./App.css";

export const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/admin" component={Admin} />
  </Router>
);
