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

const FumigationAllData = (props) => {
  const { data } = props;
  const styles = useStyles();

  return (
    <Fragment>
      <Typography className={styles.pos} color="textSecondary">
        {data.createdAt.split('T')[0]}
      </Typography>
      <Card className={styles.root} variant="outlined">
        <CardContent>
          <Grid container item xs={12} alignItems="flex-start">
            <Grid container item xs={6} direction="column">
              <Typography variant="h6" component="h3">
                Nombre Completo
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.fullName}
              </Typography>
              <Typography variant="h6" component="h3">
                Lote
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.lot}
              </Typography>
              <Typography variant="h6" component="h3">
                Hora término
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.timeFinish}
              </Typography>
              <Typography variant="h6" component="h3">
                Insumo
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.supplies}
              </Typography>
              <Typography variant="h6" component="h3">
                Ingrediente Activo
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.activeIngredients}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Typography variant="h6" component="h3">
                    P.R(Hora)
                  </Typography>
                  <Typography className={styles.pos} color="textSecondary">
                    {data.pr}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" component="h3">
                    P.C(Dias)
                  </Typography>
                  <Typography className={styles.pos} color="textSecondary">
                    {data.pc}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" component="h3">
                Visita técnica
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.technicalVisit}
              </Typography>
            </Grid>
            <Grid container item xs={6} direction="column">
              <Typography variant="h6" component="h3">
                Plaga
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.plague}
              </Typography>

              <Typography variant="h6" component="h3" align="center">
                Dosis
              </Typography>

              <Grid container item xs={6} justify="space-between">
                <Grid item xs={6}>
                  <Typography className={styles.compo} color="textSecondary">
                    cc/lt:{data.dose.cc}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.compo} color="textSecondary">
                    gr/lt:{data.dose.gr}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" component="h3">
                Cantidad aplicada (Agua Lt)
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.appliedAmount}
              </Typography>
              <Typography variant="h6" component="h3">
                Total de producto gastado(cc)
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.totalSpent}
              </Typography>
              <Typography variant="h6" component="h3">
                Equipo de aplicacion
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.equipment}
              </Typography>
              <Typography variant="h6" component="h3">
                Sobrante de la mezcla
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.surplus}
              </Typography>
              <Typography variant="h6" component="h3">
                Condición meteorologica
              </Typography>
              <Typography className={styles.pos} color="textSecondary">
                {data.meteorologicalCondition}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default FumigationAllData;
