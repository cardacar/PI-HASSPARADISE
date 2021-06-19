import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography} from '@material-ui/core';
import Controls from '../Controls/Control'
import CloseIcon from '@material-ui/icons/Close'

//Estilo individual de la pagina de dialogo
const useStyles = makeStyles((theme) => ({
    dialogWraper:{
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle:{
        paddingRigth:'0px'
    }
}))

const ModalDialog = (props) => {
    const {title, children, openModal, setOpenModal} = props;
    const styles = useStyles();

    return (
        <Dialog open={openModal} maxWidth="md" classes={{paper: styles.dialogWraper}}>
            <DialogTitle className={styles.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component='div' style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>

        </Dialog>
    )
}

export default ModalDialog
