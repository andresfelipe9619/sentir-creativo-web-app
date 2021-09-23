import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Switch, Route } from 'react-router-dom'
import Servicios from '../components/dashboard/servicio/Servicios'
import Proyectos from '../components/dashboard/proyecto/Proyectos'
import Audiencia from '../components/dashboard/audiencia/Audiencia'
import Reports from '../components/dashboard/reports/Reports'
import Archivos from '../components/dashboard/archivos/Archivos'
import Tags from '../components/dashboard/tag/Tags'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

export default function Dashboard (props) {
  const classes = useStyles()

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        <Switch>
          <Route
            render={routerProps => <Audiencia {...routerProps} />}
            path={`${props.match.url}/audiencia`}
          />
          <Route
            render={routerProps => <Servicios {...routerProps} />}
            path={`${props.match.url}/servicios`}
          />
          <Route
            render={routerProps => <Proyectos {...routerProps} />}
            path={`${props.match.url}/proyectos`}
          />
          <Route
            render={routerProps => <Reports {...routerProps} />}
            path={`${props.match.url}/reportes`}
          />
          <Route
            render={routerProps => <Archivos {...routerProps} />}
            path={`${props.match.url}/archivos`}
          />
          <Route
            render={routerProps => <Tags {...routerProps} />}
            path={`${props.match.url}/tags`}
          />
        </Switch>
      </Grid>
    </Container>
  )
}
