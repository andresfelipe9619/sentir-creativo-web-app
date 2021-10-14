import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import { useAlert } from '../../providers/context/Alert'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles1 = theme => ({
  success: {
    backgroundColor: theme.palette.success.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.info.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.35rem'
  }
})

function MySnackbarContent (props) {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    customAction,
    ...other
  } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={
        onClose && (
          <>
            {customAction && customAction()}
            {!customAction && (
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                className={classes.close}
                onClick={onClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            )}
          </>
        )
      }
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

class CustomizedSnackbar extends React.PureComponent {
  render () {
    const {
      open,
      message,
      handleClose,
      variant,
      duration,
      position,
      customAction
    } = this.props

    return (
      <Snackbar
        data-cy='brooklyn-alert'
        anchorOrigin={{
          vertical: 'top',
          horizontal: position || 'right'
        }}
        open={open}
        autoHideDuration={duration || null}
        ClickAwayListenerProps={{
          mouseEvent: false,
          touchEvent: false,
          onClickAway: () => {}
        }}
        onClose={handleClose}
        style={{
          top: '85px'
        }}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
          customAction={customAction}
        />
      </Snackbar>
    )
  }
}

CustomizedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  customAction: PropTypes.func,
  duration: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

function Alert () {
  const [props, { closeAlert }] = useAlert()
  return <CustomizedSnackbar {...props} handleClose={closeAlert} />
}
export { Alert }
export default CustomizedSnackbar
