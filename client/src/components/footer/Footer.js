import { useState } from 'react'
import { useHistory } from 'react-router'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { green } from '@material-ui/core/colors'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CopyClipboard from '../clipboard'

const DOMAIN = "sentircreativo"
const HOST = `https://www.${DOMAIN}.com`

const COLORS = {
  purple: '#b522b4',
  blue: '#3b53b3',
  text: '#4f4f4f',
  bg: '#ffeb12',
  orange: '#ff6c00'
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#4a4a4a',
    padding: '24px 0'
  },
  title: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(8)
  },
  titleAccent: {
    fontWeight: theme.typography.fontWeightBold,
    color: COLORS.bg,
    display: 'inline',
    textShadow: '4px 4px 2px ' + theme.palette.grey[600],
    fontSize: '44px',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px'
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
  }
}))

export default function AppFooter() {
  const classes = useStyles()
  const history = useHistory()
  const marginTop = window.location.href.includes('about') ? '-.5rem' : '0px'

  return (
    <Container className={classes.root} maxWidth='xl' style={{ marginTop }}>
      <Grid container spacing={6} justifyContent='center'>
          <Grid item xs={11}>
            <Typography variant='h1' className={classes.title}>
              Cuenta con nosotros
            </Typography>

            <Typography className={classes.titleAccent}>
              ¡Contáctanos!
            </Typography>
          </Grid>

          <Grid container item xs={11} spacing={4}>
            {[1].map(_ => (
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
                    width="100%" height="100%" loading="lazy" style={{ border: 0 }} title="Sentir Creativo">
                  </iframe>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ margin: '0 auto' }}>
              <Box display='flex' justifyContent='space-around' mb={3}>
                <Link href='https://www.facebook.com/Sentircreativo/' target="_blank">
                  <Avatar alt="Icono" src={'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'}
                    style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                </Link>

                <Link href='https://www.instagram.com/sentircreativo/' target="_blank">
                  <Avatar alt="Icono" src={'https://cdn-icons-png.flaticon.com/512/1409/1409946.png'}
                    style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                </Link>

                <Link href='https://twitter.com/sentir_creativo' target="_blank">
                  <Avatar alt="Icono" src={'https://play-lh.googleusercontent.com/J8k5q78xv4R8Smi4vOE6iUphLvOz0efC-0lzoyGfd0KRUlAv4ekuCtlss6KBN-tMvEw'}
                    style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                </Link>
              </Box>

              <Card style={{ borderRadius: 16 }}>
                <CardContent component={Grid} container spacing={2}>
                  <Grid item xs={3}>
                    <CardMedia image={'https://pbs.twimg.com/profile_images/666413114489831424/aJZNErvd_400x400.png'}
                      component='img' width='65' height='65' />
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
                    <Button style={{ color: COLORS.orange }} href='https://www.flickr.com/photos/sentircreativo/albums'
                      target='_blank'>
                      VER BITÁCORAS
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid container item xs={12} justifyContent='space-around'>
              <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" size='large' className={classes.buttonColorful} style={{ backgroundColor: COLORS.purple, fontSize: '1.5rem' }}>
                  Únete a la red
                </Button>
              </Grid>

              <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" className={classes.buttonColorful} style={{ backgroundColor: COLORS.blue, fontSize: '1.5rem' }}
                  onClick={() => history.push('/')}>
                  Explora el catálogo
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: 0 }}>
              <Copyright />
          </Grid>
      </Grid>
    </Container>
  )
}

function Copyright() {
  return (
    <Box
      bgcolor='rgba(0 0 0 / 20%)'
      width='100%'
      color='#fff'
      px={4}
      py={1}
    >
      <Link color='inherit' href={HOST}>
        {DOMAIN}.com
      </Link>{' '}
      {' ® • '}
      {new Date().getFullYear()}
    </Box>
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
        avatar={<Avatar src='https://sentircreativo.s3.us-east-2.amazonaws.com/images/staff/Perfil-Colibri-marzo22.png' style={{ width: '5rem', height: '5rem' }} />}
        subheader={
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' color='textSecondary'>
              Ignacio Colibrí
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
          <Box px={4} mt={3} style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
            {['holabuendia@sentircreativo.com', '+569 68498645'].map(x => (<CopyClipboard>
              {({ copy }) => (
                <Chip
                  label={x}
                  style={{ backgroundColor: COLORS.bg, marginRight: 8 }}
                  onClick={() => copy(x)}
                />
              )}
            </CopyClipboard>))}
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
        <Tooltip title='Whatsapp'>
            <IconButton
              size='medium'
              variant='contained'
              href={'https://wa.me/+56968498645?text='+window.encodeURIComponent('Hola buen dia')}
              target='_blank'
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
              href={'tel:+56968498645'}
              target='_blank'
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
              href={'mailto:holabuendia@sentircreativo.com'}
              target='_blank'
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
