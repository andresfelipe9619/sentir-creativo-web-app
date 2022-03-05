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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

const COLORS = {
  purple: '#b522b4',
  blue: '#3b53b3',
  text: '#4f4f4f',
  bg: '#ffeb12',
  orange: '#ff6c00'
}

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, -1),
    width: `calc(100% + ${theme.spacing(1) * 2}px)`,
    backgroundColor: COLORS.bg,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'none',
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5)
    }
  },
  headerColor: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '44px',
    color: COLORS.text,
    lineHeight: 1.25
  },
  headerColor2: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '44px',
    color: COLORS.text,
    lineHeight: 1
  },
  headerFontSm: {
    fontSize: '36px',
    marginTop: theme.spacing(10),
    color: COLORS.text,
    lineHeight: 1.25
  },
  headerFontmd: {
    fontSize: '40px',
    lineHeight: 1.25
  },
  headerFontxl: {
    fontSize: '72px',
    lineHeight: 1
  },
  buttonColorful: {
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRadius: '50px',
    padding: theme.spacing(1.5, 3),
    textTransform: 'none',
    marginBottom: theme.spacing(4),
    color: '#fff',
    fontSize: '1.25rem',
    backgroundSize: '1rem 1rem',
    backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
    '&:before': {
      content: '',
      position: 'absolute',
      width: 'calc(100% - 0.5rem)',
      height: 'calc(100% - 0.5rem)',
      border: '1px solid #ffffff9c',
      'border-radius': '50px'
    }
  },
  principiosText: {
    color: COLORS.orange,
    textShadow: '2px 2px 4px #fff',
    fontSize: '44px'
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Typography color='textSecondary' className={classes.headerFontSm}>
            Somos una
          </Typography>
          <Typography color='textSecondary' className={classes.headerColor}>
            Plataforma Artística
          </Typography>
          <Typography color='textSecondary' className={classes.headerFontmd}>
            que&nbsp;
            <Typography display='inline' color='textSecondary' className={classes.headerColor2}>
              conecta
            </Typography>
            &nbsp;a
          </Typography>
        </Grid>

        {/* Seccion 1 */}
        <Grid container item xs={12} spacing={0} justifyContent='center' alignItems="center" style={{ zIndex: 1 }}>
          <Grid item xs={12} md={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)', borderRadius: '0 0 2rem 2rem' }}>
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

          <Box bgcolor='white' py={1} px={4} my={2} mx={-4} style={{ borderRadius: '50px', alignSelf: 'flex-start' }}>
              <Typography variant='h1' align='center' style={{ fontSize: '64px' }}>
                con
              </Typography>
          </Box>

          <Grid item xs={12} md={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)', zIndex: -1, borderRadius: '0 0 2rem 2rem' }}>
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

        {/* Seccion 2 */}
        <Grid item md={6}>
          <Typography variant='h1'>
            Trabajamos con
          </Typography>
          <Typography className={classes.principiosText}>
            Principios&nbsp;
            <Typography display='inline' className={classes.principiosText} style={{ fontWeight: 'bold' }}>
              Esenciales
            </Typography>
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={6} justifyContent='space-around' alignItems="center">
          <Grid item xs={9} md={5}>
           <Principles
            title='Pasión'
            details={`Creamos historias, guiones,
            bocetos, partituras o coreografías,
            ensayamos y afinamos, para dar lo
            mejor en nuestras presentaciones.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/payasa_450x450px.png' />
          </Grid>

          <Grid item xs={9} md={5}>
           <Principles
            title='Coherencia'
            details={`Todas las experiencias artísticas
            disponibles buscan promocionar el
            amor personal, el respeto por el
            otro ser y el buen vivir.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/escritora_450x450px.png' />
          </Grid>

          <Grid item xs={9} md={5}>
           <Principles
            title='Agilidad'
            details={`Resolvemos con metodologías
            ágiles, buena disposición a los
            cambios, documentación expedita
            y creatividad.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/bailarina_450x450px.png' />
          </Grid>

          <Grid item xs={9} md={5}>
           <Principles
            title='Estética'
            details={`Cuidamos cada detalle para que la
            puesta en escena, vestuarios,
            maquillajes y diseños, tengan
            siempre una estética profesional.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/pintor_450x450px.png' />
          </Grid>

          <Grid item xs={9} md={5}>
           <Principles
            title='Equilibrio'
            details={`Todos nuestros proyectos generan
            trabajo remunerado, equilibrado y
            adecuado al contexto, que
            dignifican la labor artística.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/director_450x450px.png' />
          </Grid>

          <Grid item xs={9} md={5}>
           <Principles
            title='Conciencia'
            details={`Promocionamos el cuidado a la
            Tierra, los recursos naturales, a los
            animales y el fortalecimiento de
            las culturas indígenas locales.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/malabarista_450x450px.png' />
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
      <Grid xs={1}></Grid>
      <Grid container xs={2} justifyContent='center'>
        <Icon style={{ width: '5rem', height: '5rem', fill: color }}/>
      </Grid>

      <Grid xs={9}>
        <Box mb={6} ml={2}>
          <Typography variant='h6' color='textSecondary' paragraph gutterBottom>
            {details}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

function Principles({ title, details, avatar }) {
  return (
    <Card style={{ overflow: 'visible', borderRadius: '.75rem' }}>
      <CardContent component={Box} display='flex' alignItems="center" style={{ padding: 0 }}>
        <Avatar alt="Icono" src={avatar}
          style={{ width: '13rem', height: '13rem', margin: '-1rem 0 -1rem -6rem' }} />

        <Box px={3}>
          <Typography variant='h1' style={{ fontSize: '36px', marginTop: 16 }}>
            {title}&nbsp;
            <Chip label='PRO' size='small' style={{ borderRadius: 0,  fontSize: '11px', backgroundColor: '#000', color: '#fff' }} />
          </Typography>

          <Typography paragraph>
            {details}
          </Typography>
        </Box>
      </CardContent>
  </Card>
  )
}
