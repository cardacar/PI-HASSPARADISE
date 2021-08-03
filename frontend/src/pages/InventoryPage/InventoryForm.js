import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Control from "../../components/Controls/Control";
import { useForm, Form } from "../../components/Form";

const initialFValues = {
  _id: 0,
  product: "",
  activeIngredient: "",
  typeProduct: "",
  module: "",
};

const InventoryForm = (props) => {
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
  } = useForm(initialFValues, true, validate);

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
        product: dataForEdit.product,
        activeIngredient: dataForEdit.activeIngredient,
        typeProduct: dataForEdit.typeProduct,
        module: dataForEdit.module,
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
              name="product"
              label="Producto*"
              value={values.product}
              onChange={handleInputChange}
              errors={errors.product}
            />
            <Control.Input
              name="activeIngredient"
              label="Ingrediente Activo*"
              value={values.activeIngredient}
              onChange={handleInputChange}
              errors={errors.activeIngredient}
            />
          </Grid>
          <Grid item xs={6}>
            <Control.Input
              name="typeProduct"
              label="Tipo de producto*"
              value={values.typeProduct}
              onChange={handleInputChange}
              errors={errors.typeProduct}
            />
            <Control.Input
              name="module"
              label="Modulo*"
              value={values.module}
              onChange={handleInputChange}
              errors={errors.module}
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
      </Form>
    </Fragment>
  );
};

export default InventoryForm;
