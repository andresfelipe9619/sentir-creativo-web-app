import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import PersonIcon from '@material-ui/icons/PersonOutlined'
import BookIcon from '@material-ui/icons/Book'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useHistory, useLocation } from 'react-router-dom'
import API from '../../api'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function Sidebar ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [areas, setAreas] = useState([])
  const [value, setValue] = React.useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const goTo = path => () => history.push(path)
  const isSelected = path => location.pathname === path
  useEffect(() => {
    ;(async () => {
      const result = await API.Area.getAll()
      setAreas(result)
    })()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='primary'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Box width='100%' display='flex' justifyContent='center'>
            <BottomNavigation
              value={value}
              onChange={(_, newValue) => {
                let id = areas[newValue].id
                setValue(newValue)
                goTo(`/areas/${id}`)()
              }}
              showLabels={!isMobile}
              className={classes.root}
            >
              {areas.map(area => (
                <BottomNavigationAction
                  key={area.nombre}
                  style={{
                    background: area.colorPrimario,
                    color: 'white',
                    flex: 1,
                    fontSize: 10
                  }}
                  label={area.nombre}
                  icon={<Icon fontSize='small'>star</Icon>}
                />
              ))}
            </BottomNavigation>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {options.map(({ name, path, icon: Icon }, index) => (
            <ListItem
              button
              key={name}
              onClick={goTo(path)}
              selected={isSelected(path)}
            >
              <ListItemIcon>
                <Icon color='primary' fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}

const options = [
  {
    path: '/',
    name: 'Home',
    icon: HomeIcon
  },
  {
    path: '/about',
    name: 'About',
    icon: PersonIcon
  },
  {
    path: '/blog',
    name: 'Blog',
    icon: BookIcon
  },
  {
    path: '/contact',
    name: 'Contact',
    icon: EmailIcon
  }
]
