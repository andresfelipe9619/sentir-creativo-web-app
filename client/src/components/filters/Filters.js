import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Accordion from "@material-ui/core/Accordion";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { CheckboxGroup } from "../radio";
import { useTheme } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyles from "./styles";

function Filters({
  children,
  color,
  data = [],
  filterOptions,
  // onSearchChange,
  onFilterChange,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = useState({});
  const [filters, setFilters] = useState({});
  const [autocompleteValue, setAutocompleteValue] = useState(null);

  const cardColor = color || theme.palette.primary.main;

  const handleDeleteFilter = (option) => () => {
    const { name, value } = option;
    const target = { name, value, checked: false };
    handleChangeFilter({ target });
  };

  const handleChangeFilter = (e) => {
    const { name, value, checked } = e.target;

    const newValues = {
      ...values,
      [name]: { ...values[name], [value]: checked },
    };
    setValues(newValues);
    const selectedFilters = getSelectedFilters(newValues);
    setFilters(selectedFilters);
    onFilterChange(selectedFilters);
  };

  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor },
    },
  });

  const chips = filterOptions
    .map((fo) => {
      const filterOptions = (name) =>
        (fo.options || [])
          .filter((o) => (filters[name] || []).includes(+o.value))
          .map((fo) => ({ ...fo, name }));
      return filterOptions(fo.name);
    })
    .flatMap((f) => f);

  const options = autocompleteValue
    ? data.filter((o) => o.id === autocompleteValue.id)
    : data;

  return (
    <ThemeProvider theme={areaTheme}>
      <AppBar
        position="relative"
        classes={{ root: classes.toolbar }}
        elevation={0}
      >
        <Toolbar>
          <Autocomplete
            size="small"
            id="combo-box-demo"
            options={options}
            value={autocompleteValue}
            onChange={(_, newValue) => {
              setAutocompleteValue(newValue);
            }}
            getOptionLabel={(option) => option.nombre}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <SearchIcon
                      style={{
                        color: cardColor,
                      }}
                    />
                  ),
                }}
              />
            )}
          />

          <Box className={classes.chips}>
            {(chips || []).map((option) => {
              console.log("option", option);
              return (
                <Chip
                  key={option.label}
                  label={option.label}
                  onDelete={handleDeleteFilter(option)}
                  style={{
                    backgroundColor: cardColor,
                    color: "white",
                  }}
                />
              );
            })}
          </Box>
        </Toolbar>
        <Toolbar
          style={{
            minHeight: 36,
            padding: 0,
            backgroundColor: cardColor,
          }}
        >
          <Grid item md={3}></Grid>
          <Grid
            item
            md={4}
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              backgroundColor: areaTheme.palette.primary.dark,
              width: "100%",
              padding: 4,
              height: "100%",
            }}
          >
            {(options || []).length} experiencias encontradas:
          </Grid>
          <Grid item md={5}></Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={3}>
          {filterOptions.map((fo, i) => (
            <FilterOption
              key={i}
              {...fo}
              handleChange={handleChangeFilter}
              values={values[fo.name] || {}}
            />
          ))}
        </Grid>
        <Grid item md={9} component={Box} px={1} bgcolor={"#212121"} pt={2}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const FilterOption = memo(function FilterOption({
  label,
  name,
  options,
  values,
  handleChange,
}) {
  return (
    <AccordionOption title={label}>
      <CheckboxGroup
        name={name}
        options={options}
        values={values}
        handleChange={handleChange}
      />
    </AccordionOption>
  );
});

const AccordionOption = memo(function AccordionOption({ title, children }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        className={classes.accordion}
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
});

function getSelectedFilters(filters) {
  let formatos = Object.entries(filters.formatos || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key);
  let tecnica_artisticas = Object.entries(filters.tecnica_artisticas || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key);

  return { formatos, tecnica_artisticas };
}

export default memo(Filters);
