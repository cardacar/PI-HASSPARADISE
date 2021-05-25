//import axios from "axios";
import React, { useEffect, useState } from "react";
//import FormRegister from '../components/FormRegister';
import { getUsersAxios } from "../services/AdminService";

const Admin = ({ authorization }) => {
  console.log(authorization);
  const [users, setUsers] = useState([]);
  const logInToken = window.localStorage.getItem("logInUser");

  useEffect(() => {
    setTimeout(() => {
      getUsersAxios(logInToken).then((user) => {
        setUsers(user);
      });
    }, 1000);
  }, [logInToken]);

  /* const columns = [
    { field: "cc", headerName: "Cedula" },
    { field: "fullName", headerName: "Nombre" },
    { field: "telephony", headerName: "Telefono" },
    { field: "cellphone", headerName: "Celular" },
    { field: "birthDate", headerName: "Cedula" },
  ]; */

  return (
    <div>
      <h1>Admin</h1>
      {users.map((val, key) => {
        return (
          <div key={key}>
            <h2>Nombre: {val.fullName}</h2>
            <h2>Cedula: {val.cc}</h2>
            <h2>Role: {val.role}</h2>
            <h2>Fecha Nacimiento: {val.birthDate}</h2>
            <h2>Celular: {val.cellphone}</h2>
            <hr/>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
