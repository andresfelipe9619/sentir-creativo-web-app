import { useHistory } from 'react-router'
import { formatDate } from '../../utils'
import yellow from '@material-ui/core/colors/yellow'
import AdminCard, { Stat, DenseTable, createData } from './AdminCard'
import Grid from '@material-ui/core/Grid'
import orange from '@material-ui/core/colors/orange'
import blue from '@material-ui/core/colors/blue'
import StarIcon from '@material-ui/icons/Star'
import LooksIcon from '@material-ui/icons/Looks'
import PostAddIcon from '@material-ui/icons/PostAdd'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import WorkIcon from '@material-ui/icons/Work'

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

export default function ProjectCard ({
  id,
  nombre,
  avance,
  impacto,
  fechaInicio,
  destacado,
  formato,
  servicio,
  publico_objetivos,
  audiencia,
  staf,
  estado_proyecto,
  tipo_proyecto
}) {
  const history = useHistory()

  const rows = [
    createData('Servicio', servicio?.nombre || 'Sin asignar'),
    createData('Beneficios', publico_objetivos?.map(x => x.nombre).join(', ')),
    createData('P. owner', staf[0]?.nombre ? `${staf[0]?.nombre} ${staf[0]?.apellido}` : 'Sin asignar'),
    createData('Finanzas', staf[0]?.nombre ? `${staf[1]?.nombre} ${staf[1]?.apellido}` : 'Sin asignar'),
    createData('Cupón', audiencia?.cuponDescuento || 'No cupón')
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
    subheaderChip={`${audiencia?.nombre} ${audiencia?.apellido} • ${audiencia?.organizacion?.nombre}`}
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
