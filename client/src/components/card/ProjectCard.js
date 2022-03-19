import { useHistory } from 'react-router'
import { formatDate } from '../../utils'
import yellow from '@material-ui/core/colors/yellow'
import AdminCard, { Stat, DenseTable, createData } from './AdminCard'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import orange from '@material-ui/core/colors/orange'
import blue from '@material-ui/core/colors/blue'
import StarIcon from '@material-ui/icons/Star'
import LooksIcon from '@material-ui/icons/Looks'
import PostAddIcon from '@material-ui/icons/PostAdd'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import WorkIcon from '@material-ui/icons/Work'
import useStyles from './styles'

const project = {
  interno: {
    icon: WbSunnyIcon,
    color: '#ef6c00'
  },
  ticket: {
    icon: LooksIcon,
    color: '#ec407a'
  },
  proyecto: {
    icon: WorkIcon,
    color: '#ad14ed'
  }
}

function sliceItems(collection = []) {
  if (!collection) {
    return collection
  }

  if (collection?.length > 2) {
    const others = collection.slice(2).length
    return collection?.slice(0, 2).join(', ') + `, +${others}`
  }

  return collection.join(', ')
}

export default function ProjectCard ({
  id,
  nombre,
  avance,
  impacto,
  fechaInicio,
  destacado,
  formato,
  servicios,
  publico_objetivos,
  audiencia,
  staf,
  estado_proyecto,
  tipo_proyecto,
  cupon_descuentos
}) {
  const classes = useStyles()
  const history = useHistory()

  const rows = [
    createData('Servicio', sliceItems(servicios?.map(x => x?.nombre))),
    createData('Beneficiarios', sliceItems(publico_objetivos?.map(x => x.nombre))),
    createData('P. owner', staf[0]?.nombre ? `${staf[0]?.nombre} ${staf[0]?.apellido}` : 'Sin asignar'),
    createData('Finanzas', staf[0]?.nombre ? `${staf[1]?.nombre} ${staf[1]?.apellido}` : 'Sin asignar'),
    createData('Cupón', sliceItems(cupon_descuentos?.map(x => x?.codigo)))
  ]

  const handleClick = () => {
    history.push(`/admin/proyectos/${id}`)
  }

  const IconStar = destacado ? StarOutlineIcon : StarIcon
  const selectedProject = project[tipo_proyecto?.nombre?.toLowerCase()];

  return (
    <AdminCard
    id={id}
    color={yellow}
    statusColor={estado_proyecto?.color}
    chips={[audiencia?.email, audiencia?.email2, audiencia?.celular]}
    status={estado_proyecto?.nombre}
    title={nombre}
    avatar={tipo_proyecto?.icono}
    handleViewClick={handleClick}
    subheaderChip={<>
      <Typography display='inline' variant='caption' className={classes.accentText}
        onClick={() => history.push('/admin/audiencia/' + audiencia?.id)}>
        {audiencia?.nombre} {audiencia?.apellido}
      </Typography>
      <Typography display='inline' variant='caption'>
       &nbsp;• {audiencia?.organizacion?.nombre}
      </Typography>
    </>}
    superheader={fechaInicio ? formatDate(fechaInicio, true) : ''}
    subheader={`${formato?.nombre} • ${audiencia?.ciudad}`}
    floatingHeader={{
      color: selectedProject?.color,
      icon: selectedProject?.icon,
      label: tipo_proyecto?.nombre,
      score: `${avance || 0}%`
    }}
    renderContent={() => (
      <Grid container item md={12} spacing={3}>
        <Stat
          label={'CANTIDAD DE\nPERSONAS'}
          value={impacto || 0}
          color={orange[800]}
        />
        <Stat
          label={'TAREAS\nVISUALIZADAS'}
          value={0}
          color={blue[600]}
        />
        <Stat
          label={'TAREAS\nAGENDADAS'}
          value={0}
          color={blue[800]}
        />
      </Grid>
    )}
    renderHighlights={() => (
      <DenseTable rows={rows} nombre={nombre} color={yellow} />
    )}
    buttonActions={[
      {
        icon: <IconStar fontSize='large' style={{ color: '#ffab00' }} />,
        label: 'Destacar'
      },
      {
        icon: <PostAddIcon fontSize='large' style={{ color: blue[600] }} />,
        label: 'Agregar'
      }
    ]}
  />
  )
}
