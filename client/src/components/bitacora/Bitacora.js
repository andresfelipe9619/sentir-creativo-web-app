import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useParams } from 'react-router';

import API from '../../api';
import { useAlertDispatch } from '../../providers/context/Alert';
import { customBodyRender } from '../master-detail/MasterDetail';
import CreateEntity from '../modals/CreateEntity';
import BitacoraTable from './BitacoraTable';

// TODO: Move to Bitacora section if there will be exists
const columns = [
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
      required: true
    },
  },
  {
    name: "via",
    label: "Vía",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 4,
      type: "select",
      dependency: "vias",
      required: true
    },
  },
  {
    name: "fecha",
    label: "Fecha",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "date",
      required: true
    },
  },
  {
    name: "staf",
    label: "Staff",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 4,
      type: "select",
      dependency: "Staf",
      renderLabel: (x) => `${x.nombre} ${x.apellido}`
    },
  },
  {
    name: "audiencia",
    label: "Audiencia",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 4,
      type: "select",
      renderLabel: (x) => `${x.nombre} ${x.apellido} • ${x?.organizacion?.nombre || ""}`,
      dependency: "Audiencia"
    },
  }
];

const vias = [
  'Sentircreativo.com',
  'Gmail',
  'admin',
  'Celular',
  'Whatsapp',
  'En persona'
].map(x => ({ label: x, value: x }));

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
  const { title = "Bitácora", data = [], parent, initParent } = props;

  // States
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  //

  const classes = useStyles();

  const params = useParams();
  const { openAlert } = useAlertDispatch();

  const handleCloseModal = () => setOpen(false);

  const handleOpenModal = () => {
    setOpen(true);
    setEditingValue(null);
  };

  const handleCreateBitacora = async (value) => {
    try {
      if (editingValue) {
        await editBitacora(value);
        return;
      }

      setLoading(true);
      const created = await API.Bitacora.create(value);
      const parentServiceName = parent[0]?.toUpperCase() + parent?.slice(1);
      const parentService = API[parentServiceName];
      await parentService.update(params.id, {
        bitacoras: [...data, created]
      });

      await initParent();
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  }

  const editBitacora = async (value) => {
    try {
      setLoading(true);
      const { id } = editingValue;

      const updated = await API.Bitacora.update(id, value);
      const parentServiceName = parent[0]?.toUpperCase() + parent?.slice(1);
      const parentService = API[parentServiceName];
      await parentService.update(params.id, {
        bitacoras: [...data.filter(x => x.id !== id), updated]
      });

      await initParent();

      setEditingValue(null);
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id = 0) => {
    try {
      setLoading(true);
      await API.Bitacora.delete(id);
      await initParent();
      openAlert({
        variant: "success",
        message: "¡Borrado correctamente!",
      });
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrepareToEdit = (value = {}) => {
    setEditingValue({
      id: value.id,
      accion: value.accion,
      audiencia: value.audiencia?.id,
      staf: value.staf?.id,
      via: value.via
    });
    setOpen(true);
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
        <BitacoraTable data={data} remove={handleDelete} edit={handlePrepareToEdit} />
      </Box>

      {open && <CreateEntity
        open={true}
        entity={"Bitacora"}
        handleClose={handleCloseModal}
        handleCreate={handleCreateBitacora}
        loading={loading}
        columns={columns}
        staticDependencies={{ vias }}
        initialState={editingValue}
      />}
    </div>
  );
}
