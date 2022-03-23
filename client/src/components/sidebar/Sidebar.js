import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import API from '../../api'
import { useStyles } from './styles'
import { useMediaQuery } from '@material-ui/core'
import { Suspense } from 'react'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'
import { useTheme } from '@material-ui/styles'
import { DesktopHeader, MobileHeader } from './headers'

export default function Sidebar ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const [areas, setAreas] = useState([])
  const [laoding, setLaoding] = useState(true)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const goTo = path => () => history.push(path)

  const setAreaIcon = area => {
    let icono = null

    if (/\//.test(area.icono)) {
      let [prefix, name] = area.icono.split('/')

      if (prefix === 'gi') icono = GI[name]
      if (prefix === 'io5') icono = IO5[name]
    }

    return {
      ...area,
      icono
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        let result = await API.Area.getAll()
        result = result.map(setAreaIcon)
        setAreas(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLaoding(false)
      }
    })()
  }, [])

  if (laoding) return null
  const headerProps = { classes, areas, goTo }
  return (
    <div className={classes.root}>
      <Suspense fallback={'Loading ...'}>
        {isMobile && <MobileHeader {...headerProps} />}
        {isDesktop && !isMobile && <DesktopHeader {...headerProps} />}
      </Suspense>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}
