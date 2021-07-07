import React, { useState /* useEffect */ } from "react";
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
import Notification from "./Notification.js";

const FormLogin = () => {
  const [loginStatus, setloginStatus] = useState("");
  const [token, setToken] = useState("")
  const [rol, setRol] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
      const cedula = data.cedula;
      const password = data.password;
      loginAxios(cedula, password).then((res)=>{
        if(res.message)
          setloginStatus(res.message)
        setToken(res.token)
        setRol(res.rolUser);
        window.localStorage.setItem("logInUser", token);
        window.localStorage.setItem("rolUser", rol);
      })
      console.log(rol)
      /* if (token) {
        setloginStatus("Inicio de sesion correcto");
        setloginStatus(message);
      } */
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
                color="primary"
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
                color="primary"
                inputRef={register}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.submit}
                onClick={() => {
                  loginStatus === ""
                    ? setNotify({
                        isOpen: true,
                        message: loginStatus,
                        type: "error",
                      })
                    : setNotify({
                      isOpen: true,
                      message: loginStatus,
                      type: "success",
                    });
                }}
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
      <Notification notify={notify} setNotify={setNotify} />
    </MuiThemeProvider>
  );
};

export default FormLogin;
