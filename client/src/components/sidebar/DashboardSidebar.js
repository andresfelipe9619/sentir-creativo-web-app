import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import MuiSwitch from "@material-ui/core/Switch";
import clsx from "clsx";
import { MainListItems } from "../dashboard/ListItems";
import { useDashboardStyles } from "./styles";
import AccessDenied from "../../router/AccessDenied";
import API from "../../api";
import CustomBreadcrumbs from "./BreadCrumb";
import { useFilters } from "../../providers/context/Filters";
import useDashboard from "../../providers/hooks/useDashboard";
import { useTheme, createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function DashboardSidebar({ children }) {
  const [open, setOpen] = useState(false);
  const classes = useDashboardStyles();
  const token = API.getToken();
  const history = useHistory();
  const [{ showCards }, { toggleCardsView }] = useFilters();
  const dashboardItem = useDashboard();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (path) => () => {
    handleDrawerClose();
    history.push(path);
  };

  const handleChange = (e) => toggleCardsView(e.target.checked);

  const color = dashboardItem?.color || theme.palette.primary.main;
  const customTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: color },
    },
  });
  if (!token) return <AccessDenied />;
  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <CustomBreadcrumbs />
            <Box display="flex" justifyContent="flex-end" mx={3}>
              <FormControlLabel
                control={
                  <MuiSwitch
                    checked={showCards}
                    onChange={handleChange}
                    name="cardView"
                    color="secondary"
                  />
                }
                label="Vista Cards"
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems
              handleClick={handleClick}
              color={color}
              dashboardItem={dashboardItem}
            />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
