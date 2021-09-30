import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

export default function Files ({ files, title }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {!!title && (
        <Typography component='legend' variant='h5' paragraph>
          {title}
        </Typography>
      )}
      <Box width='100%' display='flex'>
        {(files || []).map(f => (
          <ImgMediaCard key={f.nombre} {...f} />
        ))}
      </Box>
    </div>
  )
}
const isImage = path =>
  ['.png', '.jpg', '.jpeg', '.gif', '.tiff'].some(ext => path.includes(ext))

export function ImgMediaCard ({ id, nombre, path, tipo_archivo }) {
  const history = useHistory()
  function handleView () {
    history.push(`/admin/archivos/${id}`)
  }
  function handleLink(){
    window.open(path, "_blank")
  }
  return (
    <Card style={{ maxWidth: 180, margin: 8 }}>
      {isImage(path) && (
        <CardMedia component='img' alt='file' height='120' image={path} />
      )}
      <CardContent>
        <Typography gutterBottom variant='subtitle1' component='div'>
          {nombre}
        </Typography>
        {tipo_archivo && (
          <Typography variant='caption' color='text.secondary' component='div'>
            {tipo_archivo.nombre}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size='small' color='primary' onClick={handleView}>
          Ver
        </Button>
        <Button size='small' color='primary' onClick={handleLink}>
          Abir Link
        </Button>
      </CardActions>
    </Card>
  )
}
