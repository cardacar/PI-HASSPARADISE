import axios from 'axios';
const baseUrl = "http://localhost:3001/api/hpd/";
let token = null;


const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getReportAxios = async (props) => {
    const {module, lot, date1, date2} = props
    const logInToken = window.localStorage.getItem("logInUser");
    setToken(logInToken);
    const config = {
      headers: {
        Authorization: token,
      },
    };
  //?module=fumigation&lot=1&date1=2021-06-16&date2=2021-07-29
    const response = await axios.get(`${baseUrl}report?module=${module}&lot=${lot}&date1=${date1}&date2=${date2}`, config);
    return response.data;
  };

export const getDataForReport = () => ([
    { id: "fertilization", title: "Fertilizacion" },
    { id: "fumigation", title: "Fumigacion" },
    { id: "sowing", title: "Siembra" },
    { id: "precipitation", title: "Precipitacion" },
    { id: "inventory", title: "Inventario" },
  ]);

  export const getLotForReport = () => ([
    { id: "all", title: "Todos" },
    { id: "1", title: "1" },
    { id: "2", title: "2" },
    { id: "3", title: "3" },
    { id: "4", title: "4" },
    { id: "5", title: "5" },
    { id: "6", title: "6" },
    { id: "7", title: "7" },
    { id: "8", title: "8" },
    { id: "9", title: "9" },
    { id: "10", title: "10" },
    { id: "11", title: "11" },
    { id: "12", title: "12" },
  ]);