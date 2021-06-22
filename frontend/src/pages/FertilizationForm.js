import React, { Fragment, useEffect } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import Control from "../components/Controls/Control";
import { useForm, Form } from "../components/Form";

const initialFValues = {
  _id: 0,
  fullName: "",
  equipment: "",
  lot: "",
  product: "",
  technicalVisit: "",
  method: "",
  observation: "",
  N: "",
  P2O2: "",
  K2O: "",
  CaO: "",
  S: "",
  Fe: "",
  Mn: "",
  Cu: "",
  Zn: "",
  Mo: "",
  B: "",
  cc: "",
  gr: "",
  total: "",
};

export default function FertilizationForm(props) {
  const { addOrEdit, dataForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (dataForEdit != null){
      const newDataForEdit={
          _id: dataForEdit._id,
          fullName: dataForEdit.fullName,
          equipment: dataForEdit.equipment,
          lot: dataForEdit.lot,
          product: dataForEdit.product,
          technicalVisit: dataForEdit.technicalVisit,
          method: dataForEdit.method,
          observation: dataForEdit.observation,
          N: dataForEdit.composition.N,
          P2O2: dataForEdit.composition.P2O2,
          K2O: dataForEdit.composition.K2O,
          CaO: dataForEdit.composition.CaO,
          S: dataForEdit.composition.S,
          Fe: dataForEdit.composition.Fe,
          Mn: dataForEdit.composition.Mn,
          Cu: dataForEdit.composition.Cu,
          Zn: dataForEdit.composition.Zn,
          Mo: dataForEdit.composition.Mo,
          B: dataForEdit.composition.B,
          cc: dataForEdit.amount.cc,
          gr: dataForEdit.amount.gr,
          total: dataForEdit.amount.total,
      }
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
              name="equipment"
              label="Equipo*"
              value={values.equipment}
              onChange={handleInputChange}
              errors={errors.equipment}
            />
            <Control.Input
              name="lot"
              label="Lote*"
              value={values.lot}
              onChange={handleInputChange}
              errors={errors.lot}
              type='Number'
            />
            <Control.Input
              name="product"
              label="producto*"
              value={values.product}
              onChange={handleInputChange}
              errors={errors.product}
            />
            <Control.Input
              name="method"
              label="Metodo*"
              value={values.method}
              onChange={handleInputChange}
              errors={errors.method}
            />
            <Control.Input
              name="technicalVisit"
              label="Visita Tecnica*"
              value={values.technicalVisit}
              onChange={handleInputChange}
              errors={errors.technicalVisit}
            />
            <Control.Input
              name="observation"
              label="Observaciones"
              value={values.observation}
              onChange={handleInputChange}
              errors={errors.observation}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container item xs={11} justify="center" alignItems="center">
              <Typography variant="h6" component="h5">
                Composición
              </Typography>
            </Grid>
            <Divider variant="middle" />

            <Grid container item xs={12} justify="flex-start" alignItems="center">
            <Grid item xs={6}>
              
              <Control.Input
                name="N"
                label="N"
                value={values.N}
                onChange={handleInputChange}
                errors={errors.N}
                size='small'
                type='Number'
                />
              <Control.Input
                name="P2O2"
                label="P2O2"
                value={values.P2O2}
                onChange={handleInputChange}
                errors={errors.P2O2}
                size='small'
                type='Number'
                />
              <Control.Input
                name="K2O"
                label="K2O"
                value={values.K2O}
                onChange={handleInputChange}
                errors={errors.K2O}
                size='small'
                type='Number'
                />
              <Control.Input
                name="CaO"
                label="CaO"
                value={values.CaO}
                onChange={handleInputChange}
                errors={errors.CaO}
                size='small'
                type='Number'
                />
              <Control.Input
                name="S"
                label="S"
                value={values.S}
                onChange={handleInputChange}
                errors={errors.S}
                size='small'
                type='Number'
                />
                </Grid>
                <Grid item xs={6}>
              
              <Control.Input
                name="Fe"
                label="Fe"
                value={values.Fe}
                onChange={handleInputChange}
                errors={errors.Fe}
                size='small'
                type='Number'
                />
              <Control.Input
                name="Mn"
                label="Mn"
                value={values.Mn}
                onChange={handleInputChange}
                errors={errors.Mn}
                size='small'
                type='Number'
                />
              <Control.Input
                name="Cu"
                label="Cu"
                value={values.Cu}
                onChange={handleInputChange}
                errors={errors.Cu}
                size='small'
                type='Number'
                />
              <Control.Input
                name="Zn"
                label="Zn"
                value={values.Zn}
                onChange={handleInputChange}
                errors={errors.Zn}
                size='small'
                type='Number'
                />
              <Control.Input
                name="Mo"
                label="Mo"
                value={values.Mo}
                onChange={handleInputChange}
                errors={errors.Mo}
                size='small'
                type='Number'
              />
                </Grid>
              <Control.Input
                name="B"
                label="B"
                value={values.B}
                onChange={handleInputChange}
                errors={errors.B}
                size='small'
                type='Number'
                />
            </Grid>

            <Grid container item xs={11} justify="center" alignItems="center">
              <Typography variant="h6" component="h2">
                Cantidad aplicada
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
              <Grid item xs={6}>
                <Control.Input
                  name="cc"
                  label="cc/lt*"
                  value={values.cc}
                  onChange={handleInputChange}
                  errors={errors.cc}
                />
              </Grid>
              <Grid item xs={6}>
                <Control.Input
                  name="gr"
                  label="gr/arbol*"
                  value={values.gr}
                  onChange={handleInputChange}
                  errors={errors.gr}
                />
              </Grid>
              
                <Control.Input
                  name="total"
                  label="Total*"
                  value={values.total}
                  onChange={handleInputChange}
                  errors={errors.total}
                />
              
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
