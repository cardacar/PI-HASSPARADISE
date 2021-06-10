import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Control from "../components/Controls/Control";
import { useForm, Form } from "../components/Form";

const initialFValues = {
  _id: 0,
  fullName: "",
  equipment: "",
  lot: "",
  product: "",
  technicalVisit: "",
  composition: {
    B: "",
    K2O: "",
  },
  amount: {
    cc: "",
  },
};

export default function FertilizationForm(props) {
  const { addOrEdit, dataForEdit } = props;
  const validate = {};
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (dataForEdit != null)
      setValues({
        ...dataForEdit,
      });
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
              value={values.lot}
              onChange={handleInputChange}
              errors={errors.equipment}
            />
            <Control.Input
              name="lot"
              label="Lote*"
              value={values.lot}
              onChange={handleInputChange}
              errors={errors.lot}
            />
            <Control.Input
              name="product"
              label="producto*"
              value={values.product}
              onChange={handleInputChange}
              errors={errors.product}
            />
          </Grid>
          <Grid item xs={6}>
            <Control.Input
              name="technicalVisit"
              label="Visita Tecnica*"
              value={values.technicalVisit}
              onChange={handleInputChange}
              errors={errors.technicalVisit}
            />
            <Control.Input
              name="composition.B"
              label="Composicion B*"
              value={values.composition.B}
              onChange={handleInputChange}
              errors={errors.composition}
            />
            <Control.Input
              name="composition.K2O"
              label="Composicion K2O*"
              value={values.composition.K2O}
              onChange={handleInputChange}
              errors={errors.composition}
            />
            <Control.Input
              name="amount.cc"
              label="Cantidad en Centrimetros cubicos*"
              value={values.amount.cc}
              onChange={handleInputChange}
              errors={errors.amount}
            />
            <div>
              <Control.Button type="submit" text="Agregar" />
              <Control.Button
                text="Reset"
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
