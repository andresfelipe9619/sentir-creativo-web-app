import React from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import {
  useTheme,
  createTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    overflow: 'visible'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    padding: 0,
    width: '100%'
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    color: 'white'
  }
}))

export default function ServiceCard ({
  color,
  service,
  imageTitle,
  handleClick,
  handleClickPrimary,
  handleClickSecundary
}) {
  const classes = useStyles()
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState(false)

  const {
    area,
    tags,
    sintesis,
    archivos,
    ocasions,
    nombre: title,
    tecnica_artisticas
  } = service

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const imageUrl = (archivos || [])[0]?.path
  const cardColor = color || theme.palette.primary.main
  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor }
    }
  })

  const text = <Typography variant='h3'>{title}</Typography>
  const [prefix, name] = area.icono.split('/')
  let Icon = null

  if (prefix === 'gi') Icon = GI[name]
  if (prefix === 'io5') Icon = IO5[name]

  return (
    <ThemeProvider theme={areaTheme}>
      <Card className={classes.root} elevation={5}>
        <FloatingHeader icon={Icon} color={cardColor} />
        <CardHeader
          component={Box}
          title={text}
          action={
            <IconButton aria-label='favoritos'>
              <StarIcon fontSize='large' style={{ color: '#ffab00' }} />
            </IconButton>
          }
          subheader={
            <Typography variant='caption' color='textSecondary'>
              {tags
                .slice(0, 3)
                .map(t => t.nombre)
                .join(' • ')}
            </Typography>
          }
        />
        <CardActionArea onClick={handleClick}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
            justifyContent='flex-end'
            style={{
              bottom: 5,
              position: 'absolute',
              right: 10,
              zIndex: 100
            }}
          >
            <Box
              bgcolor='white'
              py={0.2}
              px={0.5}
              m={0.5}
              style={{ fontWeight: 'bold' }}
            >
              <Typography variant='caption' color='textSecondary'>
                Técnicas artísticas
              </Typography>
            </Box>
            {tecnica_artisticas.map((t, i) => (
              <Box
                key={i}
                bgcolor='primary.main'
                color='white'
                py={0.2}
                px={0.5}
                m={0.5}
                width='fit-content'
              >
                <Typography variant='caption' style={{ fontWeight: 'bold' }}>
                  {t?.nombre || ''}
                </Typography>
              </Box>
            ))}
          </Box>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={imageTitle || ''}
          />
        </CardActionArea>
        <CardContent classes={{ root: classes.content }}>
          <Box
            display='flex'
            px={4}
            justifyContent='center'
            alignItems='center'
            color='white'
            bgcolor={cardColor}
          >
            <Typography variant='h5' component='h3' align='right'>
              Síntesis
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
              display='flex'
              flexDirection='column'
              justifyContent='flex-end'
              p={0}
            >
              <Box py={2} px={4} color='white' bgcolor='primary.light'>
                <Typography>{sintesis}</Typography>
              </Box>

              <Box py={2} px={4} color='white' bgcolor='primary.main'>
                <Typography variant='h3'>Ideal para:</Typography>
                {ocasions.map((o, i) => (
                  <Typography variant='body2' key={i}>
                    {o?.nombre || ''}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Collapse>
        </CardContent>

        <CardActions>
          <Button
            size='small'
            color={'primary'}
            variant='outlined'
            onClick={handleClickSecundary}
          >
            Solicitar dossier
          </Button>
          <Button
            size='small'
            color={'primary'}
            variant='contained'
            onClick={handleClickPrimary}
          >
            Cotizar
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}

const headerStyle = {
  height: 20,
  top: -10,
  position: 'relative',
  left: 10,
  zIndex: 1000
}

function FloatingHeader ({ icon: Icon, color }) {
  return (
    <Box display='flex' style={headerStyle} alignItems='center'>
      {Icon && (
        <Box
          display='flex'
          borderRadius='50%'
          p={1.5}
          mx={2}
          style={{ background: color }}
          justifyContent='center'
          alignItems='center'
        >
          <Icon style={{ color: 'white' }} size='1.5em' />
        </Box>
      )}
    </Box>
  )
}
