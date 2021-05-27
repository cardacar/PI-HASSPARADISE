import React, { useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { columnsUsers } from "./TableData";
import { TextField, Button, Modal } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { getUsersAxios } from "../../services/UsersService";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "relative",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#007508",
    "&:hover": {
      backgroundColor: "#00C20D",
    },
  },
}));

const TableUser = () => {
  const styles = useStyles();
  const logInToken = window.localStorage.getItem("logInUser");
  const baseUrl = "http://localhost:3001/api/hpd/";

  const [data, setData] = useState([]);
  const [modalInserttUser, setModalInserttUser] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    cc: "",
    password: "",
    birthDate: "",
    cellphone: "",
    role: [""],
  });

  const [currency, setCurrency] = useState();

  const Rol = [
    {
      value: "admin",
      label: "Administrador",
    },
    {
      value: "user",
      label: "Usuario",
    },
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${logInToken}`,
    },
  };

  const openCloseModalInsertUser = () => {
    setModalInserttUser(!modalInserttUser);
  };
  const openCloseModalDelete = () => {
    setModalDeleteUser(!modalDeleteUser);
  };
  const openCloseModalEditUser = () => {
    setModalEditUser(!modalEditUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(user);
  };

  const handleChangeSelect = (event) => {
    setCurrency(event.target.value);
    console.log(user)
  };

  useEffect(() => {
    setTimeout(() => {
      getUsersAxios(logInToken).then((user) => {
        setData(user);
      });
    }, 1000);
  }, [logInToken]);

  const postPetition = async () => {
    await axios.post(`${baseUrl}userAdmin`, user, config)
    
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3>Agregar un usuario nuevo</h3>
        </Grid>
        <br />
        <Grid item xs={12}>
          <TextField
            className={styles.inputMaterial}
            label="Nombre Completo"
            name="fullName"
            onChange={handleChange}
          />
        </Grid>
        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Cedula"
            name="cc"
            onChange={handleChange}
          />
        </Grid>

        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Grid>
        <br />

        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            name="birthDate"
            type="date"
            onChange={handleChange}
          />
        </Grid>
        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Telefono"
            name="cellphone"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <br />
          <TextField
            className={styles.inputMaterial}
            select
            label="Rol"
            name="role"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {Rol.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <br />
        <br />

        <Grid item xs={12}>
          <div align="right">
            <br />
            <Button className={styles.btn} onClick={() => alert("hola")}>
              Insertar
            </Button>
            <Button onClick={() => openCloseModalInsertUser()}>Cancelar</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Fragment>
      <MaterialTable
        columns={columnsUsers}
        data={data}
        title="Usuarios actualmente"
        actions={[
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (e, rowData) => console.log(rowData.fullName),
          },
          {
            icon: "delete",
            tooltip: "Eliminar",
            onClick: (e, rowData) => console.log(rowData.fullName),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "",
          },
        }}
      />
      <Button onClick={() => openCloseModalInsertUser()} className={styles.btn}>
        Insertar
      </Button>
      <Modal open={modalInserttUser} onClose={openCloseModalInsertUser}>
        {bodyInsertar}
      </Modal>
    </Fragment>
  );
};

export default TableUser;
