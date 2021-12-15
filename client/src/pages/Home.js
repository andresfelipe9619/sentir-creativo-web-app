import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'
import Carousel from 'react-material-ui-carousel'
import { useHistory, useLocation } from 'react-router-dom'
import { splitArrayIntoChunksOfLen } from '../utils'
import ServicioModal from '../components/modals/ServicioModal'
import DossierModal from '../components/modals/DossierModal'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function Home () {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [showDossier, setShowDossier] = useState(false)
  const history = useHistory()
  const query = useQuery()
  const selectedId = query.get('service')
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    ;(async () => {
      const serviceResult = await API.Servicio.getAll({
        params: { 'estado.id': 12 }
      })
      setServices(serviceResult)
    })()
  }, [])

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
  const chunks = splitArrayIntoChunksOfLen(services, length)
  return (
    <Box mt={8}>
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
      <Carousel
        autoPlay
        navButtonsAlwaysVisible={isSmall}
        interval={7000}
        slide
      >
        {chunks.map((chunk, i) => (
          <Grid
            key={i}
            container
            component={Box}
            my={0}
            m={0}
            p={0}
            alignItems='center'
          >
            {chunk.map(s => (
              <Grid
                xs={12 / length}
                component={Box}
                m={0}
                p={0}
                item
                key={s.id}
              >
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
        ))}
      </Carousel>
    </Box>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold' }
}))
