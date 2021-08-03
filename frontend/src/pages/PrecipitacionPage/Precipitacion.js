import React, { Fragment, useState, useEffect } from "react";
import { getIp } from "../../services/PrecipitacionService";
import {
  FaCloudSunRain,
  FaCloudscale,
  FaCloudShowersHeavy,
} from "react-icons/fa";
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
} from "@material-ui/core";
import IconWeatherMoreInfo from "../../components/IconWeatherMoreInfo";
import Carousel from "react-elastic-carousel";

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
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Precipitacion = () => {
  const styles = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    getIp().then((element) => {
      setData(element);
    });

  }, [setData]);

  return (
    <Fragment>
      <Grid container component="main" className={styles.root} spacing={0}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header
              title="Precipitación"
              subTitle="En esta pagina podrá visualizar el clima en la finca San Luis en Abejorral-Antioquia"
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
                  justifycontent="center"
                  alignItems="center"
                >
                  <Grid item xs>
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
                  <Grid container item xs direction="column">
                    <IconWeatherMoreInfo
                      dataWeather={data.dailyWeather[0].windSpeed}
                      iconWeather={<FaCloudscale />}
                      clasStyle={styles.icon}
                      textdescweather={"Velocidad del viento"}
                      textdescunity={"m/s"}
                    />
                    <br />
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
                  </Grid>
                </Grid>
                <Paper className={styles.paper} elevation={3}>
                  <Carousel breakPoints={breakPoints}>
                    {data.dailyWeather.map((item, index) => {
                      
                      return (
                        <Card className={styles.card} elevation={0} key={index}>
                          <CardMedia
                            className={styles.media}
                            image={`https://openweathermap.org/img/wn/${item.icon}@4x.png`}
                          />
                          <CardContent className={styles.content}>
                            <Typography
                              className={"MuiTypography--heading"}
                              variant={"h6"}
                              gutterBottom
                            >
                              {months[item.day.split("-")[1]]}{" "}
                              {item.day.split("-")[2]} del{" "}
                              {item.day.split("-")[0]}
                            </Typography>
                            <Typography
                              className={"MuiTypography--subheading"}
                              variant={"caption"}
                            >
                              {translateData[item.dayWeatherDesc]}
                            </Typography>
                            <Typography
                              className={"MuiTypography--heading"}
                              variant={"h6"}
                              gutterBottom
                            >
                              {item.temp} °C
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Carousel>
                </Paper>
              </Fragment>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Precipitacion;
