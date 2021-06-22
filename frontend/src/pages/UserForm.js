import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Control from "../components/Controls/Control";
import { useForm, Form } from "../components/Form";
import * as userService from "../services/UsersService";

const initialFValues = {
  _id: 0,
  fullName: "",
  cc: "",
  birthDate: new Date(),
  cellphone: "",
  role: "",
  password:""
};

export default function UserForm (props) {
  const { addOrEdit, dataForEdit } = props;
  
  const validate = (fieldValues = values) => {
    //console.log(fieldValues)
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "El nombre es requerido";
    if ("cc" in fieldValues)
      temp.cc =
        fieldValues.cc.length > 5 ? "" : "Minimo 6 numeros para la cedula";
    if ("cellphone" in fieldValues)
      temp.cellphone =
        fieldValues.cellphone.length > 9
          ? ""
          : "Minimo 10 numeros para el celular";
    if ("role" in fieldValues)
      temp.role =
        fieldValues.role.length !== 0 ? "" : "Este campo es requerido";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
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
              name="cc"
              label="Cedula *"
              value={values.cc}
              onChange={handleInputChange}
              errors={errors.cc}
            />
            <Control.Input
              name="cellphone"
              label="Celular"
              value={values.cellphone}
              onChange={handleInputChange}
              errors={errors.cellphone}
            />
          </Grid>
          <Grid item xs={6}>
          <Control.Input
              name="password"
              label="Contraseña"
              onChange={handleInputChange}
              errors={errors.password}
              type="password"
            />
            <Control.DataCalendar
              name="birthDate"
              label="Fecha de nacimiento *"
              value={values.birthDate}
              onChange={handleInputChange}
            />
            <Control.Select
              name="role"
              label="Rol"
              value={values.role}
              onChange={handleInputChange}
              options={userService.getRoles()}
              errors={errors.role}
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
};

