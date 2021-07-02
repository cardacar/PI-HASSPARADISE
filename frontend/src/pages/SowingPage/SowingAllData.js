import React, { Fragment } from "react";
import {
  Typography,
  CardContent,
  Card,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 600,
  },

  pos: {
    marginBottom: 8,
  },
  compo: {
    marginTop: 0,
    marginBottom: 0,
    "& .MuiTypography-root": {
      width: "80%",
    },
  },
});

const SowingAllData = (props) => {
  const { data } = props;
  const style = useStyles();

  return (
    <Fragment>
      <Typography className={style.pos} color="textSecondary">
        {data.createdAt.split("T")[0]}
      </Typography>
      <Card className={style.root} variant="outlined">
        <CardContent>
          <Grid container item xs={12}>
            <Grid container item xs={6} direction="column">
              <Typography variant="h6" component="h3">
                Nombre Completo
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.fullName}
              </Typography>
              <Typography variant="h6" component="h3">
                Lote
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.lot}
              </Typography>
              <Typography variant="h6" component="h3">
                Variedad
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.variety}
              </Typography>
              <Typography variant="h6" component="h3">
                Procedencia Material Vegetal
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.vegetableOrigin}
              </Typography>
              <Typography variant="h6" component="h3">
                Total Árboles
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.totalTrees}
              </Typography>
              <Typography variant="h6" component="h3">
                Distancia
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.distance}
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Typography variant="h6" component="h3">
                Insumo aplicados y dosis(gr)
              </Typography>

              <Typography variant="subtitle2" component="h5">
                Microesentials
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    gr/árbol: {data.microesentials.gr}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    gr/árbol: {data.microesentials.kg}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" component="h5">
                Agrocilceo
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    gr/árbol: {data.Agrocilceo.gr}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    gr/árbol: {data.Agrocilceo.kg}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" component="h5">
                Agrimins
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    gr/árbol: {data.Agrimins.gr}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    gr/árbol: {data.Agrimins.kg}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" component="h5">
                Cal Dolomita
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    gr/árbol: {data.calDolomita.gr}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    gr/árbol: {data.calDolomita.kg}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" component="h5">
                micorrizas
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    gr/árbol: {data.micorrizas.gr}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    gr/árbol: {data.micorrizas.kg}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SowingAllData;
