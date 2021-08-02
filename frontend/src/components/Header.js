import React from "react";
import { Paper, Card, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  Header: {
    padding: theme.spacing(4),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#007508",
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: 0.6,
    },
  },
}));

const Header = (props) => {
  const styles = useStyles();
  const { title, subTitle, icon } = props;

  return (
    <Paper elevation={0} square className={styles.root}>
      <div className={styles.Header}>
        <Card className={styles.pageIcon}>{icon}</Card>
        <div className={styles.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
