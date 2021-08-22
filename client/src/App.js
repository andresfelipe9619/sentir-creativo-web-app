import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { useDarkMode } from './theme'
import Sidebar from './components/sidebar/Sidebar'
import DashboardSidebar from './components/sidebar/DashboardSidebar'
import RouterApp from './router/router.app'
import { useLocation } from 'react-router-dom'

function App () {
  const [theme] = useDarkMode()
  const themeConfig = createTheme(theme)
  const location = useLocation()
  const isAdminArea = location.pathname.includes('admin')

  let content = <RouterApp />
  if (isAdminArea) content = <DashboardSidebar>{content}</DashboardSidebar>
  else content = <Sidebar>{content}</Sidebar>

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      {content}
    </MuiThemeProvider>
  )
}
export default App
