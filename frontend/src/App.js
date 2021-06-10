import React, { Fragment,/* useState, useEffect */} from "react";
import "./App.css";
import Navbar from "./components/SideBar/NavBar";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import Login from "./components/FormLogin";
import {ThemeProvider} from '@material-ui/core'
import palette from './styles/PaletteColors'

const App = () => {
  


  return (
    <Fragment>
      <ThemeProvider theme={palette} >

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
            </ThemeProvider>
    </Fragment>
  );
};

export default App;
