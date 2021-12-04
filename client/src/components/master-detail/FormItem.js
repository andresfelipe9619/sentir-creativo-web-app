import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
// import MuiPhoneNumber from 'material-ui-phone-number'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Tags from '../tags/Tags'
import Files from '../files/Files'

export default function FormItem ({
  item,
  values,
  errors,
  touched,
  dependencies,
  isSubmitting,
  handleChange,
  handleBlur
}) {
  if (!item?.form) return null
  const {
    size,
    type,
    dependency,
    visibleWith,
    inputType = 'text',
    ...fieldProps
  } = item.form
  const key = item.name
  let value = values[key]
  const canRender = name => {
    if (!visibleWith) return type === name
    return type === name && values[visibleWith]
  }
  const options = (dependencies || {})[dependency] || []

  const content = {
    date: canRender('date') && (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          minDate={new Date()}
          format='dd/MM/yyyy'
          margin='normal'
          id={key}
          inputVariant='outlined'
          label={item.label}
          disabled={isSubmitting}
          onBlur={handleBlur}
          InputAdornmentProps={{ position: 'start' }}
          onChange={date => handleChange(date)}
          value={value || new Date()}
        />
      </MuiPickersUtilsProvider>
    ),
    autocomplete: canRender('autocomplete') && (
      <Autocomplete
        id={key}
        freeSolo
        options={options.map(option => option.label)}
        renderInput={params => (
          <TextField
            fullWidth
            label={item.label}
            disabled={isSubmitting}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            type={inputType}
            error={!!touched[key] && !!errors[key]}
            variant='outlined'
            helperText={!!touched[key] && errors[key] ? errors[key] : ''}
            {...params}
            {...fieldProps}
          />
        )}
      />
    ),
    input: canRender('input') && (
      <TextField
        fullWidth
        id={key}
        label={item.label}
        disabled={isSubmitting}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        type={inputType}
        error={!!touched[key] && !!errors[key]}
        variant='outlined'
        helperText={!!touched[key] && errors[key] ? errors[key] : ''}
        {...fieldProps}
      />
    ),
    // phone: canRender('phone') && (
    //   <MuiPhoneNumber
    //     defaultCountry={'us'}
    //     label={item.label}
    //     disabled={isSubmitting}
    //     onBlur={handleBlur}
    //     onChange={handleChange}
    //     value={value}
    //     helperText={errors[key] || ''}
    //     error={!!touched[key] && !!errors[key]}
    //     {...fieldProps}
    //   />
    // ),
    select: canRender('select') && (
      <FormControl fullWidth variant='outlined'>
        <InputLabel id={`${item.name}-label`}>{item.label}</InputLabel>
        <Select
          labelId={`${item.name}-label`}
          id={item.name}
          name={item.name}
          disabled={isSubmitting}
          value={value || ''}
          onChange={handleChange}
        >
          {options.map(d => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {!!touched[key] && errors[key] ? errors[key] : ''}
        </FormHelperText>
      </FormControl>
    ),
    tag: canRender('tag') && <Tags tags={value} title={item.label} />,
    file: canRender('file') && <Files files={value} title={item.label} />
  }
  return (
    <Grid item xs={12} md={size}>
      {content[type]}
    </Grid>
  )
}
