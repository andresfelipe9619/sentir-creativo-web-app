import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
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
import Spinner from "../spinner/Spinner";
import FilterListIcon from "@material-ui/icons/FilterList";
import Slide from "@material-ui/core/Slide";
import FilterPagination from "./FilterPagination";
import { pluralize } from "../../utils";

const PAGE_SIZE = 6;

function Filters({
  children,
  color,
  loading,
  searchOptions,
  maxCount = 6,
  filterOptions,
  onSearchChange,
  onFilterChange,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = useState({});
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleChangePage = (_, value) => {
    if (value === page) return;
    const newFilters = {
      ...filters,
      pagination: { page: value, size: PAGE_SIZE },
    };
    setPage(value);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFilter = () => setShowFilters((prev) => !prev);

  const count = autocompleteValue ? 1 : maxCount;
  const cardColor = color || theme.palette.primary.main;

  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor },
    },
  });

  const chips = filterOptions
    .map((fo) => {
      const setFilterOptions = (name) =>
        (fo.options || [])
          .filter((o) => (filters[name] || []).includes(+o.value))
          .map((fo) => ({ ...fo, name }));
      return setFilterOptions(fo.name);
    })
    .flatMap((f) => f);

  const pagination = (
    <FilterPagination
      {...{ loading, count, page, pageSize: PAGE_SIZE, handleChangePage }}
    />
  );

  return (
    <ThemeProvider theme={areaTheme}>
      <AppBar
        position="sticky"
        classes={{ root: classes.toolbar }}
        elevation={0}
      >
        <Toolbar>
          <Button
            color="primary"
            variant="outlined"
            onClick={toggleFilter}
            style={{ marginRight: 16 }}
            startIcon={<FilterListIcon />}
          >
            Filtros
          </Button>
          <Autocomplete
            size="small"
            id="combo-box-demo"
            options={searchOptions}
            value={autocompleteValue}
            onChange={(_, newValue) => {
              setAutocompleteValue(newValue);
              onSearchChange(newValue);
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
              return (
                <Chip
                  key={option.label}
                  label={option.label}
                  disabled={loading}
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
            backgroundColor: areaTheme.palette.primary.dark,
          }}
        >
          <Grid item md={3}></Grid>
          <Grid
            item
            md={4}
            component={Box}
            width="100%"
            height="100%"
            py={0.5}
            px={3}
            bgcolor={areaTheme.palette.primary.dark}
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
            }}
          >
            {loading
              ? `Búscando experiencias ...`
              : `${count} ${pluralize("experiencia", count)} ${pluralize(
                  "encontrada",
                  count
                )}: `}
          </Grid>
          <Grid item xs={12} md={5}>
            {!autocompleteValue && pagination}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Slide direction="right" in={showFilters} mountOnEnter unmountOnExit>
          <Grid item md={3}>
            {filterOptions.map((fo, i) => (
              <FilterOption
                key={i}
                {...fo}
                loading={loading}
                handleChange={handleChangeFilter}
                values={values[fo.name] || {}}
              />
            ))}
          </Grid>
        </Slide>
        <Grid
          item
          px={1.5}
          pt={2}
          md={showFilters ? 9 : 12}
          bgcolor={"#212121"}
          component={Box}
          minHeight={400}
        >
          {loading ? <Spinner mt={"10vh"} /> : children}
        </Grid>
        {pagination}
      </Grid>
    </ThemeProvider>
  );
}

const FilterOption = memo(function FilterOption({
  label,
  name,
  options,
  loading,
  values,
  handleChange,
}) {
  const hasOptions = (options || []).length;
  return (
    <AccordionOption title={label}>
      {loading && !hasOptions && <Spinner mt={0} />}
      {hasOptions && (
        <CheckboxGroup
          name={name}
          disabled={loading}
          options={options}
          values={values}
          handleChange={handleChange}
        />
      )}
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
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
});

function getSelectedFilters(filters) {
  const keys = Object.keys(filters);
  return keys.reduce((acc, key) => {
    let values = Object.entries(filters[key] || {})
      .filter(([, value]) => !!value)
      .map(([key]) => +key);

    return { ...acc, [key]: values };
  }, {});
}

export default memo(Filters);
