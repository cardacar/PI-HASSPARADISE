import React, { Fragment, useState, useEffect } from "react";
import { FaTree } from "react-icons/fa";
import Header from "../../components/Header";
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
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../../components/Controls/Control";
import useTable from "../../components/UseTable";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ModalDialog from "../../components/Modals/ModalDialog";
import SowingForm from "./SowingForm";
import SowingAllData from "./SowingAllData";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { mapData } from "../../components/mapa/mapDataPath";
import SvgMap from "../../components/mapa/svgMap";
import {
  getSowingAllAxios,
  deleteSowingAxios,
  postSowingAxios,
  putSowingAxios,
} from "../../services/SowingService";

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

const sowingColumns = [
  { id: "fullName", label: "Nombre empleado" },
  { id: "lot", label: "Lote" },
  { id: "variety", label: "Variedad" },
  { id: "vegetableOrigin", label: "Procedencia vegetal" },
  { id: "totalTrees", label: "Total Arboles" },
  { id: "distance", label: "Distancia" },
  { id: "actions", label: "Acciones" },
];

const Sowing = () => {
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
  const [allData, setAllData] = useState(null);
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
    getSowingAllAxios().then((items) => {
      setData(items);
    });
  }, [setData]);

  //Le paso las columnas, la data y el filtro a la tabla
  const {
    TblContainer,
    TablePaginationCustom,
    TblHead,
    dataAfterPagingAndSorting,
  } = useTable(data, sowingColumns, filterFn);

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

  const addOrEdit = (dataS, resetForm) => {
    const newDataS = {
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
/*       Organomineral: {
        gr: dataS.OrganomineralGr,
        kg: dataS.OrganomineralKg,
      }, */
    };
    if (newDataS._id === 0) {
      postSowingAxios(newDataS)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    } else
      putSowingAxios(newDataS, newDataS._id).then((response) => {
        const newData = data;
        newData.forEach((sow) => {
          if (sow._id === response._id) {
            sow.fullName = response.fullName;
            sow.lot = response.lot;
            sow.variety = response.variety;
            sow.vegetableOrigin = response.vegetableOrigin;
            sow.totalTrees = response.totalTrees;
            sow.distance = response.distance;
          }
        });
        setData(newData);
      });
    resetForm();
    //El dato a editar es nulo
    setDataEdit(null);
    //Cierro el formulario
    setOpenEditOrAdd(false);
    //Obtengo la informacion nuevamente
    getSowingAllAxios().then((dataSow)=>{
        setData(dataSow);
    });
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
  const openMoreDataModal = (item) => {
    setAllData(item);
    setOpenMoreData(!openMoreData);
  };

  //Funcion que me elimina un dato
  const onDelete = (id) => {
    //Primero muestro el cuadro de confirmacion
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    //Envio el id y hago una peticion delete al backend
    deleteSowingAxios(id);
    //Obtengo los datos nuevamente y actualizo la tabla
    getSowingAllAxios().then((dataF) => {
      setData(dataF);
    });
    //Envio una notificacion para hacerle saber al usuario que se elimino el dato
    setNotify({
      isOpen: true,
      message: "Se elimino el dato correctamente",
      type: "error",
    });
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header
            title="Siembra"
            subTitle="Administracion fertilizacion de cultivos"
            icon={<FaTree />}
          />
        </Grid>
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
                {filterLote === 0 ||
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
                    <TableCell>{item.variety}</TableCell>
                    <TableCell>{item.vegetableOrigin}</TableCell>
                    <TableCell>{item.totalTrees}</TableCell>
                    <TableCell>{item.distance}</TableCell>
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
                            title: "Estas seguro que deseas eliminar el dato?",
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
        title="Formulario de Siembra"
        openModal={openEditOrAdd}
        setOpenModal={setOpenEditOrAdd}
      >
        <SowingForm dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
      <ModalDialog
        title="Información Completa"
        openModal={openMoreData}
        setOpenModal={setOpenMoreData}
      >
        <SowingAllData data={allData} />
      </ModalDialog>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
};

export default Sowing;
