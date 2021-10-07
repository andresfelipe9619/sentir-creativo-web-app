import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'
import Carousel from 'react-material-ui-carousel'
import { useHistory, useLocation } from 'react-router-dom'
// import Tags from '../components/tags/Tags'
import { splitArrayIntoChunksOfLen } from '../utils'
import ServicioModal from '../components/modals/ServicioModal'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function Home () {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const history = useHistory()
  // const [tags, setTags] = useState([])ThemeProvider
  const [showModal, setShowModal] = useState(false)
  const query = useQuery()
  console.log(`query`, query)
  useEffect(() => {
    ;(async () => {
      const serviceResult = await API.Service.getAll()
      setServices(serviceResult)

      // const tagResult = await API.Tag.getAll()
      // setTags(tagResult)
    })()
  }, [])

  const handleOpenModal = service => () => {
    setSelectedService(service)
    history.push({ search: `?service=${service.id}` })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    history.push({ search: '' })
    setShowModal(false)
    setSelectedService(null)
  }

  const chunks = splitArrayIntoChunksOfLen(services, 3)
  return (
    <Box mt={8}>
      <ServicioModal
        open={showModal}
        handleClose={handleCloseModal}
        service={selectedService}
      />
      {/* <Tags tags={tags} /> */}
      <Carousel autoPlay navButtonsAlwaysVisible={false} interval={7000} slide>
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
              <Grid xs={4} component={Box} m={0} p={0} item key={s.id}>
                <Card
                  title={s.nombre}
                  imageUrl={(s?.archivos || [])[0]?.path}
                  imageTitle={''}
                  sintesis={s.sintesis}
                  slogan={s.slogan}
                  handleClickPrimary={handleOpenModal(s)}
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
