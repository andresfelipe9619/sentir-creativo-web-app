import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  artistsTech2Columns} from "../modals/schema";
import FormItem from "../master-detail/FormItem";

export default function ArtistTech2(props) {
  const oneHour = 1000 * 60 * 60;

  const horarios = [
    { label: "30 minutos", value: oneHour / 2 },
    { label: "1 hora", value: oneHour },
    { label: "1 hora y 30 minutos", value: oneHour + oneHour / 2 },
    { label: "2 horas", value: oneHour * 2 },
    { label: "3 horas", value: oneHour * 3 },
    { label: "4 horas", value: oneHour * 4 },
    { label: "5 horas", value: oneHour * 5 },
    { label: "Más tiempo", value: oneHour * 6 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Ficha artística
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography gutterBottom>Duración en ejecución:</Typography>
      </Grid>
      {artistsTech2Columns.slice(0, 2).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={{ horarios }} />)}

      <Grid item md={12} style={{ marginTop: 24 }}>
        <Typography>
          Cantidad de sesiones:

          <Typography gutterBottom color="textSecondary">
            ¿Cuantas sesiones mínimas y máximas para que sus Servicio se realice correctamente?
          </Typography>
        </Typography>
      </Grid>
      {artistsTech2Columns.slice(2, 4).map((item, i) => <FormItem key={i} item={item} {...props} />)}

      <Grid item md={12} style={{ marginTop: 24 }}>
        <Typography gutterBottom>Duración en montaje y desmontaje, si lo hubiere:</Typography>
      </Grid>
      {artistsTech2Columns.slice(4).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={{ horarios }} />)}

    </Grid>
  );
}
