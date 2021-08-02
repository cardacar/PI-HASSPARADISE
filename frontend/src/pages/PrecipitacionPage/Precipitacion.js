import React, { Fragment, useState, useEffect } from "react";
import Control from "../../components/Controls/Control";
import { getIp } from "../../services/PrecipitacionService";
import { FaCloudSunRain, FaCloudscale, FaCloudShowersHeavy } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { SiApacheairflow } from "react-icons/si";
import Header from "../../components/Header";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Icon,
} from "@material-ui/core";
import IconWeatherMoreInfo from "../../components/IconWeatherMoreInfo";

const useStyles = makeStyles((theme) => ({
  image: {
    "& .MuiCardMedia-img": {
      objectFit: "contain",
    },
  },
  weatherPrincipalIcon: {
    margin: "-30px",
    marginBottom: "-50px",
    marginLeft: "70px",
  },
  paper: {
    width: "100%",
  },
  card: {
    maxWidth: 250,
    margin: "auto",
    marginLeft: "70px",
    marginTop: "30px",
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing * 3,
  },
  divider: {
    margin: `${theme.spacing * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
}));

const translateData = {
  Clear: "Despejado",
  Clouds: "Nubes",
  Rain: "Lluvia",
};

const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const Precipitacion = () => {
  const styles = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    getIp().then((element) => {
      setData(element);
    });
    console.log("effect");
  }, [setData]);

  const getIpClick2 = () => {
    console.log(data);
  };
  return (
    <Fragment>
      <Grid container component="main" className={styles.root} spacing={0}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header
              title="Precipitación"
              subTitle="En esta pagina podrá visualizar el clima en la finca"
              icon={<FaCloudSunRain />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Paper className={styles.paper} elevation={0}>
            {Object.keys(data).length === 0 ? (
              ""
            ) : (
              <Fragment>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Card className={styles.card} elevation={0}>
                      <CardMedia
                        className={styles.media}
                        image={`https://openweathermap.org/img/wn/${data.dailyWeather[0].icon}@4x.png`}
                      />
                      <CardContent className={styles.content}>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h6"}
                          gutterBottom
                        >
                          {months[data.dailyWeather[0].day.split("-")[1]]}{" "}
                          {data.dailyWeather[0].day.split("-")[2]} del{" "}
                          {data.dailyWeather[0].day.split("-")[0]}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"caption"}
                        >
                          {translateData[data.dailyWeather[0].dayWeatherDesc]}
                        </Typography>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h6"}
                          gutterBottom
                        >
                          {data.dailyWeather[0].temp} °C
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={8}
                    direction="column"
                  >
                    

                    <IconWeatherMoreInfo
                      dataWeather={data.dailyWeather[0].windSpeed}
                      iconWeather={<FaCloudscale />}
                      clasStyle={styles.icon}
                      textdescweather={"Velocidad del viento"}
                      textdescunity={"m/s"}
                      />
                      <br/>
                    <IconWeatherMoreInfo
                      dataWeather={data.dailyWeather[0].humidity}
                      iconWeather={<FaCloudShowersHeavy />}
                      clasStyle={styles.icon}
                      textdescweather={"Humedad"}
                      textdescunity={"%"}
                    />
                    <IconWeatherMoreInfo
                      dataWeather={data.dailyWeather[0].pressure}
                      iconWeather={<SiApacheairflow />}
                      clasStyle={styles.icon}
                      textdescweather={"Presion del viento"}
                      textdescunity={"hPa"}
                    />

                    {/* <div className={styles.icon}>
                      <Icon fontSize="large">
                        <WiHumidity />
                      </Icon>
                    </div>
                    <div>
                      <Typography
                        className={"MuiTypography--heading"}
                        variant={"body1"}
                        gutterBottom
                      >
                        Velocidad del viento
                      </Typography>
                      <Typography
                        className={"MuiTypography--heading"}
                        variant={"body1"}
                        gutterBottom
                      >
                        {data.dailyWeather[0].windSpeed} m/s
                      </Typography>
                    </div> */}
                  </Grid>
                  {/* <Grid item xs={6}>
                  <Card className={styles.card}>
                  <CardMedia
                  className={styles.media}
                  image={`https://openweathermap.org/img/wn/${data.dailyWeather[0].icon}@4x.png`}
                  />
                    <CardContent className={styles.content}>
                      <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        >
                        {months[data.dailyWeather[0].day.split("-")[1]]}{" "}
                        {data.dailyWeather[0].day.split("-")[2]} del{" "}
                        {data.dailyWeather[0].day.split("-")[0]}
                      </Typography>
                      <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        >
                        {translateData[data.dailyWeather[0].dayWeatherDesc]}
                      </Typography>

                      <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        >
                        {data.dailyWeather[0].temp} °C
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> */}
                </Grid>
              </Fragment>
            )}
          </Paper>
        </Grid>

        <Control.Button text="Data" onClick={() => getIpClick2()} />
      </Grid>
    </Fragment>
  );
};

export default Precipitacion;
