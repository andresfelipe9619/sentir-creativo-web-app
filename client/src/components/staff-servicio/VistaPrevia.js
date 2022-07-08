import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Chip from "@material-ui/core/Chip";
import ServiceCard from "../card/ServiceCard";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function VistaPrevia(props) {
  const storagesDeeps = props.values.storagesDeeps;
  const mapWithName = (x) => ({ ...x, nombre: x.label });
  console.log(props.values);
  const servicio = {
    area: storagesDeeps.Area?.find(x => x.id === props.values.area.id),
    tags: props.values.tags?.map(x => mapWithName(storagesDeeps.Tag?.find(y => y.value === x))),
    sintesis: props.values.sintesis,
    archivos: [{ path: props.values.archivos?.find(x => x.tipo === 28)?.img?.src || 'https://sentircreativo.s3.us-east-2.amazonaws.com/images/defaultImageServicio.jpg' }],
    ocasions: props.values.ocasiones?.map(x => mapWithName(storagesDeeps.Ocasion?.find(y => y.value === x))),
    nombre: props.values.servicioNombre,
    tecnica_artisticas: props.values.tecnicasArtisticas?.map(x => mapWithName(storagesDeeps.TecnicaArtistica?.find(y => y.value === x))),
    slogan: props.values.slogan,
    formatos: props.values.formato?.map(x => mapWithName(storagesDeeps.Formato?.find(y => y.value === x))),
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" style={{ marginBottom: '2rem' }}>
          Vista Previa
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Box style={{ marginTop: '-2.5rem' }}>
          <ServiceCard
            service={servicio}
            color={props.values.area.colorPrimario || '#304ffe'}
            handleClickPrimary={() => { }}
            handleClickSecundary={() => { }}
          />
        </Box>
      </Grid>

      <Grid container item md={6} component={Box} bgcolor="#8080801f" alignItems="center"
        style={{ maxHeight: 400, overflow: 'auto', padding: '1rem' }}>
        <Grid item md={12}>
          <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
            <strong>Resumen</strong>
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Nombre experiencia:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.nombre}
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Slogan:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.slogan}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Técnicas artísticas:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.tecnica_artisticas?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Descripción:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.sintesis}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Área:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.area.nombre}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Tags</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.tags?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Formato</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.formatos?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <Box mt={3}>
          <FormControlLabel
            control={<Checkbox checked={props.values.accept2} onChange={props.handleChange} name="accept2" />}
            label="Acepto enviar mi servicio artístico para recibir oportunidades laborales"
          />
        </Box>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept3} onChange={props.handleChange} name="accept3" />}
          label="Conozco y me resuena los Principios de Sentir Creativo."
        />
        <a href="https://www.sentircreativo.com/somos" target="_blank" rel="noreferrer">
          <Chip label={'Leer'} size="small" />
        </a>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept4} onChange={props.handleChange} name="accept4" />}
          label="Acepto las Políticas para ejecutar un servicio artístico con Sentir Creativo."
        />
        <a href="https://drive.google.com/file/d/11RKoIEmR4pi61rfOdEcP31IhRl99koMA/view?usp=sharingt" target="_blank" rel="noreferrer">
          <Chip label={'Leer'} size="small" />
        </a>
      </Grid>
    </Grid>
  );
}
