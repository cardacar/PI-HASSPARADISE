import {createMuiTheme} from '@material-ui/core/styles';
//Creacion de paleta de colores para un tema en mi pagina  web
const palette = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#4AF755',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

export default palette;