import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import PersonIcon from '@material-ui/icons/PersonOutlined'
import GamepadIcon from '@material-ui/icons/GamepadOutlined'
import WorkIcon from '@material-ui/icons/WorkOutlineOutlined'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import ListItem from '@material-ui/core/ListItem'
import { useHistory, useLocation } from 'react-router-dom'
import { useStyles } from './styles'

export default function Sidebar ({ children, toggleDarkMode }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const goTo = path => () => history.push(path)
  const isSelected = path => location.pathname === path

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>Sentir Creativo</div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, classes.drawerClose)}
        classes={{
          paper: classes.drawerClose,
          paperAnchorLeft: classes.paperAnchorLeft
        }}
      >
        <List>
          {options.map(({ name, path, icon: Icon }, index) => (
            <ListItem
              button
              key={name}
              onClick={goTo(path)}
              selected={isSelected(path)}
            >
              <ListItemIcon>
                <Icon color='secondary' fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
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
    icon: GamepadIcon
  },
  {
    path: '/contact',
    name: 'Contact',
    icon: EmailIcon
  }
]
