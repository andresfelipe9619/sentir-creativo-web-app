import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useDarkMode } from './theme'
import Sidebar from './components/sidebar/Sidebar'
import RouterApp from './router/router.app'

function App () {
  const [theme] = useDarkMode()
  const themeConfig = createMuiTheme(theme)

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Sidebar>
        <RouterApp />
      </Sidebar>
    </MuiThemeProvider>
  )
}
export default App
