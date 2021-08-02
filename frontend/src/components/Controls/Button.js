import React from 'react'
import {Button as MuiButton, makeStyles} from '@material-ui/core'
//Estilo individual para el button
const useStyles = makeStyles((theme) => ({
    root:{
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform:'none'
    }
}))

//button
export default function Button(props) {
    //Extraigo las props pasadas
    const {text, size, color, variant, onClick, ...others} = props;
    //asigno los estilos a una variable styles
    const styles = useStyles();

    //Boton a renderizar con su props customizadas
    return (
        <MuiButton
            variant={variant || 'contained'}
            size={size || 'large'}
            color={color || 'primary'}
            onClick={onClick}
            {...others}
            classes={{root:styles.root, label:styles.label}}
        >
            {text}
        </MuiButton>
    )
}