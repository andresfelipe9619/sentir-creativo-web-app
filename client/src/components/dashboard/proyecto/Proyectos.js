import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router'
import columns from './columns'
import MasterDetail from '../../master-detail/MasterDetail'
import { formatDate } from '../../../utils'
import { Chip } from '@material-ui/core'

export default function Proyectos () {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const length = isSmall ? 1 : isMedium ? 2 : 3

  const detail = { columns }

  return (
    <MasterDetail
      detailProps={detail}
      service='Proyecto'
      renderMaster={({ data }) => (
        <Grid item container md={12}>
          {data.map(p => (
            <Grid item md={12 / length}>
              <ProjectCard {...p} />
            </Grid>
          ))}
        </Grid>
      )}
    />
  )
}

const useStyles = makeStyles({
  root: {
    height: 200,
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%'
  },
  title: {
    width: 260,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})

function ProjectCard ({
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
      <CardContent>
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
        {tipo_proyecto && <Chip label={tipo_proyecto.tipo} />}
        {estado_proyecto && (
          <Chip label={estado_proyecto.nombre} variant='outlined' />
        )}
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