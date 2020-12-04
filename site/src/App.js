import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

import "./App.css";
import { Loading } from "./common/Loading";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      <Loading show={loading} white />
      <div className="router-container" style={{ opacity: loading ? 0 : 1 }}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
        </Router>
      </div>
    </React.Fragment>
  );
};
