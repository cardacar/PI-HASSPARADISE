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
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../components/Controls/Control";
import Header from "../components/Header";
import UseTable from "../components/UseTable";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ModalDialog from "../components/Modals/ModalDialog";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import { mapData } from "../components/mapa/mapDataPath";
import SvgMap from "../components/mapa/svgMap";


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

const Prueba = (props) => {

  const {
    title,
    subTitle,
    modalTitleForm,
    columns,
    getFumigationAllAxios,
    postFumigationnAxios,
    putFumigationnAxios,
    deleteFumigationAxios,
    IconInitial,
    dataPost,
    newDataList,
    newDataResponse,
    FumigationForm,
    FumigationAllData,
    cell
  } = props;

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
    viewData: false,
    dataMap: {}
  });
  const [filterLote, setFilterLote] = useState(0);
  
  useEffect(() => {
      setData(dataPost);
  }, [dataPost]);

  const {
    TblContainer,
    TblHead,
    TablePaginationCustom,
    dataAfterPagingAndSorting,
  } = UseTable(data, columns, filterFn);

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

  const addOrEdit = (dataFum, resetForm) => {
    const formatNewData = newDataList(dataFum);
    if (formatNewData._id === 0)
      postFumigationnAxios(formatNewData)
        .then((response) => {
          setData(data.concat(response));
        })
        .catch((error) => console.log(error));
    else
      putFumigationnAxios(formatNewData, formatNewData._id).then((response) => {
        const newData = data;
        newData.forEach((dataFum) => {
          if (dataFum._id === response._id) {
            newDataResponse(dataFum,response);
          }
        });
        setData(newData);
      });
    resetForm();
    setDataEdit(null);
    setOpenEditOrAdd(false);
    getFumigationAllAxios().then((dataFum) => {
      setData(dataFum);
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
    getFumigationAllAxios().then((dataFum) => {
      setData(dataFum);
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
          <Header title={title} subTitle={subTitle} icon={<IconInitial />} />
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
                    {cell(item)}
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
        title={modalTitleForm}
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
        <FumigationAllData data={allData} />
      </ModalDialog>

      <Notification notify={notify} setNotify={setNotify} />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
};

export default Prueba;
