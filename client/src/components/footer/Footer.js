import * as React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

function Copyright () {
  const name = 'sentircreativo.com'
  return (
    <Box bgcolor='secondary.dark' width='100%' textAlign='center' p={1}>
      <Link color='inherit' href={`https://${name}/`}>
        {name}
      </Link>{' '}
      {' ® • '}
      {new Date().getFullYear()}
    </Box>
  )
}
const useStyles = makeStyles(theme => ({
  appBar: {
    marginTop: '15%',
    top: 'auto',
    bottom: 0,
    padding: 0,
    background: theme.palette.secondary.light
  }
}))

function Block ({ title, items }) {
  return (
    <Grid item xs={6} sm={4}>
      <Typography variant='h6' marked='left' gutterBottom>
        {title}
      </Typography>
      <Box component='ul' sx={{ m: 0, listStyle: 'none', p: 0 }}>
        {items.map(i => {
          if (!i.link) {
            return (
              <Box component='li' sx={{ py: 0.5 }}>
                <Typography>{i.title}</Typography>
              </Box>
            )
          }
          return (
            <Box component='li' sx={{ py: 0.5 }}>
              <Link href={i.link}>{i.title}</Link>
            </Box>
          )
        })}
      </Box>
    </Grid>
  )
}

export default function AppFooter () {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Box
          component='footer'
          display='flex'
          bottom={0}
          width='100%'
          bgcolor='secondary.light'
          px={12}
          pt={8}
          pb={2}
        >
          <Container>
            <Grid container spacing={5}>
              <Block
                title='Somos'
                key='Somos'
                items={[
                  {
                    title:
                      'Una industria creativa artística, con 7 años de experiencias lúdicas y técnicas.'
                  }
                ]}
              />
              <Block
                title='Áreas'
                key='Áreas'
                items={[
                  {
                    title: 'Creaciones Cuánticas'
                  },
                  {
                    title: 'Felicidad Organizacional'
                  },
                  {
                    title: 'Universidad Creativa'
                  },
                  {
                    title: 'Innovación Digital'
                  }
                ]}
              />
              <Block
                title='Colecciones'
                key='Colecciones'
                items={[
                  {
                    title: 'Navidad 2021'
                  },
                  {
                    title: 'Verano 2022'
                  }
                ]}
              />
              <Block
                title='Redes'
                key='Redes'
                items={[
                  {
                    title: 'Facebook'
                  },
                  {
                    title: 'Twitter'
                  },
                  {
                    title: 'Instagram'
                  },
                  {
                    title: 'Albúm Fotográfico'
                  }
                ]}
              />
              <Block
                title='¡Únete a la red!'
                key='¡Únete a la red!'
                items={[
                  {
                    title:
                      'Si eres artista y quieres ser parte de la Red de Artístas ¡Súmate aquí!'
                  }
                ]}
              />
              <Block
                title='Sede central'
                key='Sede central'
                items={[
                  {
                    title: 'Avenida Juan Pablo II #446 Antofagasta - Chile'
                  }
                ]}
              />
              <Block
                title='Contacto'
                key='Contacto'
                items={[
                  {
                    title: 'Whatsapp: +569 684 98 645'
                  },
                  {
                    title: 'Email: holabuendia@sentircreativo.com'
                  }
                ]}
              />

              <Grid item container justifyContent='center'>
                <Copyright />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
