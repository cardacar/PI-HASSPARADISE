import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton} from '@material-ui/core'
import Control from '../components/Controls/Control';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

const ConfirmDialog = (props) => {
    const {confirmDialog, setConfirmDialog} = props
    const styles = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes = {{paper: styles.dialog}}>
            <DialogTitle className={styles.dialogTitle}>
                <IconButton disableRipple className={styles.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={styles.dialogAction}>
                <Control.Button
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Control.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
            
    )
}

export default ConfirmDialog
