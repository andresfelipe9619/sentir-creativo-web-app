import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slide from "@material-ui/core/Slide";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import image from "../../assets/iso-fullc-large.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const useStyles = makeStyles(() => ({
  root: { backdropFilter: "blur(3px)" },
  paper: { overflowY: "visible" },
}));

export default function Modal({
  open,
  title,
  loading,
  children,
  disableOk,
  handleClose,
  isSubmitting,
  handleConfirm,
  hideCloseButton,
  hideConfirmButton,
  backgroundColor
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const showLoader = loading || isSubmitting;

  let confirmText = "Aceptar";
  if (isSubmitting) confirmText = "Enviando...";
  if (showLoader) confirmText = "Cargando ...";

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      classes={{ paper: classes.paper }}
      style={{ backgroundColor: backgroundColor }}
      className={classes.root}
      fullScreen={fullScreen}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      {showLoader && <LinearProgress />}
      <img
        src={image}
        alt="sentir creativo logo"
        width={fullScreen ? 60 : 80}
        style={{
          margin: 4,
          position: "absolute",
          left: "46%",
          zIndex: 1000,
          top: fullScreen ? 0 : -32,
        }}
        height="auto"
      />
      {title && (
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography
            color="primary"
            variant="h4"
            style={{ marginTop: fullScreen ? 50 : 0 }}
          >
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!hideCloseButton && (
          <Button onClick={handleClose} color="primary" disabled={showLoader}>
            Cancelar
          </Button>
        )}
        {!hideConfirmButton && (
          <Button
            color="primary"
            onClick={handleConfirm}
            disabled={disableOk || showLoader}
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
