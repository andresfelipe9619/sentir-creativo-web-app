import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ServicioModal from '../components/modals/ServicioModal'
import DossierModal from '../components/modals/DossierModal'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Spinner from '../components/spinner/Spinner'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function Areas () {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [showDossier, setShowDossier] = useState(false)
  const history = useHistory()
  const query = useQuery()
  const [loading, setLoading] = useState(false)
  const { id: areaId } = useParams()
  const selectedId = query.get('service')
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const serviceResult = await API.Servicio.getAll({
          params: { area: areaId }
        })
        const areaResult = await API.Area.get(areaId)
        setSelectedArea(areaResult)
        setServices(serviceResult)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [areaId])

  useEffect(() => {
    if (!services) return

    if (!selectedService && selectedId) {
      let found = services.find(s => +s.id === +selectedId)
      found && setSelectedService(found)
    }
  }, [services, selectedService, selectedId])

  const handleOpenModal = service => () => {
    history.push({ search: `?service=${service.id}` })
  }

  const handleCloseModal = () => {
    history.push({ search: '' })
    setSelectedService(null)
  }

  const handleOpenDossier = service => () => {
    setSelectedService(service)
    setShowDossier(true)
  }

  const handleCloseDossier = () => {
    setShowDossier(false)
    setSelectedService(null)
  }

  const length = isSmall ? 1 : isMedium ? 2 : 3
  if (loading) return <Spinner />
  if (!selectedArea) return null
  const color = selectedArea.colorPrimario
  let ocassions = services
    .map(s => (s?.ocasions || []).map(o => o.nombre))
    .flatMap(f => f)
  ocassions = [...new Set(ocassions)]
  return (
    <Grid mt={3} container justifyContent='center'>
      <DossierModal
        open={!!showDossier}
        handleClose={handleCloseDossier}
        service={selectedService}
      />
      <ServicioModal
        open={!!selectedId}
        handleClose={handleCloseModal}
        service={selectedService}
      />
      <Grid item sm={12} md={6}>
        <Typography
          variant='h1'
          align='center'
          paragraph
          gutterBottom
          style={{ color }}
        >
          {selectedArea.nombre}
        </Typography>
        <Typography paragraph gutterBottom>
          {selectedArea.descripcion}
        </Typography>
        <Typography variant='caption' paragraph gutterBottom>
          A continuación presentamos nuestro Catálogo de {selectedArea.nombre}.
          Revisa las experiencias que disponemos de nuestra Red de Artístas,
          solicita un Ticket y obtendrás un presupuesto detallado, sin
          compromiso.
        </Typography>
        <Box mb={3} className={classes.root}>
          <Typography variant='h3' paragraph gutterBottom style={{ color }}>
            Catálogo de experiencias
          </Typography>
          <Typography variant='caption' paragraph gutterBottom>
            Filtra Según la ocasión
          </Typography>
          {(ocassions || []).map(t => (
            <Chip key={t} label={t} />
          ))}
        </Box>
      </Grid>
      <Grid item md={10}></Grid>
      <Grid item md={10}>
        <Typography variant='h3' paragraph gutterBottom color='textSecondary'>
          {services.length} Experiencias conciden con la búsqueda.
        </Typography>
      </Grid>
      <Grid container component={Box} my={0} m={0} p={0} alignItems='center'>
        {services.map(s => (
          <Grid xs={12 / length} component={Box} m={0} p={0} item key={s.id}>
            <Card
              title={s.nombre}
              imageUrl={(s?.archivos || [])[0]?.path}
              imageTitle={''}
              sintesis={s.sintesis}
              slogan={s.slogan}
              handleClickPrimary={handleOpenModal(s)}
              handleClickSecundary={handleOpenDossier(s)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold' },
  root: {
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))
