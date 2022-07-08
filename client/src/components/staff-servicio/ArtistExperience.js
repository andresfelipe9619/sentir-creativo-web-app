import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { artistExperienceColumns } from "../modals/schema";
import FormItem from "../master-detail/FormItem";

export default function ArtistExperience(props) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Sube tu experiencia artística!
        </Typography>

        <Typography gutterBottom>
          Rellena este formulario por cada experiencia y recibe oportunidades laborales.
          Recuerda tener a disposición fotografías en la mejor calidad posible.
        </Typography>
      </Grid>

      {artistExperienceColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} />
      ))}

      <Grid item md={12}>
        <Typography gutterBottom>
          Ésta convocatoria estará disponible hasta el 31 de Julio 2022
        </Typography>
      </Grid>
    </Grid>
  );
}
