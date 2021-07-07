import React, { useState, useEffect } from "react";
import Control from "../../components/Controls/Control";
import { useForm, Form } from "../../components/Form";
import {
  makeStyles,
  Avatar,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Aguacate from "../../img/aguacate.jpg";
import { MuiThemeProvider } from "@material-ui/core/styles";
import palette from "../../styles/PaletteColors";
import { loginAxios } from "../../services/LogIn";
/* import Notification from "../../components/Notification"; */
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Aguacate})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00C20D !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  link: {
    color: "#000000 !important",
  },
  textField: {
    "&:active:after": {
      borderColor: "red !important",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#007508 !important",
    color: "white !important",
    "&:hover": {
      background: "#00F511 !important",
      color: "#000000 !important",
    },
  },
}));

const initialFValues = {
  cedula: "",
  password: "",
};

const LoginUser = () => {
  const [loginStatus, setloginStatus] = useState("");
  const [token, setToken] = useState("")
  const [rol, setRol] = useState("")
  let history = useHistory();
  //let log = false;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
    console.log(loginStatus);
  };

  const {
    values,
    errors,
    handleInputChange,
    /* resetForm, */
  } = useForm(initialFValues, true, validate);

  const loginUser = () => {
    loginAxios(values).then((res) => {
      if (res.message) return setloginStatus(res.message);
      const token = res.token;
      const rolUser = res.rolUser;
      setToken(token);
      setRol(rolUser);
      history.push("/home")
    });
  };

  useEffect(() => {
    window.localStorage.setItem("logInUser", token);
    window.localStorage.setItem("rolUser", rol);
  }, [token, rol])


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
            <Form className={styles.form} onSubmit={handleSubmit}>
              <Control.Input
                margin="normal"
                required
                fullWidth
                label="Ingrese por favor su cedula"
                name="cedula"
                value={values.cedula}
                onChange={handleInputChange}
                errors={errors.cedula}
                autoFocus
                color="primary"
              />

              <Control.Input
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
                errors={errors.password}
                color="primary"
              />

              <Control.Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.submit}
                text="Iniciar Sesion"
              />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" className={styles.link}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </Form>
          </div>
        </Grid>
      </Grid>
      {/* <Route exact path="/">
        {window.localStorage.getItem('logInUser') ? <Redirect to="/admin" /> : "setLogged(false)"}
      </Route> */}
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </MuiThemeProvider>
  );
};

export default LoginUser;
