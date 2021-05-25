import React, { Fragment,/*  useState, useEffect */ } from "react";
import "./App.css";
import Navbar from "./components/SideBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/FormLogin";

const App = () => {
  /* const [status, setStatus] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const logInToken = window.localStorage.getItem("logInUser");
    if (logInToken != "") {
      setStatus(true);
      console.log(status);
    }
  }, []); */

  return (
    <Fragment>
      <Router>
        <Switch>
          
          <Route exact path="/" component={()=><Login authorization={true} />} />
          <Route
            exact
            path="/admin"
            component={() => <Navbar authorization={true} />}
          />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
