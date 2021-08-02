import React, { Fragment, useState, useEffect } from "react";
import BodyCRUD from "../BodyCRUD";
import { FaTree } from "react-icons/fa";
import { TableCell } from "@material-ui/core";
import {
  getSowingAllAxios,
  deleteSowingAxios,
  postSowingAxios,
  putSowingAxios,
  getSowingUserDataAxios
} from "../../services/SowingService";
import SowingForm from "./SowingForm";
import SowingAllData from "./SowingAllData";

const sowingColumns = [
    { id: "fullName", label: "Nombre empleado" },
    { id: "lot", label: "Lote" },
    { id: "variety", label: "Variedad" },
    { id: "vegetableOrigin", label: "Procedencia vegetal" },
    { id: "totalTrees", label: "Total Arboles" },
    { id: "distance", label: "Distancia" },
    { id: "actions", label: "Acciones" },
  ];

const SowingPageCrud = (props) => {
  const {userRol} = props
  console.log(userRol)

    const [data, setData] = useState([]);
    useEffect(() => {
      if(userRol==='admin'){
        getSowingAllAxios().then((items) => {
          setData(items);
          });
      }else{
        getSowingUserDataAxios().then((items) => {
          setData(items);
          });

      }
      }, [setData]);



      const newDataList = (dataS) => {
        const dataList = {
            _id: dataS._id,
            fullName: dataS.fullName,
            lot: dataS.lot,
            variety: dataS.variety,
            vegetableOrigin: dataS.vegetableOrigin,
            totalTrees: dataS.totalTrees,
            distance: dataS.distance,
            microesentials: {
              gr: dataS.microesentialsGr,
              kg: dataS.microesentialsKg,
            },
            Agrocilceo: {
              gr: dataS.AgrocilceoGr,
              kg: dataS.AgrocilceoKg,
            },
            Agrimins: {
              gr: dataS.AgriminsGr,
              kg: dataS.AgriminsKg,
            },
            calDolomita: {
              gr: dataS.calDolomitaGr,
              kg: dataS.calDolomitaKg,
            },
            micorrizas: {
              gr: dataS.micorrizasGr,
              kg: dataS.micorrizasGr,
            },
        };
        return dataList;
      };

      const newDataResponse = (data, response) => {
        data.fullName = response.fullName;
            data.lot = response.lot;
            data.variety = response.variety;
            data.vegetableOrigin = response.vegetableOrigin;
            data.totalTrees = response.totalTrees;
            data.distance = response.distance;
      };

      const cell = (item) => {
        return (
          <Fragment>
            <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.lot}</TableCell>
                    <TableCell>{item.variety}</TableCell>
                    <TableCell>{item.vegetableOrigin}</TableCell>
                    <TableCell>{item.totalTrees}</TableCell>
                    <TableCell>{item.distance}</TableCell>
          </Fragment>
        );
      };
  return (
    <Fragment>
      <BodyCRUD 
      title={"Siembra"}
      subTitle={"Administracion de Siembra"}
      modalTitleForm={"Formulario para la edición de siembra"}
      columns={sowingColumns}
      getFumigationAllAxios={userRol==='admin'? getSowingAllAxios: getSowingUserDataAxios}
      postFumigationnAxios={postSowingAxios}
      putFumigationnAxios={putSowingAxios}
      deleteFumigationAxios={deleteSowingAxios}
      IconInitial={FaTree}
      dataPost={data}
      newDataList={newDataList}
      newDataResponse={newDataResponse}
      FumigationForm={SowingForm}
      FumigationAllData={SowingAllData}
      cell={cell}/>
    </Fragment>
  );
};

export default SowingPageCrud;
