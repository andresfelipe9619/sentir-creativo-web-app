import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

export default function Finanzas(props) {

  const getLiquido = (amount) => {
    if (!amount) return 0;

    amount = parseFloat((''+amount).replace(/\D/g, ''));

    if (isNaN(amount)) return 0;

    const percent = amount * (12.56 / 100);
    return (amount - percent)?.toFixed(2);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Finanzas
        </Typography>

        <Typography gutterBottom>
          Elije un valor mínimo para tus honorarios ( No contemple materiales o insumos ), para realizar la
          experiencia artística en estas condiciones:
        </Typography>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones más favorables
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='masFavorable'
              value={props.values.masFavorable}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.masFavorable)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones Medianas
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='medianas'
              value={props.values.medianas}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.medianas)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones menos favorables
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='menosFavorable'
              value={props.values.menosFavorable}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.menosFavorable)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Typography gutterBottom>
          El valor referencial Líquido, se ha calculado con el 12,25% del impuesto del SII, Mayo 2022, a las boletas
          de honorarios
        </Typography>

        <Typography gutterBottom>
          Y recuerda que recibirás un contrato antes de cualquier proyecto artístico, con el detalle económico.
        </Typography>
      </Grid>
    </Grid>
  );
}
