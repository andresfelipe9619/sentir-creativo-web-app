import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StaffServicioModal from '../components/modals/StaffServicioModal';

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: "10rem",
    backgroundColor: "#ffeb12",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "none",
    }
  }
}));

export default function StaffServicio() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.replace('/');
  }

  return (
    <Container className={classes.container}>
      <Grid container spacing={10} justifyContent="center">
        <StaffServicioModal handleClose={handleClose} open={open} />
      </Grid>
    </Container>
  )
}
