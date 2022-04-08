import { useState } from 'react'
import { useParams } from "react-router"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import { formatDate } from '../../utils'
import useAPI from "../../providers/hooks/useAPI"
import { useAlertDispatch } from "../../providers/context/Alert";
import API from '../../api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  }
}));

export default function Comments(props) {
  const {
    title = 'Comentarios',
    data = [],
    parent,
    initParent
  } = props;

  const classes = useStyles();

  const [value, setValue] = useState('');

  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { create } = useAPI({ service: 'Comentarios' });

  const { openAlert } = useAlertDispatch();

  const handleAddComment = async () => {
    try {
      if (!params.id) return;

      setLoading(true);
      const created = await create( { comentario: value } );
      const parentServiceName = parent[ 0 ]?.toUpperCase() + parent?.slice( 1 );
      const parentService = API[ parentServiceName ];
      await parentService.update( params.id, { comentarios: [ ...data, created ] } );

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

  return (
    <div className={classes.root}>
      {!!title && (
        <Typography component="legend" variant="h5" paragraph>
          {title}
        </Typography>
      )}

      <Grid container spacing={1} justifyContent='flex-end' style={{ marginBottom: 16 }}>
        <Grid item xs={12}>
          <TextField
            label='Nuevo comentario'
            multiline
            maxRows={8}
            fullWidth
            value={value}
            onChange={({ target }) => setValue(target.value)}
            disabled={loading}
            InputProps={loading && {
              startAdornment: (
                <InputAdornment position="end">
                  <CircularProgress size={24} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item>
          <Button color='primary' onClick={handleAddComment} disabled={!value.trim().length || loading}>
            Agregar comentario
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {data?.map( x => (
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography variant="body2" component="p">{x?.comentario}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDate( x?.created_at, false )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
