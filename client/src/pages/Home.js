import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'
import Carousel from 'react-material-ui-carousel'
import Tags from '../components/tags/Tags'
import { splitArrayIntoChunksOfLen } from '../utils'

export default function Home () {
  const [services, setServices] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    ;(async () => {
      const serviceResult = await API.Service.getAll()
      setServices(serviceResult)

      const tagResult = await API.Tag.getAll()
      setTags(tagResult)
    })()
  }, [])

  const chunks = splitArrayIntoChunksOfLen(services, 3)
  return (
    <Box mt={8}>
      <Tags tags={tags} />
      <Carousel autoPlay={true} navButtonsAlwaysVisible={false} interval={7000} slide>
        {chunks.map(chunk => (
          <Grid container component={Box} my={0} m={0} p={0} alignItems='center' >
            {chunk.map(s => (
              <Grid xs={4} component={Box} m={0} p={0} item >
                <Card
                  key={s.nombre}
                  title={s.nombre}
                  imageUrl={(s?.archivos || [])[0]?.path}
                  imageTitle={''}
                  sintesis={s.sintesis}
                  slogan={s.slogan}
                 
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
