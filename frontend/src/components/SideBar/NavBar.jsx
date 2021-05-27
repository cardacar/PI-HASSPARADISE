import React from "react";
import { SidebarData } from "./SidebarData";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import palette from "../../styles/PaletteColors";
import useStyle from "../../styles/NavbarStyle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Admin from "../../pages/Admin";
import Fertilizacion from "../../pages/Fertilizacion";
import Fumigacion from "../../pages/Fumigacion";
import Inventario from "../../pages/Inventario";
import LaboresCultivo from "../../pages/LaboresCultivo";
import Precipitacion from "../../pages/Precipitacion";

const NavBar = ({ authorization }) => {
  
  const styles = useStyle();
  const theme = palette;
  /* if(!authorization){
    return <Redirect to="/"/>
  } */


  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex" }}>
          <Drawer
            style={{ width: "210px" }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: styles.drawerPaper }}
          >
            <List>
              {SidebarData.map((val, key) => {
                return (
                  <Link to={val.link} key={key} className={styles.link} >
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
              <Admin authorization={authorization}/>
            </Route>
            <Route exact path="/admin/Fertilizacion">
              <Fertilizacion authorization={authorization}/>
            </Route>
            <Route exact path="/admin/LaboresCultivo">
              <LaboresCultivo authorization={authorization}/>
            </Route>
            <Route exact path="/admin/Fumigacion">
              <Fumigacion authorization={authorization}/>
            </Route>
            <Route exact path="/admin/Inventario">
              <Inventario authorization={authorization}/>
            </Route>
            <Route exact path="/admin/Precipitacion">
              <Precipitacion authorization={authorization}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default NavBar;
