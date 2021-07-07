import React, { Fragment, useState, useEffect } from "react";
import BodyCRUD from "../BodyCRUD";
import { FaPoop } from "react-icons/fa";
import { TableCell } from "@material-ui/core";
import {
  getFertilizationAllAxios,
  deleteFertilizationAxios,
  postFertilizationAxios,
  putFertilizationAxios,
  getFertilizationUserAxios
} from "../../services/FertilizationService";
import FertilizationForm from "./FertilizationForm";
import FertilizationAllData from "./FertilizationAllData";

//Columnas que tendra la tabla
const fertilizationColumns = [
  { id: "fullName", label: "Nombre empleado" },
  { id: "lot", label: "Lote" },
  { id: "equipment", label: "Equipo" },
  { id: "method", label: "Metodo" },
  { id: "product", label: "Producto" },
  { id: "technicalVisit", label: "Visita" },
  { id: "actions", label: "Acciones" },
];

const FertilizationPageCrud = (props) => {
  const {userRol} = props
  const [data, setData] = useState([]);
  //Obtengo los datos de la bd e inicializo el estado de data
  useEffect(() => {
    if(userRol==='admin'){
      getFertilizationAllAxios().then((items) => {
        setData(items);
      });
    }else{
      getFertilizationUserAxios().then((items) => {
        setData(items);
      });
    }
  }, [setData]);

  const newDataList = (dataF) => {
    const dataList = {
      _id: dataF._id,
      fullName: dataF.fullName,
      equipment: dataF.equipment,
      lot: dataF.lot,
      product: dataF.product,
      technicalVisit: dataF.technicalVisit,
      method: dataF.method,
      observation: dataF.observation,
      composition: {
        N: dataF.N || "",
        P2O2: dataF.P2O2 || "",
        K2O: dataF.K2O || "",
        CaO: dataF.CaO || "",
        S: dataF.S || "",
        Fe: dataF.Fe || "",
        Mn: dataF.Mn || "",
        Cu: dataF.Cu || "",
        Zn: dataF.Zn || "",
        Mo: dataF.Mo || "",
        B: dataF.B || "",
      },
      amount: {
        cc: dataF.cc || "",
        gr: dataF.gr || "",
        total: dataF.total || "",
      },
    };
    return dataList;
  };

  const newDataResponse = (data, response) => {
    data.lot = response.lot;
    data.fullName = response.fullName;
    data.equipment = response.equipment;
    data.product = response.product;
    data.technicalVisit = response.technicalVisit;
  };

  const cell = (item) => {
    return (
      <Fragment>
        <TableCell>{item.fullName}</TableCell>
        <TableCell>{item.lot}</TableCell>
        <TableCell>{item.equipment}</TableCell>
        <TableCell>{item.method}</TableCell>
        <TableCell>{item.product}</TableCell>
        <TableCell>{item.technicalVisit}</TableCell>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <BodyCRUD
        title={"Fertilizacion"}
        subTitle={"Administracion Fertilizacion"}
        modalTitleForm={"Formulario para la edición de Fertilizacion"}
        columns={fertilizationColumns}
        getFumigationAllAxios={ userRol==='admin'? getFertilizationAllAxios : getFertilizationUserAxios}
        postFumigationnAxios={postFertilizationAxios}
        putFumigationnAxios={putFertilizationAxios}
        deleteFumigationAxios={deleteFertilizationAxios}
        IconInitial={FaPoop}
        dataPost={data}
        newDataList={newDataList}
        newDataResponse={newDataResponse}
        FumigationForm={FertilizationForm}
        FumigationAllData={FertilizationAllData}
        cell={cell}
      />
    </Fragment>
  );
};

export default FertilizationPageCrud;
