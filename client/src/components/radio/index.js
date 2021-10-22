import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

export default function RadioButtonsGroup ({
  name,
  legend,
  options,
  values,
  handleChange
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>{legend}</FormLabel>
        <RadioGroup
          row
          name={name}
          value={+values[name]}
          onChange={handleChange}
        >
          {options.map(o => {
            return (
              <FormControlLabel
                key={o.value}
                value={+o.value}
                control={<Radio />}
                label={o.label}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </div>
  )
}
