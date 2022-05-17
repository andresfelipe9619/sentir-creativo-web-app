import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { DashboardRoutes } from "../../router/router.config";

export const MainListItems = ({ handleClick }) => {
  return (
    <div>
      {DashboardRoutes.map(({ name, icon: Icon, path }, index) => (
        <ListItem button key={index} onClick={handleClick(path)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </div>
  );
};
