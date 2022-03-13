import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CachedIcon from '@material-ui/icons/Cached';
import SearchIcon from '@material-ui/icons/Search'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import WeekendIcon from '@material-ui/icons/Weekend'
import WidgetsIcon from '@material-ui/icons/Widgets'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import API from '../api'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'
import FlipCard from '../components/about/FlipCard'
import PrinciplesCard from '../components/about/PrinciplesCard'
import Connections from '../components/about/Connections'

const items = {
  rubros: {
    'Educación': [
      'Educación inicial',
      'Educación básica',
    ],
    'Instituciones Públicas': [
      'Municipalidades'
    ]
  },
  ocasiones: [
    'Efemérides',
    'Inauguración año escolar',
    'Festivales',
    'Jornadas de autocuidados',
    'Talleres Sociales'
  ]
}

const COLORS = {
  purple: '#b522b4',
  blue: '#3b53b3',
  text: '#4f4f4f',
  bg: '#ffeb12',
  orange: '#ff6c00'
}

const artistasConnections = [
  {
    color: COLORS.purple,
    icon: CachedIcon,
    details: 'Conectamos tus talentos \n con \noportunidades\n \nlaborales.',
    match: 'oportunidades'
  },
  {
    color: COLORS.purple,
    icon: ReceiptIcon,
    details: 'Tus servicios artísticos en\n un \nCatálogo\n diseñado por \nartistas.',
    match: 'Catálogo'
  },
  {
    color: COLORS.purple,
    icon: ShowChartIcon,
    details: 'Aumenta tus\n \nIngresos\n haciendo lo \nque amas.',
    match: 'Ingresos'
  },
  {
    color: COLORS.purple,
    icon: AttachMoneyIcon,
    details: 'Valora tus talentos\n artísticos de forma \n\nprofesional.',
    match: 'profesional.'
  }
]

const proyectosConnections = [
  {
    color: COLORS.blue,
    icon: SearchIcon,
    details: 'Encuentra más de 50\n Experiencias Artísticas\n \ndisponibles.',
    match: 'disponibles.'
  },
  {
    color: COLORS.blue,
    icon: FaceIcon,
    details: 'Para pequeñas y grandes\n \nocasiones\n, contextos y \npresupuestos.',
    match: 'ocasiones'
  },
  {
    color: COLORS.blue,
    icon: WidgetsIcon,
    details: 'Cotiza y recibe hasta \n\ntres propuestas\n \neconómicas detalladas.',
    match: 'tres propuestas'
  },
  {
    color: COLORS.blue,
    icon: WeekendIcon,
    details: 'Siente respaldo en asesoría\n artística, logística, en \nreportes y \nrendición.',
    match: 'rendición.'
  }
]

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, -1),
    width: `calc(100% + ${theme.spacing(1) * 2}px)`,
    backgroundColor: COLORS.bg,
    overflow: 'hidden',
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
    lineHeight: 1.25,
    [theme.breakpoints.down('md')]: {
      fontSize: '36px'
    }
  },
  headerColor2: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '44px',
    color: COLORS.text,
    lineHeight: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '36px'
    }
  },
  headerFontSm: {
    fontSize: '36px',
    marginTop: theme.spacing(10),
    color: COLORS.text,
    lineHeight: 1.25
  },
  headerFontmd: {
    fontSize: '40px',
    lineHeight: 1.25,
    [theme.breakpoints.down('md')]: {
      fontSize: '36px'
    }
  },
  headerFontxl: {
    fontSize: '72px',
    lineHeight: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '64px'
    }
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
    fontSize: '44px',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px'
    }
  }
}));

export default function About() {
  const theme = useTheme()
  const history = useHistory()
  const classes = useStyles();
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const [areas, setAreas] = useState([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    ;(async () => {
      let result = await API.Area.getAll()
      result = result.map(area => {
        let icono = null

        if (/\//.test(area.icono)) {
          let [prefix, name] = area.icono.split('/')

          if (prefix === 'gi') icono = GI[name]
          if (prefix === 'io5') icono = IO5[name]
        }

        return {
          ...area,
          icono
        }
      })
      setAreas(result)
    })()
  }, [])

  const actionCardPosition = (index) => {
    if (isLarge) {
      if ([0, 2].includes(index)) {
        return '8rem'
      }
    }

    return 0;
  }

  const areaBg = (area) => {
    const files = [...area.archivos];
    const bgFileType = 24; // Background PNG
    const bgURI = files.find(x => x.tipo_archivo?.id === bgFileType)?.path;

    if (!bgURI) {
      return area.colorPrimario;
    }

    return `url(${bgURI})`;
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12}>
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
          <Grid item xs={12} md={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)', borderRadius: '0 0 1rem 1rem' }}>
           <Connections title='Artistas' subtitle='Si eres un artista' color={COLORS.purple}
            connections={artistasConnections} expanded={expanded} onExpand={setExpanded} />

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

          <Grid item xs={12} md={5} style={{ padding: 0, backgroundColor: 'rgba(0 0 0 / 10%)', zIndex: -1, borderRadius: '0 0 1rem 1rem' }}>
            <Connections title='Proyectos' subtitle='Si tienes un proyecto' color={COLORS.blue}
              connections={proyectosConnections} expanded={expanded} onExpand={setExpanded} />

            <Grid container justifyContent='center'>
              <Grid item md={6}>
                <Button variant="contained" className={classes.buttonColorful} style={{ backgroundColor: COLORS.blue }}
                  onClick={() => history.push('/')}>
                  Explora el catálogo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Seccion 2 */}
        <Grid item xs={12}>
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

        <Grid container item xs={12} spacing={isSmall ? 2 : 6} justifyContent='space-around' alignItems="center">
          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Pasión'
            details={`Creamos historias, guiones,
            bocetos, partituras o coreografías,
            ensayamos y afinamos, para dar lo
            mejor en nuestras presentaciones.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/payasa_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Coherencia'
            details={`Todas las experiencias artísticas
            disponibles buscan promocionar el
            amor personal, el respeto por el
            otro ser y el buen vivir.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/escritora_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Agilidad'
            details={`Resolvemos con metodologías
            ágiles, buena disposición a los
            cambios, documentación expedita
            y creatividad.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/bailarina_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Estética'
            details={`Cuidamos cada detalle para que la
            puesta en escena, vestuarios,
            maquillajes y diseños, tengan
            siempre una estética profesional.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/pintor_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Equilibrio'
            details={`Todos nuestros proyectos generan
            trabajo remunerado, equilibrado y
            adecuado al contexto, que
            dignifican la labor artística.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/director_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <PrinciplesCard
            title='Conciencia'
            details={`Promocionamos el cuidado a la
            Tierra, los recursos naturales, a los
            animales y el fortalecimiento de
            las culturas indígenas locales.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/malabarista_450x450px.png' />
          </Grid>
        </Grid>

        {/* Seccion 3 */}
        <Grid item xs={12}>
          <Typography variant='h1'>
            En distintas
          </Typography>
          <Typography className={classes.principiosText}>
            Aréas de&nbsp;
            <Typography display='inline' className={classes.principiosText} style={{ fontWeight: 'bold' }}>
            Acción
            </Typography>
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={6} justifyContent='space-around' alignItems="center">
          {areas.map((x, i) => (
            <Grid item xs={12} md={6} key={x}>
              <FlipCard
                title={x.nombre}
                detail={x.slogan}
                icon={x.icono}
                background={areaBg(x)}
                color={x.colorPrimario}
                style={{ marginTop: actionCardPosition(i) }}
                />
            </Grid>
          ))}
        </Grid>

        {/* Seccion 3 */}
        <Grid item xs={12}>
          <Typography variant='h1'>
            Para diversos
          </Typography>
          <Typography className={classes.principiosText}>
            Rubros y&nbsp;
            <Typography display='inline' className={classes.principiosText} style={{ fontWeight: 'bold' }}>
              Ocasiones
            </Typography>
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={6} justifyContent='space-around' alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant='h1' color='textSecondary' gutterBottom>
                Rubros
            </Typography>

            <Card style={{ borderRadius: 8 }}>
              <CardContent>
                <List style={{ overflow: 'auto', maxHeight: '15rem' }} subheader={<li />}>
                  {Object.keys(items.rubros).map((section) => (
                    <li key={`section-${section}`}>
                      <ul style={{ padding: 0 }}>
                        <ListSubheader style={{ backgroundColor: '#ffeb12', fontSize: 18 }}>
                          {section}
                        </ListSubheader>
                        {items.rubros[section].map((item) => (
                          <ListItem key={`item-${section}-${item}`} style={{
                            backgroundColor: '#ffeb124a',
                            margin: '8px 0 8px 16px',
                            width: 'calc(100% - 16px)'
                          }}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h1' color='textSecondary' gutterBottom>
                Ocasiones
            </Typography>

            <Card style={{ borderRadius: 8 }}>
              <CardContent>
                <List style={{ overflow: 'auto', maxHeight: '15rem' }}>
                  {items.ocasiones.map(x => (
                    <ListItem key={`item-${x}`} style={{ backgroundColor: '#ffeb124a', marginTop: 8 }}>
                      <ListItemText primary={x} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
