import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
    backgroundColor: "#007508",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  row: {
    width: "100%",
    height: "3.125rem",
    listStyleType: "none",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#00C20D",
    },
  },
  icons: {
    flex: "30%",
    display: "grid",
    placeItems: "center",
    color: "#000",
  },
  title: {
    flex: "60%",
  },
}));

export default useStyle;
