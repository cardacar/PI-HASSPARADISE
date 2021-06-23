import React, { Fragment, useEffect } from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import Control from "../../components/Controls/Control";
import { useForm, Form } from "../../components/Form";

const initialFuValues = {
  _id: 0,
  fullName: "",
  lot: "",
  timeFinish: "",
  supplies: "",
  activeIngredients: "",
  pr: "",
  pc: "",
  plague: "",
  cc: 0,
  gr: 0,
  appliedAmount: "",
  totalSpent: "",
  equipment: "",
  surplus: "",
  technicalVisit: "",
  meteorologicalCondition: "",
};

const FumigationForm = (props) => {
  const { addOrEdit, dataForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFuValues, true, validate);

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
        timeFinish: dataForEdit.timeFinish,
        supplies: dataForEdit.supplies,
        activeIngredients: dataForEdit.activeIngredients,
        pr: dataForEdit.pr,
        pc: dataForEdit.pc,
        plague: dataForEdit.plague,
        cc: dataForEdit.dose.cc,
        gr: dataForEdit.dose.gr,
        appliedAmount: dataForEdit.appliedAmount,
        totalSpent: dataForEdit.totalSpent,
        equipment: dataForEdit.equipment,
        surplus: dataForEdit.surplus,
        technicalVisit: dataForEdit.technicalVisit,
        meteorologicalCondition: dataForEdit.meteorologicalCondition,
      };
      setValues({
        ...newDataForEdit,
      });
    }
  }, [setValues, dataForEdit]);

  return (
    <Fragment>
      <Form handleSubmit={handleSubmit}>
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
            <Control.TimeInput
              name="timeFinish"
              label="Tiempo de finalizacion*"
              value={values.timeFinish}
              type="time"
              defaultValue="07:30"
              onChange={handleInputChange}
              errors={errors.timeFinish}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Control.Input
              name="supplies"
              label="Suministro*"
              value={values.supplies}
              onChange={handleInputChange}
              errors={errors.supplies}
            />
            <Control.Input
              name="activeIngredients"
              label="Ingrediente Activo*"
              value={values.activeIngredients}
              onChange={handleInputChange}
              errors={errors.activeIngredients}
            />
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Control.Input
                  name="pr"
                  label="P.R(Hora)*"
                  value={values.pr}
                  onChange={handleInputChange}
                  errors={errors.pr}
                />
              </Grid>
              <Grid item xs={5}>
                <Control.Input
                  name="pc"
                  label="P.C (Dias)*"
                  value={values.pc}
                  onChange={handleInputChange}
                  errors={errors.pc}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Control.Input
                  name="plague"
                  label="Plaga*"
                  value={values.plague}
                  onChange={handleInputChange}
                  errors={errors.plague}
                />
            </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default FumigationForm;
