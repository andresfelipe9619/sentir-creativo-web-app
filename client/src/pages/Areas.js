import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
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
  const [loading, setLoading] = useState(true)
  const { id: areaId } = useParams()
  const selectedId = query.get('service')
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    ;(async () => {
      try {
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
  return (
    <Box mt={3}>
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
      <Box mb={3}>
        <Typography variant='h4' paragraph gutterBottom>
          {selectedArea.nombre}
        </Typography>
      </Box>
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
    </Box>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold' }
}))
