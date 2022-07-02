import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../spinner/Spinner";
import {
  beneficiariosColumns
} from "../modals/schema";
import FormItem from "../master-detail/FormItem";
import Box from '@material-ui/core/Box';
import useFormDependencies from "../../providers/hooks/useFormDependencies";

export default function Beneficiarios(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(beneficiariosColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  Object.keys(dependencies || {}).forEach(key => props.values.storagesDeeps[key] = dependencies[key]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Beneficiarios
        </Typography>

        <Typography gutterBottom>
          Elija el público objetivo que se dirige su experiencia artística:
        </Typography>
      </Grid>

      {beneficiariosColumns.slice(0, 1).map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex" flexDirection="column" style={{ marginBottom: 12 }}>
            <Typography style={{ marginBottom: 24 }}>
              Seleccionar mínimo 3
            </Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}

      {beneficiariosColumns.slice(1, 3).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={dependencies} />)}

      {beneficiariosColumns.slice(3).map((item, i) => (
        <Grid item md={12} key={i} style={{ marginTop: 24 }}>
          <Box display="flex" flexDirection="column">
            <Typography style={{ marginBottom: 24 }}>
              Seleccionar mínimo 3
            </Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
