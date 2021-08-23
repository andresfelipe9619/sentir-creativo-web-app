import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { useHistory } from 'react-router-dom'

const items = [
  { path: '/admin/audiencia', label: 'Audiencia', icon: PeopleIcon },
  { path: '/admin/servicios', label: 'Servicios', icon: ShoppingCartIcon },
  { path: '/admin/proyectos', label: 'Proyectos', icon: LayersIcon },
  { path: '/admin/reportes', label: 'Reportes', icon: BarChartIcon }
]
const secondaryItems = [
  { label: 'Current month', icon: AssignmentIcon },
  { label: 'Last quarter', icon: AssignmentIcon },
  { label: 'Year-end sale', icon: AssignmentIcon }
]

export const MainListItems = () => {
  const history = useHistory()
  return (
    <div>
      {items.map(({ label, icon: Icon, path }, index) => (
        <ListItem button key={index} onClick={() => history.push(path)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </div>
  )
}

export const SecondaryListItems = () => (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    {secondaryItems.map(({ label, icon: Icon }, index) => (
      <ListItem button key={index}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    ))}
  </div>
)
