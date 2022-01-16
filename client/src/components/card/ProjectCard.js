import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router'
import { formatDate } from '../../utils'
import { Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default function ProjectCard ({
  id,
  nombre,
  fechaFin,
  audiencia,
  fechaInicio,
  tipo_proyecto,
  estado_proyecto
}) {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = () => {
    history.push(`/admin/proyectos/${id}`)
  }
  return (
    <Card className={classes.root} elevation={5}>
      <CardContent className={classes.content}>
        <Typography color='textSecondary' gutterBottom>
          {audiencia?.nombre || 'No Audiencia'} -{' '}
          {audiencia?.organizacion?.nombre || 'No Org'}
        </Typography>
        <Tooltip title={nombre}>
          <Typography variant='h6' component='h2' className={classes.title}>
            {nombre}
          </Typography>
        </Tooltip>
        <Typography className={classes.pos} color='textSecondary'>
          {fechaInicio ? formatDate(fechaInicio, false) : ''}
          {fechaInicio && fechaFin && ' - '}
          {fechaFin ? formatDate(fechaFin, false) : ''}
        </Typography>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          className={classes.chips}
        >
          {tipo_proyecto && <Chip label={tipo_proyecto.nombre} />}
          {estado_proyecto && (
            <Tooltip title={estado_proyecto.nombre}>
              <Chip
                label={estado_proyecto.nombre}
                variant='outlined'
                style={{ background: estado_proyecto.color }}
              />
            </Tooltip>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={handleClick}
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 280,
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%'
  },
  content: {
    height: '80%'
  },
  chips: {
    '& > *': {
      maxWidth: '100%',
      margin: theme.spacing(0.5)
    }
  },
  title: {
    width: 260,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))
