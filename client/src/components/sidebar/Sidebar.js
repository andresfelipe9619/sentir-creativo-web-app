import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useHistory } from 'react-router-dom'
import API from '../../api'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import { Suspense } from 'react'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'

export default function Sidebar ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const [areas, setAreas] = useState([])
  const [value, setValue] = useState(null)

  const goTo = path => () => history.push(path)

  useEffect(() => {
    ;(async () => {
      let result = await API.Area.getAll()
      result = result.map(area => {
        let [prefix, name] = area.icono.split('/')
        let icono = null
        if (prefix === 'gi') icono = GI[name]
        if (prefix === 'io5') icono = IO5[name]

        return {
          ...area,
          icono
        }
      })
      setAreas(result)
    })()
  }, [])

  return (
    <div className={classes.root}>
      <Suspense fallback={'...'}>
        <AppBar position='fixed' className={clsx(classes.appBar)}>
          <Toolbar>
            <Box width='100%' display='flex' justifyContent='center'>
              <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                  let id = areas[newValue].id
                  setValue(newValue)
                  goTo(`/areas/${id}`)()
                }}
                showLabels={true}
                className={classes.navigation}
              >
                {areas.map((area, i) => {
                  return (
                    <BottomNavigationAction
                      key={area.nombre}
                      style={{
                        background: area.colorPrimario,
                        opacity: i === value ? 1 : 0.8,
                        color: 'white'
                      }}
                      label={area.nombre}
                      icon={<area.icono size={'2em'} />}
                    />
                  )
                })}
              </BottomNavigation>
            </Box>
          </Toolbar>
        </AppBar>
      </Suspense>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}
