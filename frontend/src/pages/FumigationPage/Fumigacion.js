import React, { Fragment, useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Grid,
  Divider,
  Typography
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../../components/Controls/Control";
import Header from "../../components/Header";
import { FaTractor } from "react-icons/fa";
import UseTable from "../../components/UseTable";
import {
  getFumigationAllAxios,
  postFumigationnAxios,
  putFumigationnAxios,
  deleteFumigationAxios,
} from "../../services/FumigationService";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ModalDialog from "../../components/Modals/ModalDialog";
import FumigationForm from "./FumigationForm";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { mapData } from "../../components/mapa/mapDataPath";
import SvgMap from "../../components/mapa/svgMap";
import FumigationAllData from "./FumigationAllData";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "80%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Nombre empleado" },
  { id: "lot", label: "Lote" },
  { id: "supplies", label: "Insumo" },
  { id: "activeIngredients", label: "Ingrediente activo" },
  { id: "plague", label: "Plaga" },
  { id: "actions", label: "Acciones" },
];

const Fumigacion = () => {
  const styles = useStyles();
  const [dataEdit, setDataEdit] = useState(null);
  const [data, setData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openEditOrAdd, setOpenEditOrAdd] = useState(false);
  const [openMoreData, setOpenMoreData] = useState(false);
  const [allData, setAllData] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filterLote, setFilterLote] = useState(0);

  useEffect(() => {
    getFumigationAllAxios().then((user) => {
      setData(user);
    });
  }, [setData]);

  const {
    TblContainer,
    TblHead,
    TablePaginationCustom,
    dataAfterPagingAndSorting,
  } = UseTable(data, headCells, filterFn);

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

  const addOrEdit = (user, resetForm) => {
    if (user._id === 0)
      postFumigationnAxios(user)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    else
      putFumigationnAxios(user, user._id).then((response) => {
        const newData = data;
        console.log(newData);
        newData.forEach((user) => {
          if (user._id === response._id) {
            user.fullName = response.fullName;
            user.cc = response.cc;
            user.birthDate = response.birthDate;
            user.role = response.role;
            user.cellphone = response.cellphone;
          }
        });
        setData(newData);
      });
    resetForm();
    setDataEdit(null);
    setOpenEditOrAdd(false);
    getFumigationAllAxios().then((user) => {
      setData(user);
    });
    setNotify({
      isOpen: true,
      message: "Se guardo correctamente",
      type: "success",
    });
  };

  const openModal = (item) => {
    setDataEdit(item);
    setOpenEditOrAdd(true);
  };
  const openMoreDataModal = (item) => {
    setAllData(item);
    setOpenMoreData(!openMoreData);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteFumigationAxios(id);
    getFumigationAllAxios().then((user) => {
      setData(user);
    });
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
            title="Fumigacion"
            subTitle="Administracion de fumigacion de los cultivos"
            icon={<FaTractor />}
          />
        </Grid>

        <Grid container item xs={12} justify="center" alignItems="center">
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
                {parseInt(filterLote, 10) === 0 ||
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
                    <TableCell>{item.supplies}</TableCell>
                    <TableCell>{item.activeIngredients}</TableCell>
                    <TableCell>{item.plague}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openModal(item);
                        }}
                      >
                        <EditOutlined fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openMoreDataModal(item);
                          console.log(allData);
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
                        <DeleteIcon fontSize="small" />
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
        title="Formulario para la edición de fumigacion"
        openModal={openEditOrAdd}
        setOpenModal={setOpenEditOrAdd}
      >
        <FumigationForm dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
      <ModalDialog
        title="Información completa"
        openModal={openMoreData}
        setOpenModal={setOpenMoreData}
      >
        <FumigationAllData dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>

      <Notification notify={notify} setNotify={setNotify} />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
};

export default Fumigacion;
