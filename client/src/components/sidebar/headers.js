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
import Logo from '../../assets/iso-fullc-large.png'
import LogoYellow from '../../assets/iso_amarillo.svg'

const ICON_SIZE = '1.6em'

const getYellow = index => (index % 2 === 0 ? '#fed901' : '#fff158')

const buttonsStyle = {
  borderRadius: 0,
  height: 70,
  lineHeight: 1.2,
  padding: 16
}
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
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
      height='100%'
      alignItems='center'
    >
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
            ...buttonsStyle,
            background: selected ? getAreaBackground(area) : getYellow(i),
            color: selected ? 'white' : '#4D4C4C'
          }

          return (
            <BottomNavigationAction
              key={area.nombre}
              style={style}
              label={area.nombre}
              className={classes.buttons}
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
                background: '#4E4E4E',
                color: 'white',
                ...buttonsStyle
              }}
              startIcon={
                <img src={LogoYellow} width={55} alt='logo sentir creativo' />
              }
              onClick={() => goTo(`/about`)()}
            >
              SentirCreativo.com
            </Button>
          </Box>
          <Box width='30%' display='flex' height='100%'>
            <Button
              fullWidth
              key={'quienes somos'}
              classes={{ startIcon: classes.buttons }}
              style={{
                fontSize: 12,
                background: '#363636',
                color: 'white',
                ...buttonsStyle
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

function AreasButtons ({ areas, goTo, classes }) {
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
      ...buttonsStyle,
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
              classes={{ root: classes.buttons, startIcon: classes.buttons }}
              key={'sentir creativo'}
              onClick={() => goTo(`/`)()}
              style={{ background: '#ffec11', ...buttonsStyle }}
              startIcon={
                <img src={Logo} width={60} alt='logo sentir creativo' />
              }
            >
              Sentir CREATIVO .com
            </Button>

            <AreasButtons {...{ areas, goTo, classes }} />

            <Button
              fullWidth
              size='large'
              key={'quienes somos'}
              style={{
                background: '#ff6c00',
                color: 'white',
                ...buttonsStyle
              }}
              classes={{ startIcon: classes.buttons }}
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
