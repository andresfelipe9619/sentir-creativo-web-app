import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../spinner/Spinner";
import {
  serviceIdentificationColumns
} from "../modals/schema";
import FormItem from "../master-detail/FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";

export default function ServiceIdentification(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(serviceIdentificationColumns);

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
          Identificación del servicio
        </Typography>
      </Grid>

      {serviceIdentificationColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={dependencies} />
      ))}
    </Grid>
  );
}
