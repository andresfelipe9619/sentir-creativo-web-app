import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import clsx from 'clsx'
import { getAreaBackground } from '../../utils'

const ICON_SIZE = '1.6em'

const getYellow = index => (index % 2 === 0 ? '#fed901' : '#fff158')

export function MobileAreasButtons ({ areas, goTo, classes }) {
  const { pathname } = useLocation()
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!pathname.includes('areas')) return
    let [id] = pathname.split('/').reverse()
    console.log('id', id)
    if (id && +id !== +value) {
      setValue(+id)
    }
  }, [value, pathname])

  return (
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
          const selected = area.id === value
          const style = {
            background: selected ? getAreaBackground(area) : getYellow(i),
            color: selected ? 'white' : '#4D4C4C'
          }

          return (
            <BottomNavigationAction
              key={area.nombre}
              style={style}
              label={area.nombre}
              icon={area.icono && <area.icono size={'2em'} />}
            />
          )
        })}
      </BottomNavigation>
    </Box>
  )
}

export function MobileHeader ({ areas, classes, goTo }) {
  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, classes.navigationMobile)}
        elevation={0}
      >
        <Toolbar disableGutters classes={{ root: classes.navigationMobile }}>
          <Box width='70%' display='flex' height='100%'>
            <Button
              fullWidth
              size='large'
              key={'sentircreativo'}
              style={{
                borderRadius: 0,
                background: '#4E4E4E',
                color: 'white'
              }}
              onClick={() => goTo(`/about`)()}
            >
              SentirCreativo.com
            </Button>
          </Box>
          <Box width='30%' display='flex' height='100%'>
            <Button
              fullWidth
              key={'quienes somos'}
              style={{
                fontSize: 12,
                borderRadius: 0,
                background: '#363636',
                color: 'white'
              }}
              onClick={() => goTo(`/about`)()}
            >
              ¿Quienes somos?
            </Button>
          </Box>
        </Toolbar>
        <Toolbar disableGutters>
          <MobileAreasButtons {...{ areas, goTo, classes }} />
        </Toolbar>
      </AppBar>
    </>
  )
}

function AreasButtons ({ areas, goTo }) {
  const { pathname } = useLocation()
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!pathname.includes('areas')) return
    let [id] = pathname.split('/').reverse()
    console.log('id', id)
    if (id && +id !== +value) {
      setValue(+id)
    }
  }, [value, pathname])

  return areas.map((area, i) => {
    const selected = area.id === value
    const style = {
      borderRadius: 0,
      background: selected ? getAreaBackground(area) : getYellow(i),
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
  })
}

export function DesktopHeader ({ areas, classes, goTo }) {
  return (
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
              style={{ background: '#ffec11', borderRadius: 0 }}
              startIcon={
                <WbSunnyIcon
                  style={{ fontSize: parseFloat(ICON_SIZE) * 2 + 'em' }}
                />
              }
            >
              Sentir CREATIVO .com
            </Button>

            <AreasButtons {...{ areas, goTo }} />

            <Button
              fullWidth
              size='large'
              key={'quienes somos'}
              style={{
                borderRadius: 0,
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
  )
}
