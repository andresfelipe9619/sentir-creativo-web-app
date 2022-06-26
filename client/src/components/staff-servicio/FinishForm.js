import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function FinishForm({ handleCloseModal, handleReset, staffName }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Lo lograste!
        </Typography>

        <Typography gutterBottom style={{ fontWeight: 700 }}>
          ¡Felicitaciones! Ya has subido una experiencia artística.
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          <strong>{staffName}</strong> gracias por confiar en nuestra propuesta.
          La siguiente etapa es una revisión final, ajustes fotográficos y la creación del dossier.
          Estamos muy cerca de <strong>conectarte con oportunidades laborales.</strong>
        </Typography>

        <Typography gutterBottom style={{ fontWeight: 700 }}>
          ¡Se paciente, nos comunicaremos a la brevedad!
        </Typography>
      </Grid>

      <Grid item md={12}>
        <img
          width="100%"
          src="https://live.staticflickr.com/7132/26854237651_480cff5e7b_k.jpg"
          alt="portada"
        />
      </Grid>

      <Grid item md={12} style={{ marginLeft: "auto", textAlign: "right" }}>
        <Button
          color="primary"
          variant="text"
          style={{ margin: 14 }}
          onClick={handleReset}
        >
          Subir otro servicio
        </Button>

        <Button
          color="primary"
          variant="contained"
          style={{ margin: 14 }}
          onClick={handleCloseModal}
        >
          Ir a ver catálogo
        </Button>
      </Grid>
    </Grid>
  );
}
