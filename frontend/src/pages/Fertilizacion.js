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
import ModalDialog from "../components/Modals/ModalDialog";
import FertilizationForm from "./FertilizationForm";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";

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

const fertilizationColumns = [
  { id: "fullName", label: "Nombre Completo" },
  { id: "equipment", label: "Equipo" },
  { id: "lot", label: "Lote" },
  { id: "method", label: "Metodo" },
  { id: "product", label: "Producto" },
  { id: "technicalVisit", label: "Visita" },
  { id: "composition.B", label: "B" },
  { id: "composition.K2O", label: "K2O" },
  { id: "amount.cc", label: "cc" },
  { id: "actions", label: "Acciones" },
];

const Fertilizacion = () => {
  const styles = useStyles();
  const [dataEdit, setDataEdit] = useState(null);
  const [data, setData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openEditOrAdd, setOpenEditOrAdd] = useState(false);
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

  useEffect(() => {
    getFertilizationAllAxios().then((items) => {
      setData(items);
    });
  }, [setData]);

  const {
    TblContainer,
    TablePaginationCustom,
    TblHead,
    dataAfterPagingAndSorting,
  } = useTable(data, fertilizationColumns, filterFn);

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

  const addOrEdit = (dataF, resetForm) => {
    if (dataF._id === 0)
      postFertilizationAxios(dataF)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    else
      putFertilizationAxios(dataF, dataF._id).then((response) => {
        const newData = data;
        newData.forEach((fert) => {
          if (fert._id === response._id) {
            fert.fullName = response.fullName;
            fert.equipment = response.equipment;
            fert.lot = response.lot;
            fert.product = response.product;
            fert.technicalVisit = response.technicalVisit;
            fert.composition.B = response.composition.B;
            fert.composition.K2O2 = response.composition.K2O2;
            fert.amount.cc = response.amount.cc;
          }
        });
        setData(newData);
      });
    resetForm();
    setDataEdit(null);
    setOpenEditOrAdd(false);
    getFertilizationAllAxios().then((dataFert) => {
      setData(dataFert);
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

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteFertilizationAxios(id);
    getFertilizationAllAxios().then((dataF) => {
      setData(dataF);
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
            title="Fertilizacion"
            subTitle="Administracion fertilizacion de cultivos"
            icon={<FaPoop />}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.pageContent}>
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
                    <TableCell>{item.equipment}</TableCell>
                    <TableCell>{item.lot}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.technicalVisit}</TableCell>
                    <TableCell>{item.composition.B}</TableCell>
                    <TableCell>{item.composition.K2O}</TableCell>
                    <TableCell>{item.amount.cc}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openModal(item);
                          console.log(item._id);
                        }}
                      >
                        <EditOutlined fontSize="inherit" />
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
                              console.log(item._id);
                            },
                          });
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
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
      <Notification notify={notify} setNotify={setNotify}/>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
};

export default Fertilizacion;
