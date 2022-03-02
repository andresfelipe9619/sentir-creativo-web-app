import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CachedIcon from '@material-ui/icons/Cached';
import SearchIcon from '@material-ui/icons/Search'
import ReceiptIcon from '@material-ui/icons/Receipt'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShowChartIcon from '@material-ui/icons/ShowChart'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import WeekendIcon from '@material-ui/icons/Weekend'
import WidgetsIcon from '@material-ui/icons/Widgets'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'

const COLORS = {
  purple: '#b522b4',
  blue: '#3b53b3',
  text: '#4f4f4f',
  bg: '#ffeb12'
}

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, -1),
    width: `calc(100% + ${theme.spacing(1) * 2}px)`,
    backgroundColor: COLORS.bg,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'none'
    }
  },
  headerColor: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '44px',
    color: COLORS.text
  },
  headerColor2: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '44px',
    color: COLORS.text
  },
  headerFontSm: {
    fontSize: '36px',
    marginTop: theme.spacing(10),
    color: COLORS.text
  },
  headerFontmd: {
    fontSize: '40px'
  },
  headerFontxl: {
    fontSize: '72px',
    lineHeight: 1
  },
  noContainer: {
    margin: theme.spacing(0, -3),
    flexBasis: `calc(100% + ${theme.spacing(3) * 2}px)`,
    zIndex: 1,
    maxWidth: 'none'
  },
  buttonColorful: {
    borderRadius: '50px',
    padding: theme.spacing(1.5, 3),
    textTransform: 'none',
    marginBottom: theme.spacing(4),
    color: '#fff',
    fontSize: '1.25rem',
    backgroundSize: '1rem 1rem',
    backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)'
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography color='textSecondary' className={classes.headerFontSm}>Somos una</Typography>
          <Typography color='textSecondary' className={classes.headerColor}>Plataforma Artística</Typography>
          <Typography color='textSecondary' gutterBottom className={classes.headerFontmd} style={{ color: COLORS.text }}>
            que&nbsp;
            <Typography display='inline' color='textSecondary' className={classes.headerColor2}>
              conecta
            </Typography>
            &nbsp;a
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={6} justifyContent='space-between' alignItems="center" className={classes.noContainer}>
          <Grid item md={6} lg={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)' }}>
            <Box bgcolor={COLORS.purple} color='white' p={3}>
              <Typography variant='h1' align='center' className={classes.headerFontxl}>Artistas</Typography>
            </Box>

            <Box bgcolor='white' p={2} mt={4} mb={8} style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px', width: '90%' }}
              display='flex' justifyContent='space-around' alignItems='center'>
              <Typography variant='h1' align='center' style={{ color: COLORS.purple }}>
                Si eres un artista
              </Typography>

              <KeyboardArrowDownIcon style={{ width: '2.5rem', height: '2.5rem', fill: COLORS.purple }}/>
            </Box>

            <ConectionsItems
              color={COLORS.purple}
              icon={CachedIcon}
              details={'Conectamos tus talentos \n con \noportunidades\n \nlaborales.'}
              match='oportunidades'
            />

            <ConectionsItems
              color={COLORS.purple}
              icon={ReceiptIcon}
              details={'Tus servicios artísticos en\n un \nCatálogo\n diseñado por \nartistas.'}
              match='Catálogo'
            />

            <ConectionsItems
              color={COLORS.purple}
              icon={ShowChartIcon}
              details={'Aumenta tus\n \nIngresos\n haciendo lo \nque amas.'}
              match='Ingresos'
            />

            <ConectionsItems
              color={COLORS.purple}
              icon={AttachMoneyIcon}
              details={'Valora tus talentos\n artísticos de forma \n\nprofesional.'}
              match='profesional.'
            />

            <Grid container justifyContent='center'>
              <Grid item md={6}>
                <Button variant="contained" size='large' className={classes.buttonColorful} style={{ backgroundColor: COLORS.purple}}>
                  Únete a la red
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* <Box bgcolor='white' p={2} mx={-4} style={{ borderRadius: '50px' }}>
              <Typography variant='h1' align='center'>con</Typography>
          </Box> */}

          <Grid item md={6} lg={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)' }}>
            <Box bgcolor={COLORS.blue} color='white' p={3}>
              <Typography variant='h1' align='center' className={classes.headerFontxl}>Proyectos</Typography>
            </Box>

            <Box bgcolor='white' p={2} mt={4} mb={8} style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px', width: '90%', marginLeft: 'auto' }}
              display='flex' justifyContent='space-around' alignItems='center'>
              <Typography variant='h1' align='center' style={{ color: COLORS.blue }}>
                Si tienes un proyecto
              </Typography>

              <KeyboardArrowDownIcon style={{ width: '2.5rem', height: '2.5rem', fill: COLORS.blue }}/>
            </Box>

            <ConectionsItems
              color={COLORS.blue}
              icon={SearchIcon}
              details={'Encuentra más de 50\n Experiencias Artísticas\n \ndisponibles.'}
              match='disponibles.'
            />

            <ConectionsItems
              color={COLORS.blue}
              icon={FaceIcon}
              details={'Para pequeñas y grandes\n \nocasiones\n, contextos y \npresupuestos.'}
              match='ocasiones'
            />

            <ConectionsItems
              color={COLORS.blue}
              icon={WidgetsIcon}
              details={'Cotiza y recibe hasta \n\ntres propuestas\n \neconómicas detalladas.'}
              match='tres propuestas'
            />

            <ConectionsItems
              color={COLORS.blue}
              icon={WeekendIcon}
              details={'Siente respaldo en asesoría\n artística, logística, en \nreportes y \nrendición.'}
              match='rendición.'
            />

            <Grid container justifyContent='center'>
              <Grid item md={6}>
                <Button variant="contained" className={classes.buttonColorful} style={{ backgroundColor: COLORS.blue }}>
                  Explora el catálogo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

function ConectionsItems({ color, icon: Icon, details, match }) {

  details = details.split(/\n/)
    .map((text, index, array) => {
      const props = {
        component: 'span',
        display: (array[index + 1] === match || array[index - 1] === match) ? 'inline' : 'block',
      };

      if (text === match) {
        props.display = 'inline'
        props.style = { fontWeight: 'bold' }
        props.component = 'strong'
      }

      return <Typography key={text} {...props}>{text}</Typography>;
    })

  return (
    <Grid container spacing={2}>
    <Grid container md={3} justifyContent='center'>
      <Icon style={{ width: '5rem', height: '5rem', fill: color }}/>
    </Grid>

    <Grid md={9}>
      <Box mb={6}>
        <Typography variant='subtitle1' paragraph gutterBottom>
          {details}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  );
}
