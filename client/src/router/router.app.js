import React, { memo, Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import routerConfig from "./router.config";
import NotFound from "../pages/NotFound";
import { JellyfishSpinner } from "react-spinners-kit";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core";

function RouterApp() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routerConfig.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
        <Route
          exact
          path="/not-found"
          render={(props) => <NotFound {...props} />}
        />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
}

const Spinner = () => {
  const theme = useTheme();
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center">
      <JellyfishSpinner loading size={200} color={theme.palette.primary.main} />
    </Box>
  );
};
export default memo(RouterApp);
