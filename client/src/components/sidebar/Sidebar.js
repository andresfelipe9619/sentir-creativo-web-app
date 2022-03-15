import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { useHistory, useLocation } from 'react-router-dom'
import API from '../../api'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import { Suspense } from 'react'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import * as IO5 from 'react-icons/io5'
import * as GI from 'react-icons/gi'
import { getAreaBackground } from '../../utils'

const ICON_SIZE = '1.6em'

const getYellow = index => (index % 2 === 0 ? '#fed901' : '#fff158')

export default function Sidebar ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const { pathname } = useLocation()
  const [areas, setAreas] = useState([])
  const [value, setValue] = useState(null)
  const [laoding, setLaoding] = useState(true)

  const goTo = path => () => history.push(path)

  useEffect(() => {
    ;(async () => {
      try {
        let result = await API.Area.getAll()
        result = result.map(area => {
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
        })
        setAreas(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLaoding(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (!pathname.includes('areas')) return
    let [id] = pathname.split('/').reverse()
    console.log('id', id)
    if (id && +id !== +value) {
      setValue(+id)
    }
  }, [value, pathname])

  if (laoding) return null
  return (
    <div className={classes.root}>
      <Suspense fallback={'Loading ...'}>
        <AppBar position='fixed' className={clsx(classes.appBar)} elevation={0}>
          <Toolbar disableGutters>
            <Box width='100%' display='flex' justifyContent='center'>
              <ButtonGroup
                variant='text'
                color='secondary'
                className={classes.navigation}
              >
                <Button
                  fullWidth
                  key={'sentir creativo'}
                  onClick={() => goTo(`/`)()}
                  style={{ background: '#ffec11' }}
                  startIcon={
                    <WbSunnyIcon
                      style={{ fontSize: parseFloat(ICON_SIZE) * 2 + 'em' }}
                    />
                  }
                >
                  Sentir CREATIVO .com
                </Button>
                {areas.map((area, i) => {
                  const selected = area.id === value
                  const style = {
                    background: selected
                      ? getAreaBackground(area)
                      : getYellow(i),
                    color: selected ? 'white' : '#4D4C4C'
                  }
                  return (
                    <Button
                      key={area.nombre}
                      style={style}
                      onClick={() => {
                        setValue(area.id)
                        goTo(`/areas/${area.id}`)()
                      }}
                      startIcon={area.icono && <area.icono size={ICON_SIZE} />}
                    >
                      {area.nombre}
                    </Button>
                  )
                })}
                <Button
                  fullWidth
                  size='large'
                  key={'quienes somos'}
                  style={{
                    background: '#ff6c00',
                    color: 'white'
                  }}
                  onClick={() => goTo(`/about`)()}
                  endIcon={<WbSunnyIcon style={{ fontSize: ICON_SIZE }} />}
                >
                  ¿Quienes somos?
                </Button>
              </ButtonGroup>
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
