import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1, 1, 2, 0),
  },
  controlLabel: {
    margin: theme.spacing(1),
  },
  label: {
    lineHeight: 1,
  },
}));

export default function RadioButtonsGroup({
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
        {legend && <FormLabel component="legend">{legend}</FormLabel>}
        <RadioGroup
          row
          name={name}
          value={+values[name]}
          onChange={handleChange}
        >
          {options.map((o) => {
            return (
              <FormControlLabel
                key={o.value}
                value={+o.value}
                control={<Radio />}
                label={o.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export function CheckboxGroup(props) {
  const { name, legend, options, values, handleChange, disabled } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {legend && <FormLabel component="legend">{legend}</FormLabel>}
        <FormGroup>
          {options.map((o) => {
            return (
              <FormControlLabel
                key={o.value}
                classes={{ root: classes.controlLabel, label: classes.label }}
                value={+o.value}
                control={
                  <Checkbox
                    color="primary"
                    size="small"
                    name={name}
                    disabled={disabled}
                    onChange={handleChange}
                    checked={!!values[o.value]}
                  />
                }
                label={o.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
