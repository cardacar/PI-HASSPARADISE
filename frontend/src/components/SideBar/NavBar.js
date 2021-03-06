import React, { Fragment } from "react";
import { SidebarData, SidebarDataUser } from "./SidebarData";
//import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
//import palette from "../../styles/PaletteColors";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import Admin from "../../pages/AdminUsers/Admin";
import FertilizationPageCrud from "../../pages/FertilizationPage/FertilizationPageCrud";
import FumigationPageCrud from "../../pages/FumigationPage/FumigationPageCrud";
import SowingPageCrud from "../../pages/SowingPage/SowingPageCrud";
import Precipitacion from "../../pages/PrecipitacionPage/Precipitacion";
import WelcomePage from "../../pages/Welcome/WelcomePage";
import ReportPage from "../../pages/ReportPage/ReportPage";
import Inventory from '../../pages/InventoryPage/Inventory';

const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
    backgroundColor: "#334AB0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  row: {
    width: "100%",
    height: "3.125rem",
    listStyleType: "none",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#212F70",
    },
  },
  icons: {
    flex: "30%",
    display: "grid",
    placeItems: "center",
    color: "#000",
  },
  title: {
    flex: "60%",
  },
}));


const NavBar = () => {
  const styles = useStyle();
  const userRol = window.localStorage.getItem("rolUser");
  const side = userRol === "admin" ? SidebarData : SidebarDataUser;


  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex" }}>
          <Drawer
            style={{ width: "13.125rem" }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: styles.drawerPaper }}
          >
            <List>
              {side.map((val, key) => {
                return (
                  <Link to={val.link} key={key} className={styles.link}>
                    <ListItem button className={styles.row}>
                      <ListItemIcon className={styles.icons}>
                        {val.icon}
                      </ListItemIcon>
                      <ListItemText
                        className={styles.title}
                        primary={val.title}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Drawer>
          <Switch>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route
              exact
              path="/admin/Fertilizacion"
              component={() => <FertilizationPageCrud userRol={userRol}/>}
            />

            <Route exact path="/user/Fertilizacion">
              <FertilizationPageCrud userRol={userRol}/>
            </Route>
            <Route exact path="/home">
              <WelcomePage />
            </Route>
            <Route exact path="/admin/Siembra" >
              <SowingPageCrud userRol={userRol}/>
            </Route>
            <Route exact path="/user/Siembra" >
              <SowingPageCrud userRol={userRol}/>
            </Route>
            <Route exact path="/admin/Fumigacion" >
              <FumigationPageCrud userRol={userRol}/>
            </Route>
            <Route exact path="/user/Fumigacion" >
              <FumigationPageCrud userRol={userRol}/>
            </Route>
            <Route exact path="/admin/Inventario"  >
              <Inventory userRol={userRol}/>
            </Route>
            <Route exact path="/admin/Reportes" >
              <ReportPage userRol={userRol}/>
            </Route>
            <Route exact path="/admin/Precipitacion" >
              <Precipitacion userRol={userRol}/>
            </Route>
            
            <Route exact path="/logOut">

            </Route>
            {/* <Route exact path="/" render={()=><LoginUser />} /> */}
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default NavBar;
