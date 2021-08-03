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
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Header from "../../components/Header";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../../components/Controls/Control";
import UseTable from "../../components/UseTable";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalDialog from "../../components/Modals/ModalDialog";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  getInventoryAllAxios,
  postInventoryAxios,
  putInventoryAxios,
  deleteInventoryAxios,
} from "../../services/InventoryService";
import InventoryForm from './InventoryForm'

import { FaFileInvoice } from "react-icons/fa";

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

//Columnas que tendra la tabla
const inventoryColumns = [
    { id: "product", label: "Producto" },
    { id: "activeIngredient", label: "Ingrediente Activo" },
    { id: "typeProduct", label: "Tipo de Producto" },
    { id: "module", label: "Modulo" },
  ];

const Inventory = () => {
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
    viewData: false,
    dataMap: {},
  });

  useEffect(() => {
    getInventoryAllAxios().then((items) => {
      setData(items);
    });
  }, [setData]);
  
  const {
    TblContainer,
    TablePaginationCustom,
    TblHead,
    dataAfterPagingAndSorting,
  } = UseTable(data, inventoryColumns, filterFn);

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
    //Si el dato no contiene un id significa que lo debo guardar
    const newDataF = {
      _id: dataF._id,
      product: dataF.product,
      activeIngredient: dataF.activeIngredient,
      typeProduct: dataF.typeProduct,
      module: dataF.module,
      
    };
    if (newDataF._id === 0)
      postInventoryAxios(newDataF)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    //En caso contrario es para editar un dato
    else
      putInventoryAxios(newDataF, newDataF._id).then((response) => {
        const newData = data;
        newData.forEach((fert) => {
          if (fert._id === response._id) {
            fert.product = response.product;
            fert.activeIngredient = response.activeIngredient;
            fert.typeProduct = response.typeProduct;
            fert.module = response.module;
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
    getInventoryAllAxios().then((dataFert) => {
      setData(dataFert);
    });
    //Envio una notificacion de confirmacion
    setNotify({
      isOpen: true,
      message: "Se guardo correctamente",
      type: "success",
    });
  };



  const openModal = (item) => {
    setDataEdit(item);
    setOpenEditOrAdd(!openEditOrAdd);
  };



  //Funcion que me elimina un dato
  const onDelete = (id) => {
    //Primero muestro el cuadro de confirmacion
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    //Envio el id y hago una peticion delete al backend
    deleteInventoryAxios(id);
    //Obtengo los datos nuevamente y actualizo la tabla
    getInventoryAllAxios().then((dataF) => {
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
            title="Inventario"
            subTitle="Inventario de productos en la empresa"
            icon={<FaFileInvoice />}
          />
        </Grid>
        {/* Creo una seccion para pintar el mapa */}

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
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.activeIngredient}</TableCell>
                      <TableCell>{item.typeProduct}</TableCell>
                      <TableCell>{item.module}</TableCell>
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
        <InventoryForm dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  )};

export default Inventory;
