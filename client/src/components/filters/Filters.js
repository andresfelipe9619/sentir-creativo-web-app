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
  const [value, setValue] = useState(null);

  const cardColor = color || theme.palette.primary.main;

  const handleDeleteFilter = () => () => {
    // handleChangeFilter({target:{name, value, checked:false}})
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
  console.log("data", data);
  console.log("value", value);
  console.log("filters", filters);
  const chips = filterOptions
    .map((fo) => {
      if (fo.name === "formato") {
        return (fo.options || []).filter((o) =>
          (filters.formats || []).includes(+o.value)
        );
      }
      if (fo.name === "tecnica_artisticas") {
        return (fo.options || []).filter((o) =>
          (filters.tecnics || []).includes(+o.value)
        );
      }
      return [];
    })
    .flatMap((f) => f);

  const options = value ? data.filter((o) => o.id === value.id) : data;
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
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
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
                  onDelete={handleDeleteFilter()}
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
  let formats = Object.entries(filters.formato || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key);
  let tecnics = Object.entries(filters.tecnica_artisticas || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key);

  return { formats, tecnics };
}

export default memo(Filters);
