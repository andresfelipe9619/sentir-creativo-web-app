import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Route } from "react-router";
import Box from "@material-ui/core/Box";
import { DashboardRoutes } from "../../router/router.config";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const useStyles = makeStyles((theme) => ({
  link: {
    fontWeight: "bold",
    display: "flex",
    color: "white",
  },
  root: {
    color: "white",
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function CustomBreadcrumbs() {
  const classes = useStyles();

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);

        return (
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            className={classes.root}
          >
            <LinkRouter color="inherit" href="/" className={classes.link}>
              Administración
            </LinkRouter>

            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const route = DashboardRoutes.find((route) => route.path === to);
              if (!route) return null;
              const { icon: Icon, name } = route;
              return last ? (
                <Box
                  display="flex"
                  alignItems="center"
                  color="disabled"
                  key={to}
                >
                  {Icon && <Icon />}
                  {name}
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  key={to}
                >
                  {Icon && <Icon />}
                  <LinkRouter color="inherit" to={to}>
                    {name}
                  </LinkRouter>
                </Box>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}
