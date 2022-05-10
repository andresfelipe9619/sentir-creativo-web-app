import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import Servicios from "../components/dashboard/servicio/Servicios";
import Proyectos from "../components/dashboard/proyecto/Proyectos";
import Audiencia from "../components/dashboard/audiencia/Audiencia";
import Staff from "../components/dashboard/staff/Staff";
import Colecciones from "../components/dashboard/coleccion/Colecciones";
import Reports from "../components/dashboard/reports/Reports";
import Archivos from "../components/dashboard/archivos/Archivos";
import Tags from "../components/dashboard/tag/Tags";
import Organizaciones from "../components/dashboard/organizacion/Organizaciones";
import Tareas from "../components/dashboard/tarea/Tareas";


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const items = [
    {
      path: "/audiencia",
      render: (routerProps) => <Audiencia {...routerProps} />,
    },
    {
      path: "/organizaciones",
      render: (routerProps) => <Organizaciones {...routerProps} />,
    },
    {
      path: "/servicios",
      render: (routerProps) => <Servicios {...routerProps} />,
    },
    {
      path: "/proyectos",
      render: (routerProps) => <Proyectos {...routerProps} />,
    },
    {
      path: "/reportes",
      render: (routerProps) => <Reports {...routerProps} />,
    },
    {
      path: "/archivos",
      render: (routerProps) => <Archivos {...routerProps} />,
    },
    { path: "/staff", render: (routerProps) => <Staff {...routerProps} /> },
    {
      path: "/colecciones",
      render: (routerProps) => <Colecciones {...routerProps} />,
    },
    { path: "/tags", render: (routerProps) => <Tags {...routerProps} /> },
    { path: "/tareas", render: (routerProps) => <Tareas {...routerProps} /> },
  ];
  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        <Switch>
          {items.map((item, i) => (
            <Route
              key={i}
              render={item.render}
              path={`${props.match.url}${item.path}`}
            />
          ))}
        </Switch>
      </Grid>
    </Box>
  );
}
