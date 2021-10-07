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

const useStyles = makeStyles({
  root: {
    minWidth: 330,
    height: 300,
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%',
    borderRadius: '3%'
  },
  media: {
    maxHeight: 300,
    minHeight: 90
  }
})

export default function MediaCard ({
  title,
  slogan,
  imageUrl,
  imageTitle,
  handleClickPrimary,
  handleClickSecundary,
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea>
        <CardHeader
          component={Box}
          maxWidth={300}
          title={
            /* Agregando Badges & Chimps_byColibri */
            <Badge component={Box} p={0} badgeContent='new' color='primary'>
              {title}
            </Badge>

            /* la idea es traer las Tecnicas Artisticas o los tags en vez de slogan_byColibri */
          }
          subheader={
            <Chip
              component={Box}
              maxWidth={300}
              label={slogan}
              color='secondary'
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
          color='primary'
          variant='contained'
          onClick={handleClickPrimary}
        >
          Cotizar
        </Button>
        <Button
          size='small'
          color='primary'
          variant='outlined'
          onClick={handleClickSecundary}
        >
          Solicitar dossier
        </Button>
      </CardActions>
    </Card>
  )
}
