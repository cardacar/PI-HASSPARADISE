import React, { useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { columnsUsers } from "./TableData";
import { TextField, Button, Modal } from "@material-ui/core";
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
    role: "",
  });

  //const [currency, setCurrency] = useState("user");

  const Rol = [
      {
        value: "user",
        label: "Usuario",
      },
    {
      value: "admin",
      label: "Administrador",
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
  const openCloseModalDeleteUser = () => {
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
    
  };

  /* const handleChangeSelect = (event) => {
    setCurrency(event.target.value);
    console.log(user)
  }; */

  useEffect(() => {
    setTimeout(() => {
      getUsersAxios(logInToken).then((user) => {
        setData(user);
      });
    }, 1000);
  }, [logInToken]);

  const selectionUser = (data, action)=>{
    setUser(data);
    (action==="Editar") ? openCloseModalEditUser():openCloseModalDeleteUser();
  }

  const postPetition = async () => {
      const Roles = [user.role]
      user.role = Roles
      console.log(user)
    await axios.post(`${baseUrl}userAdmin`, user, config)
    .then((response)=>{
        response.data.birthDate = response.data.birthDate.split('T')[0];
        if(response.data.role[0]==='60a18e786596d12420b8f546'){
            response.data.role = 'admin'
        }else{
            response.data.role = 'user'
        }
        setData(data.concat(response.data))
        console.log(response)
        openCloseModalInsertUser();
    })
    .catch(error=>console.log(error))
    
  };

  const putPetition = async () =>{
      const Role = user.role
      if(Role === "admin"){
          user.role = ["60a18e786596d12420b8f546"]
      }else if(Role==="user"){
          user.role = ["60a18e786596d12420b8f545"]
      }
      await axios.put(`${baseUrl}userAdmin/${user._id}`, user,config)
      .then(response=>{
          const newData = data;
          //console.log(newData)
          newData.forEach(User =>{
              if(User._id === user._id){
                  User.fullName = user.fullName;
                  User.cc = user.cc;
                  User.birthDate= user.birthDate;
                  User.role = (user.role[0]==='60a18e786596d12420b8f546')? 'admin':'user';
              }
          })
          setData(newData);
          openCloseModalEditUser();
      })
      .catch(error=>console.log(error))
  }

  const deletePetition = async ()=>{
      await axios.delete(`${baseUrl}userAdmin/${user._id}`, config)
      .then(response=>{
          setData(data.filter(User=> User._id!==user._id));
          openCloseModalDeleteUser();
      })
      .catch(error=>console.log(error))
  }

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
            <Button className={styles.btn} onClick={() => postPetition()}>
              Insertar
            </Button>
            <Button onClick={() => openCloseModalInsertUser()}>Cancelar</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );


  const bodyEdit = (
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
            value={user&&user.fullName}
          />
        </Grid>
        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Cedula"
            name="cc"
            onChange={handleChange}
            value={user&&user.cc}
          />
        </Grid>

        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Nueva Contraseña"
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
            value={user&&user.date}
          />
        </Grid>
        <br />
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            label="Telefono"
            name="cellphone"
            onChange={handleChange}
            value={user&&user.cellphone}

          />
        </Grid>
        <Grid item xs={4}>
          <br />
          <TextField
            className={styles.inputMaterial}
            select
            label="Rol"
            name="role"
            
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
            <Button className={styles.btn} onClick={() => putPetition()}>
              Insertar
            </Button>
            <Button onClick={() => openCloseModalEditUser()}>Cancelar</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  const bodyDelete=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el dato <b>{user && user.fullName}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>deletePetition()}>Sí</Button>
        <Button onClick={()=>openCloseModalDeleteUser()}>No</Button>

      </div>

    </div>
  )



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
            onClick: (e, rowData) => selectionUser(rowData, 'Editar'),
          },
          {
            icon: "delete",
            tooltip: "Eliminar",
            onClick: (e, rowData) => selectionUser(rowData, 'Eliminar'),
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
      <Modal open={modalEditUser} onClose={openCloseModalEditUser}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteUser} onClose={openCloseModalDeleteUser}>
        {bodyDelete}
      </Modal>
    </Fragment>
  );
};

export default TableUser;
