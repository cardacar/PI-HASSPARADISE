import React, { Fragment,/* useState, useEffect */} from "react";
import "./App.css";
import Navbar from "./components/SideBar/NavBar";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import Login from "./components/FormLogin";


const App = () => {
  


  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Login />} />
          <Route
            exact
            path="/admin"
            component={() => <Navbar />}
          />
          <Route
            exact
            path="/admin/Fertilizacion"
            component={() => <Navbar />}
          />
          <Route
            exact
            path="/admin/LaboresCultivo"
            component={() => <Navbar />}
          />
          <Route
            exact
            path="/admin/Fumigacion"
            component={() => <Navbar />}
          />
          <Route
            exact
            path="/admin/Inventario"
            component={() => <Navbar />}
          />
          <Route
            exact
            path="/admin/Precipitacion"
            component={() => <Navbar />}
          />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
