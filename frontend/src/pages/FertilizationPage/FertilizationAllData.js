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
  container:{
    flexWrap: 'nowrap'
    
  }
});

const FertilizationAllData = (props) => {
  const { data } = props;

  const style = useStyles();

  return (
    <Fragment>
      <Typography className={style.pos} color="textSecondary">
        {data.createdAt.split('T')[0]}
      </Typography>
      <Card className={style.root} variant="outlined">
        <CardContent>
          <Grid container item xs={12}>
            <Grid container item xs={6} direction="column" className={style.container}>
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
                Producto/Insumo
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.product}
              </Typography>
              <Typography variant="h6" component="h3">
                Composición %
              </Typography>
              <Grid container item xs={6} className={style.container}>
                <Grid item xs={6}>
                  <Typography
                    className={style.compo}
                    color="textSecondary"
                    align="left"
                  >
                    N:{data.composition.N}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    P2O2: {data.composition.P2O2}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    K2O: {data.composition.K2O}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    CaO: {data.composition.CaO}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    S: {data.composition.S}
                  </Typography>
                  <Typography className={style.pos} color="textSecondary">
                    Fe: {data.composition.Fe},
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={style.compo} color="textSecondary">
                    Mn: {data.composition.Mn}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    Cu: {data.composition.Cu}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    Zn: {data.composition.Zn},
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    Mo: {data.composition.Mo}
                  </Typography>
                  <Typography className={style.compo} color="textSecondary">
                    B: {data.composition.B},
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" component="h3">
                Metodo de aplicación
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.method}
              </Typography>
            </Grid>
            <Grid container item xs={6} direction="column">
              <Typography variant="h6" component="h3">
                Equipo de aplicación
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.equipment}
              </Typography>
              <Typography variant="h6" component="h3">
                Cantidad aplicada
              </Typography>
              <Typography
                className={style.compo}
                color="textSecondary"
                align="left"
              >
                cc/lt:{data.amount.cc}
              </Typography>
              <Typography className={style.compo} color="textSecondary">
                gr/arbol: {data.amount.gr}
              </Typography>
              <Typography className={style.compo} color="textSecondary">
                Total: {data.amount.total}
              </Typography>
              <Typography variant="h6" component="h3">
                Visita tecnica
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.technicalVisit}
              </Typography>
              <Typography variant="h6" component="h3">
                Observaciones
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                {data.observation}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default FertilizationAllData;
