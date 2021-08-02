import React, { Fragment, useState, useEffect } from "react";
import BodyCRUD from "../BodyCRUD";
import {
  getFumigationAllAxios,
  postFumigationnAxios,
  putFumigationnAxios,
  deleteFumigationAxios,
  getFumigationUserAxios
} from "../../services/FumigationService";
import { FaTractor } from "react-icons/fa";
import FumigationForm from "../FumigationPage/FumigationForm";
import FumigationAllData from "../FumigationPage/FumigationAllData";
import { TableCell } from "@material-ui/core";

const columns = [
  { id: "fullName", label: "Nombre empleado" },
  { id: "lot", label: "Lote" },
  { id: "supplies", label: "Insumo" },
  { id: "activeIngredients", label: "Ingrediente activo" },
  { id: "plague", label: "Plaga" },
  { id: "actions", label: "Acciones" },
];

const FumigationPageCrud = (props) => {
  const {userRol} = props
  const [data, setData] = useState([]);
  useEffect(() => {
    if(userRol==='admin'){

      getFumigationAllAxios().then((user) => {
        setData(user);
      });
    }else{
      getFumigationUserAxios().then((user) => {
        setData(user);
      });
    }
  }, [setData]);

  const newDataList = (dataFum) => {
    const dataList = {
      _id: dataFum._id,
      fullName: dataFum.fullName,
      lot: dataFum.lot,
      timeFinish: dataFum.timeFinish,
      supplies: dataFum.supplies,
      activeIngredients: dataFum.activeIngredients,
      pr: dataFum.pr,
      pc: dataFum.pc,
      plague: dataFum.plague,
      dose: {
        cc: dataFum.cc,
        gr: dataFum.gr,
      },
      appliedAmount: dataFum.appliedAmount,
      totalSpent: dataFum.totalSpent,
      equipment: dataFum.equipment,
      surplus: dataFum.surplus,
      technicalVisit: dataFum.technicalVisit,
      meteorologicalCondition: dataFum.meteorologicalCondition,
    };
    return dataList;
  };

  const newDataResponse = (data, response) => {
    data.fullName = response.fullName;
    data.lot = response.lot;
    data.supplies = response.supplies;
    data.activeIngredients = response.activeIngredients;
    data.plague = response.cellphone;
  };

  const cell = (item) => {
    return (
      <Fragment>
        <TableCell>{item.fullName}</TableCell>
        <TableCell>{item.lot}</TableCell>
        <TableCell>{item.supplies}</TableCell>
        <TableCell>{item.activeIngredients}</TableCell>
        <TableCell>{item.plague}</TableCell>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <BodyCRUD
        title={"Fumigacion"}
        subTitle={"Administracion de Fumigacion"}
        modalTitleForm={"Formulario para la edición de fumigacion"}
        columns={columns}
        getFumigationAllAxios={ userRol==='admin'? getFumigationAllAxios: getFumigationUserAxios}
        postFumigationnAxios={postFumigationnAxios}
        putFumigationnAxios={putFumigationnAxios}
        deleteFumigationAxios={deleteFumigationAxios}
        IconInitial={FaTractor}
        dataPost={data}
        newDataList={newDataList}
        newDataResponse={newDataResponse}
        FumigationForm={FumigationForm}
        FumigationAllData={FumigationAllData}
        cell={cell}
      />
    </Fragment>
  );
};

export default FumigationPageCrud;
