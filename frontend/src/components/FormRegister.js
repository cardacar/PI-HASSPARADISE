import React, { useState } from "react";
import useStyles from "../styles/FormLoginStyle.js";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import palette from "../styles/PaletteColors.js";
import { useForm } from "react-hook-form";
import axios from "axios";

const FormRegister = () => {
  const [loginStatus, setloginStatus] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const name1 = data.name;
    const password = data.password;
    const idUser = data.idUsuarios;
    const date = data.date
    console.log(data)
    axios
      .post("http://localhost:3001/hsp/adminUsers/register", { name1, password, idUser, date})
      .then((response) => {
        console.log(response)
      });
  };

  const styles = useStyles();
  const theme = palette;

  return (
    <MuiThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        component="main"
        className={styles.root}
      >
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de usuarios HassParadisse
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
              id="name"
              label="Ingrese por favor el nombre del empleado"
              name="name"
              autoComplete="Nombre"
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
              label="Ingrese la contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
              inputRef={register}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="idUsuarios"
              label="Por favor ingrese la cedula del empleado"
              id="id"
              autoComplete="current-password"
              color="secondary"
              inputRef={register}
            />

            <TextField
              id="date"
              label="Fecha Nacimiento"
              type="date"
              defaultValue="2021-04-07"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange ={(e)=>{
                  console.log(e.target.value)
              }}
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

            <h3>{loginStatus}</h3>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </MuiThemeProvider>
  );
};

export default FormRegister;
