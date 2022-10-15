import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import { FormControlLabel, Switch } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';
import MuiPhoneNumber from 'material-ui-phone-number';
import PropTypes from 'prop-types';
import React from 'react';

import Bitacora from '../bitacora/Bitacora';
import CitySelect from '../city-select/CitySelect';
import Comments from '../commets';
import Files from '../files/Files';
import Upload from '../files/Upload';
import Tags from '../tags/Tags';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, options, theme) {
  return {
    fontWeight:
      (options || []).findIndex((o) => o?.id === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormItem(props) {
  const {
    item,
    parent,
    values,
    errors,
    touched,
    setFieldValue,
    initialValues,
    initParent,
    dependencies,
    isSubmitting,
    handleChange,
    handleBlur,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  if (!item?.form) return null;
  const {
    size,
    type,
    dependency,
    visibleWith,
    inputType = "text",
    ...fieldProps
  } = item.form;
  const key = item.name;
  const value = values[key];
  const canRender = (name) => {
    const isSameType = type === name;
    if (!visibleWith) return isSameType;
    return isSameType && !!values[visibleWith];
  };
  const options = (dependencies || {})[dependency] || [];

  const content = {
    date: canRender("date") && (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} key={key}>
        <KeyboardDateTimePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy hh:mm a"
          ampm={false}
          margin="normal"
          id={key}
          fullWidth
          style={{ margin: 0 }}
          inputVariant="outlined"
          label={item.label}
          disabled={isSubmitting}
          onBlur={handleBlur}
          InputAdornmentProps={{ position: "start" }}
          onChange={(date) => {
            const event = { target: { name: key, value: date } };
            return handleChange(event);
          }}
          value={value || new Date()}
          {...fieldProps}
        />
      </MuiPickersUtilsProvider>
    ),
    autocomplete: canRender("autocomplete") && (
      <Autocomplete
        id={key}
        key={key}
        freeSolo
        options={options.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            fullWidth
            key={key}
            label={item.label}
            disabled={isSubmitting}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            type={inputType}
            error={!!touched[key] && !!errors[key]}
            variant="outlined"
            helperText={!!touched[key] && errors[key] ? errors[key] : ""}
            {...params}
            {...fieldProps}
          />
        )}
      />
    ),
    boolean: canRender("boolean") && (
      <FormControlLabel
        id={key}
        disabled={isSubmitting}
        control={
          <Switch
            checked={!!value}
            onChange={handleChange}
            name={key}
            color="primary"
          />
        }
        label={item.label}
      />
    ),
    input: canRender("input") && (
      <TextField
        fullWidth
        id={key}
        label={item.label}
        disabled={isSubmitting}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value || ""}
        type={inputType}
        error={!!touched[key] && !!errors[key]}
        variant="outlined"
        helperText={!!touched[key] && errors[key] ? errors[key] : ""}
        {...fieldProps}
      />
    ),
    phone: canRender("phone") && (
      <MuiPhoneNumber
        id={key}
        name={key}
        defaultCountry={"cl"}
        label={item.label}
        variant="outlined"
        disabled={isSubmitting}
        onChange={(v) => setFieldValue(key, v.replace("+", ""))}
        value={value || ""}
        fullWidth
        countryCodeEditable={false}
        autoFormat={false}
        helperText={errors[key] || ""}
        error={!!touched[key] && !!errors[key]}
      />
    ),
    select: canRender("select") && (
      <Autocomplete
        disablePortal
        id={key}
        key={key}
        options={options.map((option) => option.value)}
        onChange={handleChange}
        value={value}
        getOptionLabel={(option) => options.find(x => x.value === option).label}
        renderInput={(params) => (
          <TextField
            fullWidth
            key={key}
            label={item.label}
            disabled={isSubmitting}
            onBlur={handleBlur}
            error={!!touched[key] && !!errors[key]}
            variant="outlined"
            helperText={!!touched[key] && errors[key] ? errors[key] : ""}
            {...params}
            {...fieldProps}
          />
        )}
      />
    ),
    multiselect: canRender("multiselect") && (
      <FormControl fullWidth variant="outlined" required={fieldProps.required}>
        <InputLabel id={`${key}-label`}>{item.label}</InputLabel>
        <Select
          label={item.label}
          labelId={`${key}-label`}
          id={key}
          name={key}
          multiple
          disabled={isSubmitting}
          value={value || []}
          onChange={handleChange}
          renderValue={(selected) => {
            const items = selected.map((id) =>
              options.find((o) => o.value === id)
            );
            return (
              <div className={classes.chips}>
                {items.map((p, i) => (
                  <Chip
                    key={p + i}
                    label={p?.label}
                    disabled={isSubmitting}
                    className={classes.chip}
                  />
                ))}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          {options.map((o, i) => (
            <MenuItem
              key={i}
              value={o.value}
              style={getStyles(o.value, value, theme)}
            >
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    tag: canRender("tag") && <Tags tags={value} title={item.label} />,
    file: canRender("file") && (
      <Files
        files={value}
        title={item.label}
        {...{ parent, initParent, values, initialValues }}
      />
    ),
    upload: canRender("upload") && <Upload {...props} item={item} />,
    bitacora: canRender("bitacora") && (
      <Bitacora data={value} {...fieldProps} {...{ parent, initParent }} />
    ),
    city: canRender("city") && <CitySelect {...props} item={item} />,
    comments: canRender("comments") && (
      <Comments data={value} {...fieldProps} {...{ parent, initParent }} />
    ),
  };
  return (
    <Grid item xs={12} md={size}>
      {content[type]}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

FormItem.propTypes = {
  name: PropTypes.string,
  parent: PropTypes.string,
  isSubmitting: PropTypes.bool,
  item: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  dependencies: PropTypes.object,
  initParent: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};
