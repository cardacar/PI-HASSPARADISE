import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { columns } from "./TableData";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFertilizationAllAxios, 
  /* postFertilizationAxios,  */
  putFertilizationAxios, 
  deleteFertilizationAxios } from "../../services/FertilizationService";
import Grid from "@material-ui/core/Grid";
//import ModalInsertFertilization from '../Modals/ModalInsertFertilization'


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
  title:{
      textAlign: "center",
  },
  btn:{
      backgroundColor:"#007508",
      '&:hover':{
          backgroundColor:"#00C20D"
      }
  }
}));

const Table2 = () => {
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const styles = useStyles();

  

  const [fertilization, setFertilization] = useState({
    
    equipment: "",
    lot: "",
    method: "",
    product: "",
    technicalVisit: "",
    composition: {
      B: "",
      P202: "",
      K2O:"",
    },
    amount: {
      cc: "",
      gr: "",
      total: "",
    },
  });




 const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };
  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const handleChange= e=>{
      const {name, value} = e.target;
      setFertilization( prevState=>({
          ...prevState,
          [name]:value
      }));
  }

  const handleChangeComposition= e=>{
    const {name, value} = e.target;
    let compositionItem = name.split('.')[1]
    let composition = name.split('.')[0]
    setFertilization( prevState=>({
        ...prevState,
        [composition]:{...prevState.composition,[compositionItem]:value}
    }));
    
}
const handleChangeAmount= e=>{
    const {name, value} = e.target;
    let amountItem = name.split('.')[1]
    let amount = name.split('.')[0]
    setFertilization( prevState=>({
        ...prevState,
        [amount]:{...prevState.amount,[amountItem]:value}
    }));
    
}
  
/* const prueba = e=>{
  const {name, value} = e.target;
  console.log(`name: ${name}, value: ${value}`)
} */

  useEffect(() => {
    setTimeout(() => {
      getFertilizationAllAxios().then((fertilization) => {
        setData(fertilization);
      });
    }, 1000);
  }, []);


 /*  const postPetition = async ()=>{

    await postFertilizationAxios(fertilization).then((response)=>{
      setData(data.concat(response.data))
        console.log(response)
        openCloseModalInsert();
    })
    .catch(error=>console.log(error));
    
  } */

  const putPetition = async ()=>{
    await putFertilizationAxios(fertilization,fertilization._id)
    .then(response => {
        const newData = data;
        newData.forEach(fert =>{
            if(fert._id===fertilization._id){
                fert.lot=fertilization.lot;
                fert.method= fertilization.method;
                fert.equipment=fertilization.equipment;
                fert.amount.cc=fertilization.amount.cc;
                fert.amount.gr=fertilization.amount.gr;
                fert.composition.B=fertilization.composition.B;
                fert.composition.P2O2 = fertilization.composition.P2O2;
                fert.composition.K2O = fertilization.composition.K2O;
                fert.product = fertilization.product;
                fert.technicalVisit = fertilization.technicalVisit;
            }
        })
          setData(newData)
          openCloseModalEdit();
      })
      .catch(error=>console.log(error))
      
  }

  const deletePetition = async ()=>{
    await deleteFertilizationAxios(fertilization._id)
    .then(response=>{
        setData(data.filter(fert=>fert._id!==fertilization._id));
        console.log(response)
        openCloseModalDelete();
    })
    .catch(error=>console.log(error))
  }

  const selectionFertilization = (data, action)=>{
    setFertilization(data);
    (action==="Editar" )?openCloseModalEdit():openCloseModalDelete()
  }

 /*  const bodyInsertar = (
    <div className={styles.modal}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <h3>Agregar un dato a la tabla fertilizacion</h3>
        </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Equipo"
          name="equipment"
          onChange={handleChange} 
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Lote"
          name="lot"
          onChange={handleChange}
          />
          </Grid>
          
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Metodo"
          name="method"
          onChange={handleChange}
          />
          </Grid>
        <br />

        <Grid item xs={6}>

        <TextField
          className={styles.inputMaterial}
          label="Producto"
          name="product"
          onChange={handleChange}
          />
          </Grid>
        <br />
        <Grid item xs={6}>

        <TextField
          className={styles.inputMaterial}
          label="Visita Tecnica"
          name="technicalVisit"
          onChange={handleChange}
          />
          </Grid>
          
        <Grid item xs={12} className={styles.title}>
            <h4>Composicion</h4>
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={styles.inputMaterial}
          label="B"
          name="composition.B"
          onChange={handleChangeComposition}
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="P2O2"
          name="composition.P2O2"
          onChange={handleChangeComposition}
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="K2O"
          name="composition.K2O"
          onChange={handleChangeComposition}
          />
          </Grid>
        <br />
        
        <br />
        <Grid item xs={12} className={styles.title}>
            <h4>Cantidad</h4>
        </Grid>
        <br />
        <br />
        <Grid item xs={6}>
        <TextField
          className={styles.inputMaterial}
          label="cc/lt"
          name="amount.cc"
          onChange={handleChangeAmount}
          />
          </Grid>
          <br />
        <Grid item xs={6}>
        <TextField
          className={styles.inputMaterial}
          label="gr/arbol"
          name="amount.gr"
          onChange={handleChangeAmount}
          />
          </Grid>
          <br />
          <br />

        <div align="right">
        <br />
          <Button className={styles.btn} onClick={()=>postPetition()}>
            Insertar
          </Button>
          <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
        </div>
      </Grid>
    </div>
  ); */

  const bodyEdit = (
    <div className={styles.modal}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <h3>Editar</h3>
        </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Equipo"
          name="equipment"
          onChange={handleChange}
          value={fertilization&&fertilization.equipment}
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Lote"
          name="lot"
          onChange={handleChange}
          value={fertilization&&fertilization.lot}
          />
          </Grid>
          
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="Metodo"
          name="method"
          onChange={handleChange}
          value={fertilization&&fertilization.method}
          />
          </Grid>
        <br />

        <Grid item xs={6}>

        <TextField
          className={styles.inputMaterial}
          label="Producto"
          name="product"
          onChange={handleChange}
          value={fertilization&&fertilization.product}
          />
          </Grid>
        <br />
        <Grid item xs={6}>

        <TextField
          className={styles.inputMaterial}
          label="Visita Tecnica"
          name="technicalVisit"
          onChange={handleChange}
          value={fertilization&&fertilization.technicalVisit}
          />
          </Grid>
          
        <Grid item xs={12} className={styles.title}>
            <h4>Composicion</h4>
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={styles.inputMaterial}
          label="B"
          name="composition.B"
          onChange={handleChangeComposition}
          value={fertilization&&fertilization.composition.B}
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="P2O2"
          name="composition.P2O2"
          onChange={handleChangeComposition}
          value={fertilization&&fertilization.composition.P2O2}
          />
          </Grid>
        <br />
        <Grid item xs={4}>

        <TextField
          className={styles.inputMaterial}
          label="K2O"
          name="composition.K2O"
          onChange={handleChangeComposition}
          value={fertilization&&fertilization.composition.K2O}
          />
          </Grid>
        <br />
        
        <br />
        <Grid item xs={12} className={styles.title}>
            <h4>Cantidad</h4>
        </Grid>
        <br />
        <br />
        <Grid item xs={6}>
        <TextField
          className={styles.inputMaterial}
          label="cc/lt"
          name="amount.cc"
          onChange={handleChangeAmount}
          value={fertilization&&fertilization.amount.cc}
          />
          </Grid>
          <br />
        <Grid item xs={6}>
        <TextField
          className={styles.inputMaterial}
          label="gr/arbol"
          name="amount.gr"
          onChange={handleChangeAmount}
          value={fertilization&&fertilization.amount.gr}
          />
          </Grid>
          <br />

        <div align="right">
          <Button className={styles.btn} onClick={()=>putPetition()}>
            Editar
          </Button>
          <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
        </div>
      </Grid>
    </div>
  );

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el dato <b>{fertilization && fertilization.fullName}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>deletePetition()}>Sí</Button>
        <Button onClick={()=>openCloseModalDelete()}>No</Button>

      </div>

    </div>
  )
//const modalEditFertilization = ()=>(<ModalInsertFertilization Change={prueba}/>)


  return (
    <div>
      <MaterialTable
        columns={columns}
        data={data}
        title="Tabla Fertilizacion de cultivos"
        actions={[
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (e, rowData) => selectionFertilization(rowData, 'Editar'),
          },
          {
            icon: "delete",
            tooltip: "Eliminar",
            onClick: (e, rowData) => selectionFertilization(rowData, 'Eliminar'),
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
      <Button onClick={() => openCloseModalInsert()} className={styles.btn}>Insertar</Button>
      <Modal open={modalEdit} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDelete} onClose={openCloseModalDelete}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};

export default Table2;
