import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'

export default function Home () {
  const [services, setServices] = useState([])
  const classes = useStyles()
  useEffect(() => {
    ;(async () => {
      const result = await API.Service.getAll()
      setServices(result)
    })()
  }, [])
  console.log(`services`, services)
  return (
    <Box mt={16}>
      <Typography className={classes.title} variant='h2' gutterBottom>
        Sentir Creativo{' '}
        <Typography
          variant='h2'
          component='span'
          color='primary'
          className={classes.title}
        >
          ¡Anímate!
        </Typography>
      </Typography>
      <Typography variant='h5' gutterBottom color='textSecondary' paragraph>
        Agencia de Talentos en Antofagasta Abierto las 24 horas.
      </Typography>
      <Button variant='contained' color='primary'>
        Contactanos
      </Button>
      <Box mt={8}>
        {services.map(s => (
          <Card
            key={s.nombre}
            title={s.nombre}
            imageUrl={
              'https://lh3.googleusercontent.com/MBD0jOYrgUVHTZIvHgHoZJUWyAwXrL-VVuJ-hhvG_c--qKkfVkS0VFuId8wU57ChBZO8IsJ2aOY6ueEByg=w960-h960-n-o-v1'
            }
            imageTitle={''}
            sintesis={s.sintesis}
            slogan={s.slogan}
          />
        ))}
      </Box>
    </Box>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold' }
}))
