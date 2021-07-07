import React, { Fragment } from "react";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import Header from "../../components/Header";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Paper 
} from "@material-ui/core";
import Aguacate from "../../img/AguacateWelcome.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    '& .MuiCardMedia-img':{
      objectFit:'contain'
    }
  },
}));

const WelcomePage = () => {
  const styles = useStyles();
  return (
    <Fragment>
      <Grid container component="main" className={styles.root} spacing={0}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header
              title="Bienvenido a la pagina de HASSPARADISE"
              subTitle="En esta pagina padra realizar las actividades diarias"
              icon={<GroupWorkIcon />}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper className={styles.paper} elevation={0}>
          <Card elevation={0}>
      
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2" align='center'>
            Hassparadisse
          </Typography>

        </CardContent>
        <CardMedia
          component="img"
          alt="Aguacate"
          height="340"
          width="940"
          image={Aguacate}
          title="Aguacate"
          className={styles.image}
        />
      
    </Card>
          </Paper>

        </Grid>
      </Grid>
    </Fragment>
  );
};

export default WelcomePage;
