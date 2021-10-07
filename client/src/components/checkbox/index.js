import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

export default function CheckboxesGroup ({ legend, options }) {
  const classes = useStyles()
  const [state, setState] = useState({})

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    let result = options.reduce((acc, o) => ({ ...acc, [o.name]: false }), {})
    setState(result)
  }, [options])

  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>{legend}</FormLabel>
        <FormGroup row>
          {options.map(option => (
            <FormControlLabel
              control={
                <Checkbox
                  name={option.value}
                  onChange={handleChange}
                  checked={state[option.value]}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  )
}
