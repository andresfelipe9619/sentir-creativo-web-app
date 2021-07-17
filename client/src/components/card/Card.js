import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 420
  },
  media: {
    height: 400
  }
})

export default function MediaCard ({
  title,
  imageUrl,
  imageTitle,
  sintesis,
  slogan
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={8}>
      <CardActionArea>
        <CardHeader title={title} subheader={slogan} />
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'></Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {sintesis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
