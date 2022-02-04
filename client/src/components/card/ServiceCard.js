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
import clsx from 'clsx'
import Tags from '../tags/Tags'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%'
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
    slogan,
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
        <CardActionArea onClick={handleClick}>
          <CardHeader
            component={Box}
            title={text}
            avatar={
              <Box className={classes.avatar} bgcolor={cardColor} p={1}>
                <Icon size={'2em'} />
              </Box>
            }
            action={
              <Box display='flex' flexDirection='column'>
                {tecnica_artisticas.map((t, i) => (
                  <Typography
                    variant='caption'
                    color='textSecondary'
                    align='right'
                    key={i}
                  >
                    {t?.nombre || ''}
                  </Typography>
                ))}
              </Box>
            }
            subheader={slogan}
          />
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
              display='flex'
              bgcolor={cardColor}
              flexDirection='column'
              justifyContent='flex-end'
              p={4}
            >
              <Tags tags={tags} color={cardColor} />
              <Box mt={2} color='white'>
                <Typography variant='h3' align='right'>
                  Ideal para:
                </Typography>
                {ocasions.map((o, i) => (
                  <Typography variant='body2' align='right' key={i}>
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
