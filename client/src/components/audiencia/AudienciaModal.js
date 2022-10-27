import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import AudienciaTable from './AudienciaTable';
import Spinner from '../spinner/Spinner';
import API from '../../api/index';

export default function AudienciaModal({ close, includes = [], params, onAdd }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const parameters = useParams();

  useEffect(() => {
    setLoading(true);

    API.Audiencia.getAll({
      params: {
        ...(params.estado && { estado: params.estado }),
        ...(params.rubro && { 'organizacion.rubro': params.rubro }),
        ...(params.estadoProyecto && { 'proyectos.estado_proyecto': params.estadoProyecto })
      }
    }).then(res => {
      setData(res.filter(x => !includes.map(y => y.id).includes(x.id)))
    }).finally(() => setLoading(false));
  }, [params, includes]);


  const add = () => {
    setLoading(true);

    API.Difusion.update(parameters.id, {
      audiencias: data
    }).then(() => onAdd(data))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Dialog open={true} onClose={close} fullWidth maxWidth="md">
      <Box display="flex" p={3}>
        {!!data.length && (
          <Button
            color="primary"
            onClick={() => add(data)}
          >
            Agregar todos
          </Button>
        )}
        <Button
          color="primary"
          onClick={close}
        >
          Cerrar
        </Button>
      </Box>

      <AudienciaTable data={data} />
    </Dialog>
  );
}
