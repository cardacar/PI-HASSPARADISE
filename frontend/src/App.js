import React, { Fragment } from "react";
import "./App.css";
import { CssBaseline } from "@material-ui/core";
import Navbar from './components/SideBar/NavBar'
const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <div className="App">
        <Navbar/>
      </div>
    </Fragment>
  );
};

export default App;
