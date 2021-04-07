import React, { useState } from "react";
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

const FormLogin = () => {
  //`http://localhost:3001/fertilization`

  const [username, setusername] = useState();
  const [password, setpassword] = useState(); 

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setusername(data.username)
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
                id="username"
                label="Ingrese por favor su cedula"
                name="username"
                autoComplete="Cedula"
                autoFocus
                color="secondary"
                inputRef ={register}
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
