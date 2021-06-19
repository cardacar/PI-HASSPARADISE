import React from 'react'
import {Button, makeStyles} from '@material-ui/core'
//Estilo individual para el action button
const useStyle = makeStyles(theme=>({
    root:{
        minWidth:0,
        margin: theme.spacing(0.6)
    },
    secondary:{
        
        '& .MuiButton-label':{
            color: theme.palette.secondary.main
        }
    },
    primary: {
        
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))
//Action button
const ActionButton = (props) => {
    //Extraigo las props pasadas
    const {color, children, onClick} = props
    //asigno los estilos a una variable styles
    const style = useStyle();

    //Boton a renderizar con su props customizadas
    return (
        <Button
            className={`${style.root} ${style[color]}`}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default ActionButton
