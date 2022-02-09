import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function DialogButton(props) {
    const {
        label = 'Eliminar',
        title = 'Eliminar elemento',
        description = '¿Estas seguro que quieres eliminar este elemento?',
        onClose,
        buttonProps
    } = props

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const openDialog = () => setOpen(true)

    const closeDialog = async (accepted) => {
        setOpen(false)

        if (typeof onClose === 'function') {
            setLoading(true)
            await onClose(accepted)
            setLoading(true)
        }
    };

    return (
        <>
            <Button size='small' color='primary' onClick={openDialog}
                {...buttonProps}>
                {!loading ? label : <CircularProgress />}
            </Button>

            <Dialog open={open} onClose={() => closeDialog(false)} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>

                {!loading && (
                    <DialogActions>
                        <Button onClick={() => closeDialog(false)} color="primary">
                            No
                        </Button>

                        <Button onClick={() => closeDialog(true)} color="primary" autoFocus>
                            Si
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
}