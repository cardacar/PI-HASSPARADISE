import {createMuiTheme} from '@material-ui/core/styles';
//Creacion de paleta de colores para un tema en mi pagina  web
const palette = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#334AB0',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f05545',
        main: '#b71c1c',
        dark: '#7f0000',
        contrastText: '#000',
      },
      customBlue:{
        light:'#6f74dd',
        main:'#3949ab',
        dark:'##00227b'
      }
    },
  });

export default palette;