import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import esLocale from 'date-fns/locale/es'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import Tags from '../tags/Tags'
import Files from '../files/Files'
import MuiPhoneNumber from 'material-ui-phone-number'
import Bitacora from '../bitacora/Bitacora'
import Upload from '../files/Upload'
import { useTheme } from '@material-ui/core/styles'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles (name, options, theme) {
  return {
    fontWeight:
      (options || []).findIndex(o => o?.id === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export default function FormItem (props) {
  const {
    item,
    parent,
    values,
    errors,
    touched,
    setFieldValue,
    initParent,
    dependencies,
    isSubmitting,
    handleChange,
    handleBlur
  } = props
  const theme = useTheme()
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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <KeyboardDateTimePicker
          disableToolbar
          variant='inline'
          format='dd/MM/yyyy HH:mm'
          margin='normal'
          id={key}
          fullWidth
          style={{ margin: 0 }}
          inputVariant='outlined'
          label={item.label}
          disabled={isSubmitting}
          onBlur={handleBlur}
          InputAdornmentProps={{ position: 'start' }}
          onChange={date => {
            const event = { target: { name: key, value: date } }
            return handleChange(event)
          }}
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
    phone: canRender('phone') && (
      <MuiPhoneNumber
        id={key}
        name={key}
        defaultCountry={'cl'}
        label={item.label}
        variant='outlined'
        disabled={isSubmitting}
        onChange={v => setFieldValue(key, v.replace('+', ''))}
        value={value}
        fullWidth
        countryCodeEditable={false}
        autoFormat={false}
        helperText={errors[key] || ''}
        error={!!touched[key] && !!errors[key]}
      />
    ),
    select: canRender('select') && (
      <FormControl fullWidth variant='outlined'>
        <InputLabel id={`${key}-label`}>{item.label}</InputLabel>
        <Select
          labelId={`${key}-label`}
          id={key}
          name={key}
          disabled={isSubmitting}
          value={value || ''}
          onChange={handleChange}
        >
          {options.map((d, i) => (
            <MenuItem key={d.value + i} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {!!touched[key] && errors[key] ? errors[key] : ''}
        </FormHelperText>
      </FormControl>
    ),
    multiselect: canRender('multiselect') && (
      <FormControl fullWidth variant='outlined'>
        <InputLabel id={`${key}-label`}>{item.label}</InputLabel>
        <Select
          labelId={`${key}-label`}
          id={key}
          name={key}
          multiple
          disabled={isSubmitting}
          value={value || []}
          onChange={handleChange}
          input={
            <Input
              variant='outlined'
              disabled={isSubmitting}
              id={`select-multiple-${key}`}
              aria-label={item.label}
            />
          }
          renderValue={selected => {
            const items = selected.map(id => options.find(o => o.value === id))
            return (
              <div>
                {items.map((p, i) => (
                  <Chip key={p + i} label={p.label} disabled={isSubmitting} />
                ))}
              </div>
            )
          }}
          MenuProps={MenuProps}
        >
          {options.map(o => (
            <MenuItem
              key={o.value}
              value={o.value}
              style={getStyles(o.value, value, theme)}
            >
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    tag: canRender('tag') && <Tags tags={value} title={item.label} />,
    file: canRender('file') && (
      <Files files={value} title={item.label} {...{ parent, initParent }} />
    ),
    upload: canRender('upload') && <Upload {...props} item={item} />,
    bitacora: canRender('bitacora') && <Bitacora data={value} {...fieldProps} />
  }
  return (
    <Grid item xs={12} md={size}>
      {content[type]}
    </Grid>
  )
}
