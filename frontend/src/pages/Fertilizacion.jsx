import React, { useState, useEffect, Fragment } from "react";
import { getFertilizationAllAxios } from "../services/FertilizationService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Fertilizacion = () => {
  const [fertilizations, setFertilization] = useState([]);
  const logInToken = window.localStorage.getItem("logInUser");
  useEffect(() => {
    setTimeout(() => {
      getFertilizationAllAxios(logInToken).then((fertilization) => {
        setFertilization(fertilization);
        console.log(`data ${fertilization}`);
      });
    }, 1000);
  }, [logInToken]);
  console.log(fertilizations.composition);
  return (
    <Fragment>
      <DataTable value={fertilizations}>
        <Column field="fullName" header="Nombre Completo"></Column>
        <Column field="equipment" header="Equipo"></Column>
        <Column field="lot" header="Lote"></Column>
        <Column field="method" header="Metodo"></Column>
        <Column field="product" header="Producto"></Column>
        <Column field="technicalVisit" header="Visita Tecnica"></Column>
      </DataTable>
    </Fragment>
  );
};

export default Fertilizacion;
