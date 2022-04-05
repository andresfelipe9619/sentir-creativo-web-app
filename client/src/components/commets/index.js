import { useState } from 'react'
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { formatDate } from '../../utils'
import useAPI from "../../providers/hooks/useAPI";

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: -theme.spacing( 2 ),
  },
} ) );

export default function Comments ( props )
{
  const { title = 'Comentarios', data = [] } = props;

  const classes = useStyles();

  const [value, setValue] = useState('');

  const { loading, create: createEntity } = useAPI("Comentarios", null, false);

  const handleAddComment = async () => {
    // if (!params.id) return;
    const created = await createEntity({ comentario: value });
    console.log(`CREATED ->`, created);
    // if (!fileCreated) return;
    // const result = await api.addFiles2Entity(params.id, parent, [
    //   fileCreated.id,
    // ]);
    // console.log(`result`, result);
    // await initParent();
  }

  console.log('LOADING ->', loading);

  return (
    <div className={ classes.root }>
      { !!title && (
        <Typography component="legend" variant="h5" paragraph>
          { title }
        </Typography>
      ) }

      <Grid container spacing={1} justifyContent='flex-end' style={{ marginBottom: 16 }}>
        <Grid item xs={12}>
          <TextField
            label='Nuevo comentario'
            multiline
            maxRows={8}
            fullWidth
            value={value}
            onChange={({ target }) => setValue(target.value)}
            // disabled={loading}
            // InputProps={loading && {
            //   startAdornment: (
            //     <InputAdornment position="end">
            //       <CircularProgress size={24} />
            //     </InputAdornment>
            //   ),
            // } }
          />
        </Grid>

        <Grid item>
          <Button color='primary' onClick={handleAddComment} disabled={!value.trim().length}>
            Agregar comentario
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {data?.map(x => (
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography variant="body2" component="p">{x?.comentario}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDate(x?.created_at,  false)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
