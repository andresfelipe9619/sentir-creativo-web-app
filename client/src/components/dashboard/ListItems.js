import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { DashboardRoutes } from "../../router/router.config";

export const MainListItems = ({ handleClick, color, dashboardItem }) => {
  const style = {
    color: "white",
    backgroundColor: color
  };
  return (
    <div>
      {DashboardRoutes.map(({ name, icon: Icon, path }, index) => {
        const selected = dashboardItem.path === path;
        return (
          <ListItem
            button
            key={index}
            onClick={handleClick(path)}
            style={selected ? style : {}}
          >
            <ListItemIcon>
              <Icon style={selected ? style : {}} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        );
      })}
    </div>
  );
};
