import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup({
  name,
  legend,
  options,
  values,
  handleChange,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup row>
          {options.map((option) => {
            const checked = (values[name] || []).some(
              (v) => +v === +option.value
            );
            return (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={name}
                    value={option.value}
                    onChange={handleChange}
                    checked={checked}
                  />
                }
                label={option.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
