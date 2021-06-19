import React, { useState, /* useEffect */ } from "react";
import useStyles from "../styles/FormLoginStyle.js";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import palette from "../styles/PaletteColors.js";
import { useForm } from "react-hook-form";
import { loginAxios } from "../services/LogIn.js";
//import { useHistory } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const FormLogin = () => {
  const [loginStatus, setloginStatus] = useState("");
  //let history = useHistory();
  //const [logged,setLogged] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const cedula = data.cedula;
      const password = data.password;
      const {message, token} = await loginAxios(cedula, password);
      if(token){
        setloginStatus("Inicio de sesion correcto");
        window.localStorage.setItem(
          'logInUser', token
        );
        
      }
      
      setloginStatus(message);
    } catch (error) {
      console.log(error);
      setloginStatus("Error al iniciar sesion");
    }
  };

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
            <form
              className={styles.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cedula"
                label="Ingrese por favor su cedula"
                name="cedula"
                autoComplete="Cedula"
                autoFocus
                color="secondary"
                inputRef={register}
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
                color="secondary"
                inputRef={register}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.submit}
                onClick={()=>{
                  console.log(loginStatus)}
                }
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
              <h3>{loginStatus}</h3>
              
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default FormLogin;
