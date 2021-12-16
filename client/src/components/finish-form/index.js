import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import React from 'react'
import image from '../../assets/iso-fullc-large.png'

export default function FinishForm ({ title, text, handleClick }) {
  return (
    <Grid container>
      <Grid item md={6}>
        <Typography variant='h2' color='primary' paragraph>
          {title}
        </Typography>
        <Typography variant='body2' paragraph>
          En breves segundos recibirás {text}.
        </Typography>
        <Typography variant='body2' paragraph>
          Revisa en tu bandeja de entrada y también en el spam, por si... las
          virtualidades no nos entienden, jaja.
        </Typography>
        <Typography variant='body2' paragraph>
          Si le complace, puedes continuar explorando nuestro catálogo digital,
          de nuestra <strong> Red de Artistas.</strong>
        </Typography>
        <Typography variant='body2' paragraph>
          <strong>#vamosAnímate</strong>
        </Typography>
      </Grid>
      <Grid item md={6}>
        <img
          width='100%'
          src={
            'https://live.staticflickr.com/7132/26854237651_480cff5e7b_k.jpg'
          }
          alt='side'
        />
        <Box width='100%' padding={1} justifyContent='flex-end' display='flex'>
          <img
            src={image}
            alt='sentir creativo logo'
            width={60}
            style={{ margin: 4 }}
            height='auto'
          />
          <Button
            color='primary'
            variant='contained'
            style={{ margin: 8 }}
            onClick={handleClick}
          >
            Seguir explorando
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
