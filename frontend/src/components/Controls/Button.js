import React from 'react'
import {Button as MuiButton, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform:'none'
    }
}))

export default function Button(props) {
    const {text, size, color, variant, onClick, ...others} = props;
    const styles = useStyles();
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