import * as React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const DOMAIN = "sentircreativo"
const HOST = `https://www.${DOMAIN}.com`

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 900
  },
  appBar: {
    marginTop: '15%',
    top: 'auto',
    bottom: 0,
    padding: 0,
    background: theme.palette.secondary.light
  }
}))

function Copyright () {
  const classes = useStyles()

  return (
    <Box
      bgcolor='secondary.dark'
      className={classes.title}
      width='100%'
      textAlign='center'
      p={1}
    >
      <Link color='inherit' href={HOST}>
        {DOMAIN}.com
      </Link>{' '}
      {' ® • '}
      {new Date().getFullYear()}
    </Box>
  )
}

function Block ({ title, items }) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={4}>
      <Typography
        variant='h3'
        component='h5'
        marked='left'
        gutterBottom
        className={classes.title}
      >
        {title}
      </Typography>
      <Box component='ul' sx={{ m: 0, listStyle: 'none', p: 0 }}>
        {items.map(i => {
          if (!i.link) {
            return (
              <Box component='li' sx={{ py: 0.5 }} key={i.title}>
                <Typography>{i.title}</Typography>
              </Box>
            )
          }
          return (
            <Box component='li' sx={{ py: 0.5 }} key={i.title}>
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
          px={0}
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
                    title: 'Creaciones Cuánticas',
                    link: `${HOST}/areas/1`
                  },
                  {
                    title: 'Felicidad Organizacional',
                    link: `${HOST}/areas/2`
                  },
                  {
                    title: 'Universidad Creativa',
                    link: `${HOST}/areas/3`
                  },
                  {
                    title: 'Innovación Digital',
                    link: `${HOST}/areas/4`
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
                    title: 'Facebook',
                    link: 'https://es-la.facebook.com/Sentircreativo/'
                  },
                  {
                    title: 'Twitter',
                    link: 'https://twitter.com/sentir_creativo?lang=es'
                  },
                  {
                    title: 'Instagram',
                    link: 'https://www.instagram.com/sentircreativo/?hl=es-la'
                  },
                  {
                    title: 'Albúm Fotográfico',
                    link: 'https://flickr.com/photos/sentircreativo/'
                  }
                ]}
              />
              <Block
                title='¡Únete a la red!'
                key='¡Únete a la red!'
                items={[
                  {
                    title:
                      'Si eres artista y quieres ser parte de la Red de Artístas ¡Súmate aquí!',
                    link:
                      'https://docs.google.com/forms/d/1FVd6VYloB6CSqSVOO_cYyxKz4K7SFNpdzf39x0zRMAc'
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
                    title: 'Whatsapp: +569 684 98 645',
                    link: 'https://wa.me/56968498645'
                  },
                  {
                    title: `Email: holabuendia@${DOMAIN}.com`
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
