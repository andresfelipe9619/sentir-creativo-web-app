import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../spinner/Spinner";
import {
  artistsTechColumns} from "../modals/schema";
import FormItem from "../master-detail/FormItem";
import Box from '@material-ui/core/Box';
import useFormDependencies from "../../providers/hooks/useFormDependencies";


export default function ArtistTech(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(artistsTechColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  Object.keys(dependencies || {}).forEach(key => props.values.storagesDeeps[key] = dependencies[key]);

  const labels = [
    'Seleccionar mínimo 3',
    'Seleccionar mínimo 5',
    '¿Cuántas personas desarrollarán la experiencia?',
    '¿Cuántas personas se necesitan de apoyo para desarrollar la experiencia? (Técnicos, etc.)'
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Ficha artística
        </Typography>
      </Grid>

      {artistsTechColumns.map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom>{labels[i]}</Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
