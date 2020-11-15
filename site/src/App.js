import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Auth from "./pages/Auth/Auth";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { Home } from "./pages/Home";
// import { getSession } from "./utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // console.log(getSession())
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route component={Home} />
        </Switch>
      </Router>
    );
  }
}

/**
 * A component to protect routes.
 * Shows Auth page if the user is not authenticated
//  */
// const PrivateRoute = ({ component, ...options }) => {
//   const session = getSession();

//   const finalComponent = session ? Dashboard : Home;
//   return <Route {...options} component={finalComponent} />;
// };
