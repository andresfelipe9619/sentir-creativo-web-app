import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { useDarkMode } from "./theme";
import Sidebar from "./components/sidebar/Sidebar";
import DashboardSidebar from "./components/sidebar/DashboardSidebar";
import RouterApp from "./router/router.app";
import { useLocation } from "react-router-dom";
import { Alert } from "./components/snackbar-alert";
import Footer from "./components/footer/Footer";
import { useUserState } from "./providers/context/User";
import ScrollUp from "./components/scrollUp/ScrollUp";
import Construction from "./pages/Construction";

const { REACT_APP_CONSTRUCTION } = process.env;
const underConstruction =
  REACT_APP_CONSTRUCTION === true || REACT_APP_CONSTRUCTION === "true";

function App() {
  const [theme] = useDarkMode();
  const themeConfig = createTheme(theme);
  const { pathname } = useLocation();
  const isAdminArea = pathname.includes("admin");
  const user = useUserState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let content = <RouterApp />;
  if (isAdminArea) content = <DashboardSidebar>{content}</DashboardSidebar>;
  else content = <Sidebar>{content}</Sidebar>;
  if (underConstruction) return <Construction />;

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Alert />
      {content}
      {isAdminArea && !user ? null : <Footer />}
      <ScrollUp />
    </MuiThemeProvider>
  );
}
export default App;
