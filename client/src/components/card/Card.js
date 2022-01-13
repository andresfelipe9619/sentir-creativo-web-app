import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { Badge } from '@material-ui/core'
import { useTheme, createTheme, ThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

export default function MediaCard ({
  title,
  chip,
  color,
  slogan,
  imageUrl,
  imageTitle,
  handleClick,
  handleClickPrimary,
  handleClickSecundary
}) {
  const classes = useStyles()
  const theme = useTheme()
  const cardColor = color || theme.palette.primary.main
  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor }
    }
  })

  const text = <Typography variant='h3'>{title}</Typography>
  return (
    <ThemeProvider theme={areaTheme}>
      <Card className={classes.root} elevation={5}>
        <CardActionArea onClick={handleClick}>
          <CardHeader
            component={Box}
            maxWidth={340}
            title={
              chip ? (
                <Badge
                  p={1}
                  badgeContent={chip}
                  color='primary'
                  component={Box}
                >
                  {text}
                </Badge>
              ) : (
                text
              )
            }
            subheader={
              <Chip
                component={Box}
                maxWidth={300}
                label={slogan}
                color={'secondary'}
                size='small'
              />
            }
          />
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={imageTitle}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='p'></Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {/* {sintesis} */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color={'primary'}
            variant='contained'
            onClick={handleClickPrimary}
          >
            Cotizar
          </Button>
          <Button
            size='small'
            color={'primary'}
            variant='outlined'
            onClick={handleClickSecundary}
          >
            Solicitar dossier
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}
