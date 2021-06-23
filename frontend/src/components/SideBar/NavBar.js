import React, {Fragment} from "react";
import { SidebarData } from "./SidebarData";
//import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
//import palette from "../../styles/PaletteColors";
import useStyle from "../../styles/NavbarStyle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Admin from "../../pages/AdminUsers/Admin";
import Fertilizacion from "../../pages/FertilizationPage/Fertilizacion";
import Fumigacion from "../../pages/FumigationPage/Fumigacion";
import Inventario from "../../pages/Inventario";
import LaboresCultivo from "../../pages/LaboresCultivo";
import Precipitacion from "../../pages/Precipitacion";

const NavBar = () => {
  
  const styles = useStyle();
  

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
              {SidebarData.map((val, key) => {
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
              <Admin/>
            </Route>
            <Route exact path="/admin/Fertilizacion">
              <Fertilizacion/>
            </Route>
            <Route exact path="/admin/LaboresCultivo">
              <LaboresCultivo/>
            </Route>
            <Route exact path="/admin/Fumigacion">
              <Fumigacion/>
            </Route>
            <Route exact path="/admin/Inventario">
              <Inventario/>
            </Route>
            <Route exact path="/admin/Precipitacion">
              <Precipitacion/>
            </Route>
          </Switch>
        </div>
      </Router>
              </Fragment>
  );
};

export default NavBar;
