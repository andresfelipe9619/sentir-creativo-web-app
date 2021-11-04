import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const useStyles = makeStyles(theme => ({
  root: { backdropFilter: 'blur(3px)' }
}))

export default function Modal ({
  open,
  title,
  children,
  handleClose,
  isSubmitting,
  handleConfirm,
  hideCloseButton,
  hideConfirmButton
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      className={classes.root}
      fullScreen={fullScreen}
      keepMounted={false}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      TransitionComponent={Transition}
    >
      {title && <DialogTitle id='form-dialog-title'>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!hideCloseButton && (
          <Button onClick={handleClose} color='primary' disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
        {!hideConfirmButton && (
          <Button
            color='primary'
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Aceptar'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
