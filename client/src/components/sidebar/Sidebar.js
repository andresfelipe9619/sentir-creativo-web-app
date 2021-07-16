import React, { useState } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
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
import { useHistory, useLocation } from 'react-router-dom'
import { useStyles } from './styles'

export default function Sidebar ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const goTo = path => () => history.push(path)
  const isSelected = path => location.pathname === path

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Sentir Creativo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
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
                <Icon color='secondary' fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
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
