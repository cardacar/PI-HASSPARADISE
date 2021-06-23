//Imports necesarios
import React, { Fragment, useState, useEffect } from "react";
import { FaPoop } from "react-icons/fa";
import Header from "../components/Header";
import {
  Grid,
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
  Divider,

  /* Link */
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../components/Controls/Control";
import useTable from "../components/UseTable";
import {
  getFertilizationAllAxios,
  deleteFertilizationAxios,
  postFertilizationAxios,
  putFertilizationAxios,
} from "../services/FertilizationService";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ModalDialog from "../components/Modals/ModalDialog";
import FertilizationForm from "./FertilizationForm";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import { mapData } from "../components/mapa/mapDataPath";
import SvgMap from "../components/mapa/svgMap";
import FertilizationAllData from './FertilizationAllData'


//Estilo individual de la pagina
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "40%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

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

const Fertilizacion = () => {
  //Inicializo los estilos
  const styles = useStyles();
  //Estado que tendra la data a editar
  const [dataEdit, setDataEdit] = useState(null);
  //Estado que tiene toda la informacion de la bd
  const [data, setData] = useState([]);
  //Item filtrado por el buscador
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //Estado que me dice si el cuadro de dialogo es para agregar o para editar
  const [openEditOrAdd, setOpenEditOrAdd] = useState(false);
  const [openMoreData, setOpenMoreData] = useState(false);
  const [allData, setAllData] = useState(null)
  //Estado que controla la notificacion
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Estado que controla el cuadro de dialogo al eliminar un dato
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //Filtro para saber que lote es el que se esta buscando
  const [filterLote, setFilterLote] = useState(0);


  //Obtengo los datos de la bd e inicializo el estado de data
  useEffect(() => {
    getFertilizationAllAxios().then((items) => {
      setData(items);
    });
  }, [setData]);

  //Le paso las columnas, la data y el filtro a la tabla
  const {
    TblContainer,
    TablePaginationCustom,
    TblHead,
    dataAfterPagingAndSorting,
  } = useTable(data, fertilizationColumns, filterFn);

  //Busqueda de un dato
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (item) => {
        if (target.value === "") return item;
        else
          return item.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  //Funcion que sirve para saber si el dato es para editar o guardar uno nuevo
  const addOrEdit = (dataF, resetForm) => {
    //Si el dato no contiene un id significa que lo debo guardar
    const newDataF = {
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
    if (newDataF._id === 0)
      postFertilizationAxios(newDataF)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    //En caso contrario es para editar un dato
    else
      putFertilizationAxios(newDataF, newDataF._id).then((response) => {
        const newData = data;
        newData.forEach((fert) => {
          if (fert._id === response._id) {
            fert.lot = response.lot;
            fert.fullName = response.fullName;
            fert.equipment = response.equipment;
            fert.product = response.product;
            fert.technicalVisit = response.technicalVisit;
          }
        });
        setData(newData);
      });
    //Reseteo el formulario
    resetForm();
    //El dato a editar es nulo
    setDataEdit(null);
    //Cierro el formulario
    setOpenEditOrAdd(false);
    //Obtengo la informacion nuevamente
    getFertilizationAllAxios().then((dataFert) => {
      setData(dataFert);
    });
    //Envio una notificacion de confirmacion
    setNotify({
      isOpen: true,
      message: "Se guardo correctamente",
      type: "success",
    });
  };

  //Funcion que me dice si el dato es para editar
  const openModal = (item) => {
    setDataEdit(item);
    setOpenEditOrAdd(!openEditOrAdd);
  };

  const openMoreDataModal = (item)=>{
    setAllData(item);
    setOpenMoreData(!openMoreData)
  }

  //Funcion que me elimina un dato
  const onDelete = (id) => {
    //Primero muestro el cuadro de confirmacion
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    //Envio el id y hago una peticion delete al backend
    deleteFertilizationAxios(id);
    //Obtengo los datos nuevamente y actualizo la tabla
    getFertilizationAllAxios().then((dataF) => {
      setData(dataF);
    });
    //Envio una notificacion para hacerle saber al usuario que se elimino el dato
    setNotify({
      isOpen: true,
      message: "Se elimino el dato correctamente",
      type: "error",
    });
  };
  //Vista a renderizar
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header
            title="Fertilizacion"
            subTitle="Administracion fertilizacion de cultivos"
            icon={<FaPoop />}
          />
        </Grid>
        {/* Creo una seccion para pintar el mapa */}
        <Grid container item xs={12} justify="center" alignItems="center">
          {/* Pinto el mapa y le paso las props necasarias */}
          <SvgMap
            data={mapData}
            filterLote={filterLote}
            setfilterLote={setFilterLote}
            setConfirmDialog={setConfirmDialog}
            confirmDialog={confirmDialog}
            setFilterFn={setFilterFn}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper className={styles.pageContent}>
            <Grid container item xs={11}>
              <Typography variant="h6" component="h5">
                {
                parseInt(filterLote, 10) === 20 ||
                parseInt(filterLote, 10) === 21 ||
                parseInt(filterLote, 10) === 22 ||
                parseInt(filterLote, 10) === 23
                  ? "Se muestran todos los lotes, por favor seleccione un lote en el mapa"
                  : `Busqueda por el lote ${filterLote}`}
              </Typography>
            </Grid>
            <Divider variant="middle" />
            <br />
            <Toolbar>
              <Controls.Input
                label="Buscar dato"
                className={styles.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />

              <Controls.Button
                text="Agregar"
                variant="outlined"
                startIcon={<AddIcon />}
                className={styles.newButton}
                onClick={() => {
                  setOpenEditOrAdd(true);
                  setDataEdit(null);
                }}
              />
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {dataAfterPagingAndSorting().map((item) => (
                  
                    <TableRow key={item._id}>
                      <TableCell>{item.fullName}</TableCell>
                      <TableCell>{item.lot}</TableCell>
                      <TableCell>{item.equipment}</TableCell>
                      <TableCell>{item.method}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.technicalVisit}</TableCell>
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            openModal(item);
                          }}
                        >
                          <EditOutlined />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            openMoreDataModal(item);
                          }}
                        >
                          <EventNoteIcon />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title:
                                "Estas seguro que deseas eliminar el dato?",
                              subTitle: "Esta accion es irreversible",
                              onConfirm: () => {
                                onDelete(item._id);
                              },
                            });
                          }}
                        >
                          <DeleteIcon />
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TablePaginationCustom />
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title="Formulario de Fertilizacion"
        openModal={openEditOrAdd}
        setOpenModal={setOpenEditOrAdd}
      >
        <FertilizationForm dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
      <ModalDialog
        title="Información Completa"
        openModal={openMoreData}
        setOpenModal={setOpenMoreData}
      >
        <FertilizationAllData data={allData}/>
      </ModalDialog>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
};

export default Fertilizacion;
