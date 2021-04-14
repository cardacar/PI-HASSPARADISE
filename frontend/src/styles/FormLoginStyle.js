import {makeStyles} from '@material-ui/core/styles';
import Aguacate from '../img/aguacate.jpg'



const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh'
    },
    image: {
      backgroundImage: `url(${Aguacate})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#00C20D !important',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    link: {
      color: '#000000 !important'
    },
    textField: {
      '&:active:after':{
        borderColor: 'red !important'
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: '#007508 !important',
      color: 'white !important' ,
      '&:hover': {
        background: "#00F511 !important",
        color: '#000000 !important'
      }

    }
    
  }));

  export default useStyles;