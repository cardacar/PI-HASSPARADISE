import React, { Fragment } from "react";
import Login from "../pages/Login";
import NavBar from "../components/SideBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Admin from  '../pages/Admin'

const Routes = () => {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Routes;
