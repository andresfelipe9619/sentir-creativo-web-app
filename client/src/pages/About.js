import { useState, useEffect } from 'react';
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
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import API from '../api'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { green, blue } from '@material-ui/core/colors'

const items = {
  rubros: [
    'Educación',
    'Educación inicial',
    'Educación básica',
    'Instituciones Públicas',
    'Municipalidades'
  ],
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
  },
  flipCard: {
    backgroundColor: 'transparent',
    width: '16rem',
    height: '18rem',
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: '12px',
    '&:hover $flipCardInner': {
      transform: 'rotateY(180deg)'
    }
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d'
  },
  flipCardSides: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    top: 0,
    left: 0,
    padding: '2rem'
  },
  flipCardBack: {
    transform: 'rotateY(180deg)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
}));

export default function About() {
  const theme = useTheme()
  const classes = useStyles();
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const [areas, setAreas] = useState([])

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
    <>
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
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

        <Grid container item xs={12} spacing={isSmall ? 2 : 6} justifyContent='space-around' alignItems="center">
          <Grid item xs={12} md={5}>
           <Principles
            title='Pasión'
            details={`Creamos historias, guiones,
            bocetos, partituras o coreografías,
            ensayamos y afinamos, para dar lo
            mejor en nuestras presentaciones.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/payasa_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <Principles
            title='Coherencia'
            details={`Todas las experiencias artísticas
            disponibles buscan promocionar el
            amor personal, el respeto por el
            otro ser y el buen vivir.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/escritora_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <Principles
            title='Agilidad'
            details={`Resolvemos con metodologías
            ágiles, buena disposición a los
            cambios, documentación expedita
            y creatividad.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/bailarina_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <Principles
            title='Estética'
            details={`Cuidamos cada detalle para que la
            puesta en escena, vestuarios,
            maquillajes y diseños, tengan
            siempre una estética profesional.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/pintor_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <Principles
            title='Equilibrio'
            details={`Todos nuestros proyectos generan
            trabajo remunerado, equilibrado y
            adecuado al contexto, que
            dignifican la labor artística.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/director_450x450px.png' />
          </Grid>

          <Grid item xs={12} md={5}>
           <Principles
            title='Conciencia'
            details={`Promocionamos el cuidado a la
            Tierra, los recursos naturales, a los
            animales y el fortalecimiento de
            las culturas indígenas locales.`}
            avatar='https://sentircreativo.s3.us-east-2.amazonaws.com/images/corporative/malabarista_450x450px.png' />
          </Grid>
        </Grid>

        {/* Seccion 3 */}
        <Grid item md={6}>
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
              <ActionCard
                title={x.nombre}
                detail={x.slogan}
                icon={x.icono}
                background={areaBg(x)}
                style={{ marginTop: actionCardPosition(i) }}
                />
            </Grid>
          ))}
        </Grid>

        {/* Seccion 3 */}
        <Grid item md={6}>
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
                <List style={{ overflow: 'auto', maxHeight: '15rem' }}>
                  {items.rubros.map((x, i) => (
                    <ListItem key={`item-${x}`} style={{ backgroundColor: '#ffeb124a' }}>
                      <ListItemText primary={x} primaryTypographyProps={{ style: { fontWeight: [0, 3].includes(i) ? 'bold' : 'normal' } }} />
                    </ListItem>
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
                    <ListItem key={`item-${x}`} style={{ backgroundColor: '#ffeb124a' }}>
                      <ListItemText primary={x} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item xs={12} justifyContent='flex-end'>
              <Grid item md={6} style={{ textAlign: 'right' }}>
                <Typography variant='h6' gutterBottom>
                  12 Experiencias encontradas
                </Typography>

                <Button variant="contained" className={classes.buttonColorful} style={{ backgroundColor: COLORS.orange }}>
                  Ver los resultado
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Container>

    <Container className={classes.container} style={{ backgroundColor: '#4a4a4a' }}>
      <Grid container spacing={6}>
          {/* Seccion 4 */}
          <Grid item md={6}>
            <Typography variant='h1' style={{ color: '#fff', marginTop: 24 }}>
              Cuenta con nosotros
            </Typography>
            <Typography className={classes.principiosText}>
              <Typography display='inline' className={classes.principiosText} style={{ fontWeight: 'bold', color: COLORS.bg }}>
                ¡Contáctanos!
              </Typography>
            </Typography>
          </Grid>

          <Grid container item xs={12} spacing={4}>
            {[1, 2, 3].map(x => (
              <Grid item xs={12} md={4}>
                <CardDetail />
              </Grid>
            ))}

            <Grid item xs={12} md={9}>
              <Card component={Grid} container spacing={2} style={{ borderRadius: 16, height: '100%' }}>
                <Grid xs={12} md={4}>
                <CardContent style={{ padding: '4rem 2rem' }}>
                    <Typography color='textSecondary' variant="h2" gutterBottom>
                      Sede Central
                    </Typography>
                    <Typography variant="h5">
                    Avenida Juan Pablo II #446 Antofagasta • Chile
                    </Typography>
                  </CardContent>
                </Grid>

                <Grid xs={12} md={8}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.734610252658!2d-70.39007668255617!3d-23.57797319999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae2aff16e6748f%3A0x2d2acde847536271!2sSentir%20Creativo%20%C2%A1An%C3%ADmate*21!5e0!3m2!1ses-419!2sdo!4v1646705902423!5m2!1ses-419!2sdo"
                    width="100%" height="100%" loading="lazy" style={{ border: 0 }}>
                  </iframe>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={9} md={3} style={{ margin: '0 auto' }}>
              <Box display='flex' justifyContent='space-around' mb={3}>
                <Avatar alt="Icono" src={'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'}
                  style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />

                <Avatar alt="Icono" src={'https://cdn-icons-png.flaticon.com/512/1409/1409946.png'}
                  style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />

                <Avatar alt="Icono" src={'https://play-lh.googleusercontent.com/J8k5q78xv4R8Smi4vOE6iUphLvOz0efC-0lzoyGfd0KRUlAv4ekuCtlss6KBN-tMvEw'}
                  style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
              </Box>

              <Card style={{ borderRadius: 16 }}>
                <CardContent component={Grid} container spacing={2}>
                  <Grid item xs={3}>
                    <CardMedia image={'https://pbs.twimg.com/profile_images/666413114489831424/aJZNErvd_400x400.png'}
                      component='img' />
                  </Grid>

                  <Grid item xs={8}>
                    <Typography color='textSecondary' variant="h2">
                      Bitácoras <br />
                      Fotográficas
                    </Typography>
                    <Typography variant="subtitle" color='textSecondary'>
                      Más de 3000 fotográfias
                    </Typography>
                  </Grid>

                  <Grid item xs style={{ textAlign: 'right' }}>
                    <Button style={{ color: COLORS.orange }}>
                      VER BITÁCORAS
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid container item xs={12} justifyContent='space-around'>
              <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" size='large' className={classes.buttonColorful} style={{ backgroundColor: COLORS.purple, fontSize: '2rem' }}>
                  Únete a la red
                </Button>
              </Grid>

              <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" className={classes.buttonColorful} style={{ backgroundColor: COLORS.blue, fontSize: '2rem' }}>
                  Explora el catálogo
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </Container>
    </>
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
  const theme = useTheme()
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const size = isMedium ? '5rem' : '13rem';

  return (
    <Card style={{ overflow: 'visible', borderRadius: '.75rem' }}>
      <CardContent component={Box} display='flex' alignItems="center" style={{ padding: 0 }}>
        <Avatar alt="Icono" src={avatar}
          style={{ width: size, height: size, margin: isMedium ? '1rem 0 auto 1rem' : '-1rem 0 -1rem -6rem' }} />

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

function ActionCard({ chips = [1, 2, 3], color = COLORS.blue, title, detail, icon: Icon, background, style }) {
  const classes = useStyles()

  return (
    <Card className={classes.flipCard} style={style}>
      <CardContent className={classes.flipCardInner}>
        <Box className={clsx(classes.flipCardSides)} display='flex' flexDirection='column' alignItems='center'
          style={{ background, color: '#fff' }}>
          <Icon style={{ color: '#fff', width: '5rem', height: '5rem', marginBottom: 16 }} />

          <Typography align='center' gutterBottom style={{ fontSize: 32, lineHeight: 1 }}>
            {title}
          </Typography>

          <Typography align='center' style={{ fontSize: 14 }}>
            {detail}
          </Typography>
        </Box>

        <Box className={clsx(classes.flipCardSides, classes.flipCardBack)}>
          <Icon style={{ color, margin: '0 auto auto 0', width: '2rem', height: '2rem' }} />

          <Box display='flex' flexWrap='wrap' justifyContent='center'>
            {chips.map(x => (
              <Chip label={x} style={{ background: color, color: '#fff', marginTop: 8, marginRight: 8 }} />
            ))}
          </Box>

          <Icon style={{ color, margin: 'auto 0 0 auto', transform: 'rotate(180deg)', width: '2rem', height: '2rem'}} />
        </Box>
      </CardContent>
  </Card>
  )
}

function CardDetail() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card style={{ borderRadius: 24 }}>
    <CardHeader
        component={Box}
        avatar={<Avatar src='https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png' style={{ width: '5rem', height: '5rem' }} />}
        subheader={
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' color='textSecondary'>
              Ignacio Colobrí
            </Typography>
            <Typography variant='h6'>
             Director
            </Typography>
          </Box>
        }
      />

    <CardContent style={{ padding: 0 }}>
    <Box
          alignItems='center'
          bgcolor={COLORS.bg}
          color='black'
          display='flex'
          justifyContent='center'
          px={4}
        >
          <Typography variant='h5' component='h3' style={{ marginLeft: 'auto' }}>
            Highlights
          </Typography>
          <IconButton
            color={'inherit'}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Box
              px={4}
              mt={3}
              style={{ overflow: 'auto', whiteSpace: 'nowrap' }}
            >
              <Chip
                label='email1@gmail.com'
                style={{ backgroundColor: COLORS.bg, marginRight: 8 }}
              />

              <Chip
                label='email1@gmail.com'
                style={{ backgroundColor: COLORS.bg, marginRight: 8 }}
              />
            </Box>
        </Collapse>

    </CardContent>

    <CardActions>
      <Box
        display='flex'
        justifyContent='flex-end'
        width='100%'
        mt={1}
        p={1}
      >
        <Tooltip title='Contacto'>
          <IconButton
          size='medium'
          variant='contained'
          style={{ marginRight: 8, color: blue[500] }}
          >
          <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Whatsapp'>
            <IconButton
              size='medium'
              variant='contained'
              style={{ marginRight: 8, color: green[500] }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Teléfono'>
            <IconButton
              size='medium'
              color='#000'
              variant='contained'
              style={{ marginRight: 8 }}
            >
              <PhoneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Correo'>
            <IconButton
              size='medium'
              color='#000'
              variant='contained'
              style={{ marginRight: 8 }}
            >
              <MailOutlineIcon />
            </IconButton>
          </Tooltip>
      </Box>
    </CardActions>
   </Card>
  );
}
