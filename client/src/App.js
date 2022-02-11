import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { useDarkMode } from './theme'
import Sidebar from './components/sidebar/Sidebar'
import DashboardSidebar from './components/sidebar/DashboardSidebar'
import RouterApp from './router/router.app'
import { useLocation } from 'react-router-dom'
import { Alert } from './components/snackbar-alert'
import Footer from './components/footer/Footer'
import { useUserState } from './providers/context/User'
import ScrollUp from './components/scrollUp/ScrollUp'

function App () {
  const [theme] = useDarkMode()
  const themeConfig = createTheme(theme)
  const location = useLocation()
  const isAdminArea = location.pathname.includes('admin')
  const user = useUserState()

  let content = <RouterApp />
  if (isAdminArea) content = <DashboardSidebar>{content}</DashboardSidebar>
  else content = <Sidebar>{content}</Sidebar>

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Alert />
      {content}
      {isAdminArea && !user ? null : <Footer />}
      <ScrollUp />
    </MuiThemeProvider>
  )
}
export default App
