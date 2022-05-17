import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArchiveIcon from "@material-ui/icons/Archive";
import LabelIcon from "@material-ui/icons/Label";
import BusinessIcon from "@material-ui/icons/Business";
import HailIcon from '@mui/icons-material/Hail';
import WorkIcon from '@mui/icons-material/Work';
import SurfingIcon from '@mui/icons-material/Surfing';
import BoltIcon from '@mui/icons-material/Bolt';

const items = [
  { path: "/admin/audiencia", label: "Audiencia", icon: HailIcon },
  {
    path: "/admin/organizaciones",
    label: "Organizaciones",
    icon: BusinessIcon,
  },
  { path: "/admin/servicios", label: "Servicios", icon: ShoppingCartIcon },
  { path: "/admin/proyectos", label: "Proyectos", icon: WorkIcon },
  { path: "/admin/archivos", label: "Archivos", icon: ArchiveIcon },
  { path: "/admin/tags", label: "Tags", icon: LabelIcon },
  { path: "/admin/staff", label: "Staff", icon: SurfingIcon },
  { path: "/admin/colecciones", label: "Colecciones", icon: LabelIcon },
  { path: "/admin/reportes", label: "Reportes", icon: BarChartIcon },
  { path: "/admin/tareas", label: "Tareas", icon: BoltIcon }
];
const secondaryItems = [
  { label: "Current month", icon: AssignmentIcon },
  { label: "Last quarter", icon: AssignmentIcon },
  { label: "Year-end sale", icon: AssignmentIcon },
];

export const MainListItems = ({ handleClick }) => {
  return (
    <div>
      {items.map(({ label, icon: Icon, path }, index) => (
        <ListItem button key={index} onClick={handleClick(path)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </div>
  );
};

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
);
