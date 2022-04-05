import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import BitacoraTable from "./BitacoraTable";
import CreateEntity from "../modals/CreateEntity";
import useAPI from "../../providers/hooks/useAPI";

// TODO: Move to Bitacora section if there will be exists
const columns = [
  {
    name: "entidadId",
    label: "EntidadId",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "entidad",
    label: "Entidad",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "accion",
    label: "Acción",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "fecha",
    label: "Fecha",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "date",
    },
  },
  {
    name: "via",
    label: "Vía",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "relacion",
    label: "Relación",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: -theme.spacing(2),
  },
}));

export default function Bitacora(props) {
  const { title = "Bitácora", data = [] } = props;

  // States
  const [open, setOpen] = useState(false);
  //

  const classes = useStyles();
  const { loading } = useAPI({ service: "Bitacora", initilize: false });

  const handleCloseModal = () => setOpen(false);

  const handleOpenModal = () => setOpen(true);

  const handleCreateBitacora = async () => {
    return Promise.reject();
  };

  return (
    <div className={classes.root}>
      {!!title && (
        <Typography component="legend" variant="h5" paragraph>
          {title}
        </Typography>
      )}

      <Tooltip title={"Crear Bitacora"}>
        <IconButton
          color="primary"
          onClick={handleOpenModal}
          className={classes.button}
          variant="contained"
        >
          <Icon>add_circle</Icon>
        </IconButton>
      </Tooltip>

      <Box width="100%" display="flex" flexWrap={"wrap"}>
        <BitacoraTable data={data} />
      </Box>

      <CreateEntity
        open={open}
        entity={"Bitacora"}
        handleClose={handleCloseModal}
        handleCreate={handleCreateBitacora}
        loading={loading}
        columns={columns}
      />
    </div>
  );
}
