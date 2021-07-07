import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
    backgroundColor: "#334AB0",
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
      backgroundColor: "#212F70",
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
