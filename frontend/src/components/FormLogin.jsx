import React from "react";
import useStyles from "../css/FormLoginCss.js";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {MuiThemeProvider} from "@material-ui/core/styles"
import palette from "../css/palette.js"

const FormLogin = () => {
  
  //`http://localhost:3001/fertilization`

  const styles = useStyles();
  const theme = palette;

  return (
      <MuiThemeProvider theme={theme}>

      
    <Grid container component="main" className={styles.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login HassParadisse
          </Typography>
          <form className={styles.form} noValidate action='http://localhost:3001/fertilization' method='get'>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="CC"
              label="Ingrese por favor su cedula"
              name="CC"
              autoComplete="Cedula"
              autoFocus
              color='secondary'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              color='secondary'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.submit}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" className={styles.link}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </MuiThemeProvider>
  );
};

export default FormLogin;
