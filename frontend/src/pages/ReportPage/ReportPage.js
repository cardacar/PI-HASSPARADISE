import React, { Fragment, useState } from "react";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Header from "../../components/Header";
import { Grid, makeStyles, Paper} from "@material-ui/core";
import Controls from "../../components/Controls/Control";
import { useForm, Form } from "../../components/Form";
import * as ReportService from "../../services/ReportsService";
import ReportPageFumigation from './ReportPageFumigation'
const useStyles = makeStyles((theme) => ({
  root: {
    height: "40vh",
  },
  image: {
    "& .MuiCardMedia-img": {
      objectFit: "contain",
    },
  },
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

const ReportPage = () => {
  const styles = useStyles();
  const [data, setData] = useState(null);
  const [renderReport, setRenderReport] = useState(false)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };
  const { values, errors,setErrors,  handleInputChange } = useForm("", true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        module: values.module,
        lot: values.lot,
        date1: values.date1,
        date2: values.date2
      }
      ReportService.getReportAxios(data).then((response) => {
        setData(response.report)
      })
      setRenderReport(!renderReport)

    }
  };
  
  const downloadSubmit =()=>{
    
  }

  return (
    <Fragment>
      <Grid container component="main" className={styles.root} spacing={0}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header
              title="Reportes"
              subTitle="En esta pagina padra realizar los reportes correspondientes"
              icon={<AssessmentIcon />}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.pageContent}>
            <Form onSubmit={handleSubmit}>
              <Grid container item xs={12} spacing={0}>
                <Grid item xs={6}>
                  <Controls.Select
                    label="Modulo*"
                    name="module"
                    value={values.module ? values.module : ""}
                    onChange={handleInputChange}
                    options={ReportService.getDataForReport()}
                    errors={errors.module}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Select
                    label="Lote*"
                    name="lot"
                    value={values.lot ? values.lot: ""}
                    onChange={handleInputChange}
                    options={ReportService.getLotForReport()}
                    errors={errors.lot}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={0}>
                <Grid item xs={6}>
                <Controls.Input
                    name="date1"
                    label="Desde*"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue="2021-01-01"
                    value={values.date1}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    name="date2"
                    label="Hasta*"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue="2021-01-01"
                    value={values.date2 ? values.date2 : undefined}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <div>
                <Controls.Button type="submit" text="Generar" />
                <Controls.Button text="Descargar" onClick={()=>downloadSubmit()}/>
              </div>
              <div>
              </div>
            </Form>
          </Paper>
          {
            renderReport ? <ReportPageFumigation data={data}/>:""
          }
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ReportPage;
