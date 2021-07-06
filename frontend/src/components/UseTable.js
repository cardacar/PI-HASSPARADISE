//Imports necesarios
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

//Estilo individual de la tabla
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));


//Funcion que me controla toda la tabla
export default function useTable (data, headCells, filterFn) {
  const styles = useStyles();
  //Paginas que contendra la tabla
  const pages = [5, 10, 25];
  //Paginas
  const [page, setPage] = useState(0);
  //Pagina actual
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  //Ordenamiento de los datos
  const [order, setOrder] = useState();
  //Ordenar por algo en especifico
  const [orderBy, setOrderBy] = useState();

  //Contenedor de la tabla
  const TblContainer = (props) => (
    <Table className={styles.table}>{props.children}</Table>
  );

  //header de la tabla, la cual controla el ordenamiento de los datos
  const TblHead = (props) => {
    const handleSort = (cellId) => {
      const isAscending = orderBy === cellId && order === "asc";
      setOrder(isAscending ? "desc" : "asc");
      setOrderBy(cellId);
    };
    //Renderizo el tableHead
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  //Funcion que permite cambiar la pagina de la tabla
  const changePage = (event, newPage) => {
    setPage(newPage);
  };
  //Funcion que detecta el cambio de pagina
  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Paginacion de la pagina, se renderiza ya que es una vista
  const TablePaginationCustom = () => 
    (<TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={data.length}
      onChangePage={changePage}
      onChangeRowsPerPage={changeRowsPerPage}
    />)
  ;
  
  //Funcion que ordena los datos dependiendo de lo que se pase en el order
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  //comparo para saber si se ordena de forma ascendente o descendente
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  //comparador para ordenarlo de forma descendente
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  //data.map(item=>console.log(item))
  //contador de datos para obtener el numero de paginas totales
  const dataAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(data), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  //retorno todos los elementos de la tabla
  return {
    TblContainer,
    TblHead,
    TablePaginationCustom,
    dataAfterPagingAndSorting,
  };
}
