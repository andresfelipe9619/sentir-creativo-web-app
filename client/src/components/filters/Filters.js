import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyles from "./styles";
import Spinner from "../spinner/Spinner";
import FilterListIcon from "@material-ui/icons/FilterList";
import Slide from "@material-ui/core/Slide";
import FilterPagination from "./FilterPagination";
import { map2select, pluralize } from "../../utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FilterOption from "./FilterOption";
import { useFilters } from "../../providers/context/Filters";

const PAGE_SIZE = 12;

function Filters({
  children,
  color,
  loading,
  searchOptions = [],
  maxCount = 6,
  filterOptions = [],
  onSearchChange,
  onFilterChange,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = useState({});
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [{ showFilters }, { toggleFilters }] = useFilters();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

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
    onFilterChange && onFilterChange(selectedFilters);
  };

  const handleChangePage = (_, value) => {
    if (value === page) return;
    const newFilters = {
      ...filters,
      pagination: { page: value, size: PAGE_SIZE },
    };
    setPage(value);
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleClickFilters = () => {
    if (!showFilters) window.scrollTo(0, 275);
    toggleFilters(!showFilters);
  };

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
        (fo?.options || [])
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
            onClick={handleClickFilters}
            style={{ marginRight: 16 }}
            startIcon={<FilterListIcon />}
            classes={{
              startIcon: classes.startIconMobile,
            }}
          >
            {!isSmall && "Filtros"}
          </Button>
          <Autocomplete
            size="small"
            id="combo-box-demo"
            options={searchOptions || []}
            value={autocompleteValue}
            onChange={(_, newValue) => {
              setAutocompleteValue(newValue);
              onSearchChange && onSearchChange(newValue);
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
              ? `Buscando experiencias ...`
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
        <Slide
          appear
          in={showFilters}
          direction="right"
          mountOnEnter
          unmountOnExit
        >
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

export function getFilterOptions(filter) {
  return Object.entries(filter || {}).map(map2select);
}

export function getSelectedFilters(filters) {
  const keys = Object.keys(filters);
  return keys.reduce((acc, key) => {
    let values = Object.entries(filters[key] || {})
      .filter(([, value]) => !!value)
      .map(([key]) => key);

    return { ...acc, [key]: values };
  }, {});
}

export default memo(Filters);
