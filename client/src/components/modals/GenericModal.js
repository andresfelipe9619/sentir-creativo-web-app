import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function Modal ({
  open,
  title,
  children,
  handleClose,
  handleConfirm,
  hideCloseButton,
  hideConfirmButton
}) {
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      keepMounted={false}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      {title && <DialogTitle id='form-dialog-title'>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!hideCloseButton && (
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
        )}
        {!hideConfirmButton && (
          <Button onClick={handleConfirm} color='primary'>
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
