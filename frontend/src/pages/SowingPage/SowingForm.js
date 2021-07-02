import React, { Fragment, useEffect } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import Control from "../../components/Controls/Control";
import { useForm, Form } from "../../components/Form";
const initialSValues = {
  _id: 0,
  fullName: "",
  lot: "",
  variety: "",
  vegetableOrigin: "",
  totalTrees: "",
  distance: "",
  microesentialsGr: 0,
  microesentialsKg: 0,
  AgrocilceoGr: 0,
  AgrocilceoKg: 0,
  AgriminsGr: 0,
  AgriminsKg: 0,
  calDolomitaGr: 0,
  calDolomitaKg: 0,
  micorrizasGr: 0,
  micorrizasKg: 0,
  /* OrganomineralGr: 0,
  OrganomineralKg: 0, */
};

export default function SowingForm(props) {
  const { addOrEdit, dataForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    setValues,
    errors,
    /* setErrors */ handleInputChange,
    resetForm,
  } = useForm(initialSValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (dataForEdit != null) {
      const newDataForEdit = {
        _id: dataForEdit._id,
        fullName: dataForEdit.fullName,
        lot: dataForEdit.lot,
        variety: dataForEdit.variety,
        vegetableOrigin: dataForEdit.vegetableOrigin,
        totalTrees: dataForEdit.totalTrees,
        distance: dataForEdit.distance,
        microesentialsGr: dataForEdit.microesentials.gr,
        microesentialsKg: dataForEdit.microesentials.kg,
        AgrocilceoGr: dataForEdit.Agrocilceo.gr,
        AgrocilceoKg: dataForEdit.Agrocilceo.kg,
        AgriminsGr: dataForEdit.Agrimins.gr,
        AgriminsKg: dataForEdit.Agrimins.kg,
        calDolomitaGr: dataForEdit.calDolomita.gr,
        calDolomitaKg: dataForEdit.calDolomita.kg,
        micorrizasGr: dataForEdit.micorrizas.gr,
        micorrizasKg: dataForEdit.micorrizas.kg,
        /* OrganomineralGr: dataForEdit.Organomineral.gr,
        OrganomineralKg: dataForEdit.Organomineral.kg, */
      };
      setValues({
        ...newDataForEdit,
      });
    }
  }, [setValues, dataForEdit]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Control.Input
              name="fullName"
              label="Nombre Completo*"
              value={values.fullName}
              onChange={handleInputChange}
              errors={errors.fullName}
            />
            <Control.Input
              name="lot"
              label="Lote*"
              value={values.lot}
              onChange={handleInputChange}
              errors={errors.lot}
              type="Number"
            />
            <Control.Input
              name="variety"
              label="Variedad*"
              value={values.variety}
              onChange={handleInputChange}
              errors={errors.variety}
            />
            <Control.Input
              name="vegetableOrigin"
              label="Procedencia material vegetal*"
              value={values.vegetableOrigin}
              onChange={handleInputChange}
              errors={errors.vegetableOrigin}
            />
            <Control.Input
              name="totalTrees"
              label="Total Arboles*"
              value={values.totalTrees}
              onChange={handleInputChange}
              errors={errors.totalTrees}
            />
            <Control.Input
              name="distance"
              label="Distancia*"
              value={values.distance}
              onChange={handleInputChange}
              errors={errors.distance}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container item xs={11} justify="center" alignItems="center">
              <Typography variant="h6" component="h5">
                Insumo aplicado y dosis (gr)
              </Typography>
            </Grid>
            <Divider variant="middle" />

            <Grid
              container
              item
              xs={12}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h5">
                  Microesentials
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="microesentialsGr"
                  label="gr*"
                  value={values.microesentialsGr}
                  onChange={handleInputChange}
                  errors={errors.microesentialsGr}
                  type="Number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="microesentialsKg"
                  label="kg*"
                  value={values.microesentialsKg}
                  onChange={handleInputChange}
                  errors={errors.microesentialsKg}
                  type="Number"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h5">
                  Agrocilceo
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="AgrocilceoGr"
                  label="gr*"
                  value={values.AgrocilceoGr}
                  onChange={handleInputChange}
                  errors={errors.AgrocilceoGr}
                  type="Number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="AgrocilceoKg"
                  label="kg*"
                  value={values.AgrocilceoKg}
                  onChange={handleInputChange}
                  errors={errors.AgrocilceoKg}
                  type="Number"
                  size="small"
                />
              </Grid>


              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h5">
                Agrimins
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="AgriminsGr"
                  label="gr*"
                  value={values.AgriminsGr}
                  onChange={handleInputChange}
                  errors={errors.AgriminsGr}
                  type="Number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="AgriminsKg"
                  label="kg*"
                  value={values.AgriminsKg}
                  onChange={handleInputChange}
                  errors={errors.AgriminsKg}
                  type="Number"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h5">
                Cal dolomita
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="calDolomitaGr"
                  label="gr*"
                  value={values.calDolomitaGr}
                  onChange={handleInputChange}
                  errors={errors.calDolomitaGr}
                  type="Number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="calDolomitaKg"
                  label="kg*"
                  value={values.calDolomitaKg}
                  onChange={handleInputChange}
                  errors={errors.calDolomitaKg}
                  type="Number"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h5">
                Micorrizas
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="micorrizasGr"
                  label="gr*"
                  value={values.micorrizasGr}
                  onChange={handleInputChange}
                  errors={errors.micorrizasGr}
                  type="Number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="calDolomitaKg"
                  label="kg*"
                  value={values.micorrizasGr}
                  onChange={handleInputChange}
                  errors={errors.micorrizasGr}
                  type="Number"
                  size="small"
                />
              </Grid>

            </Grid>
            <div>
              <Control.Button type="submit" text="Agregar" />
              <Control.Button
                text="Reiniciar"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
}
