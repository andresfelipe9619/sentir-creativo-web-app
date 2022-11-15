import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';
import AudienciaTable from './AudienciaTable';
import useFormDependencies from '../../providers/hooks/useFormDependencies';
import { customBodyRender } from '../master-detail/MasterDetail';
import { useAlertDispatch } from '../../providers/context/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AudienciaModal from './AudienciaModal';
import DialogButton from '../buttons/DialogButton';
import API from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: -theme.spacing(2),
  },
}));

const columns = [
  {
    name: "estado",
    label: "Estado Audiencia",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      dependency: "AudienceState",
    },
  },
  {
    name: "rubro",
    label: "Rubro",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      dependency: "Rubro",
    },
  },
  {
    name: "estadoProyecto",
    label: "Estado Proyecto",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      dependency: "EstadoProyecto",
    },
  },
];

export default function Audiencia(props) {
  const { title = "Audiencia", data = [], initParent } = props;
  const classes = useStyles();
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(columns);
  const [values, setValues] = useState({ estado: null, rubro: null });
  const [open, setOpen] = useState(false);
  const { openAlert } = useAlertDispatch();
  const parameters = useParams();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  const handleFormSubmit = () => {
    const hasValue = Object.values(values).filter(Boolean).length;

    if (!hasValue) {
      openAlert({
        variant: "error",
        message: "Debe seleccionar algun filtro",
      });
      return;
    }

    setOpen(true);
  };

  const onAdd = (value) => {
    initParent();
  }

  const onDelete = async (audienciaList = []) => {
    let audiencias = data.filter(x => !audienciaList?.map(x => x.id)?.includes(x.id));

    if (!audienciaList.length) {
      audiencias = [];
    }

    return await API.Difusion.update(parameters.id, { audiencias })
      .then(() => initParent());
  };

  const handleChange = ({ target }) => {
    setValues(x => ({
      ...x,
      [target.name]: target.value
    }));
  };

  const onSelectedChange = ({ target }, item) => {
    const isAdd = target.checked;
    const index = data.findIndex(x => x.id === item.id);
    const newItems = [...selected];

    if (isAdd) {
      newItems.push(item);
    } else {
      newItems.splice(index, 1);
    }

    setSelected(newItems);
  };

  const onDeleteSelected = async () => {
    await onDelete(selected);
    setSelected([]);
    return Promise.resolve();
  };

  if (loadingDependencies) return null

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems={'baseline'} style={{ width: '100%' }}>
        {!!title && (
          <Typography component="legend" variant="h5" paragraph>
            {title}
          </Typography>
        )}

        <Button
          color="primary"
          onClick={handleFormSubmit}
          style={{ marginRight: 8, marginLeft: 'auto' }}
        >
          Buscar
        </Button>

        {!!data.length && (
          <DialogButton
            label={'Sacar todos'}
            title={'Sacar todos'}
            description={'¿Estás seguro que deseas realizar esta acción?'}
            color="inherit"
            onClose={async (accepted) =>
              accepted && (await onDelete())
            }
          />
        )}

        {!!selected.length && (
          <DialogButton
            label={'Sacar selección'}
            title={'Sacar selección'}
            description={'¿Estás seguro que deseas realizar esta acción?'}
            color="inherit"
            onClose={async (accepted) =>
              accepted && (await onDeleteSelected())
            }
          />
        )}
      </Box>

      <Grid container spacing={6}>
        {columns.map((item, i) => {
          const key = item.name;
          const value = values[key];
          const options = (dependencies || {})[item.form.dependency] || [];

          return (
            <Grid item md={item.form.size} key={key}>
              <Autocomplete
                disablePortal
                id={key}
                options={options.map((option) => option.value)}
                value={value || ""}
                onChange={(e) => {
                  const value = options.find(x => x.label === e.target.innerText)?.value;
                  const event = { target: { name: key, value } };
                  return handleChange(event);
                }}
                getOptionLabel={(option) => options.find(x => x.value === option)?.label || ''}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    key={key}
                    label={item.label}
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </Grid>
          )
        })}
      </Grid>

      <Box width="100%" display="flex" flexWrap={"wrap"}>
        <AudienciaTable data={data} remove={onDelete} onSelected={onSelectedChange} selected={selected} />
      </Box>

      {open && (
        <AudienciaModal open={true} close={() => setOpen(false)} includes={data} params={values} onAdd={onAdd} />
      )}
    </div>
  );
}
