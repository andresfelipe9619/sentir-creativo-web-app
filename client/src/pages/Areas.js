import React, { memo, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import API from "../api";
import Card from "../components/card/ServiceCard";
import { useHistory, useLocation } from "react-router-dom";
import ServicioModal from "../components/modals/ServicioModal";
import DossierModal from "../components/modals/DossierModal";
import { useTheme, createTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Spinner from "../components/spinner/Spinner";
import { getAreaBackground, getQueryFilters } from "../utils";
import Filters, { getFilterOptions } from "../components/filters/Filters";
import { useAlertDispatch } from "../providers/context/Alert";
import useQuery from "../providers/hooks/useQuery";
import useFilterOptions from "../providers/hooks/useFilterOptions";
import { AreasMap } from "../providers/globals";
import { useFiltersState } from "../providers/context/Filters";

const SERVICE_OK = 12;
const PAGE_SIZE = 12;
const default_pagination = { pagination: { page: 1, pageSize: PAGE_SIZE } };

const defaultFilters = {
  formatos: {},
  ocasions: {},
  tecnica_artisticas: {},
  publico_objetivos: {},
};

function Areas() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showDossier, setShowDossier] = useState(false);
  const [serviceCount, setServiceCount] = useState(0);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingArea, setLoadingArea] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  const history = useHistory();
  const query = useQuery();
  const { breakpoints } = useTheme();
  const { showFilters } = useFiltersState();
  const isSmall = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles();
  const location = useLocation();
  const { openAlert } = useAlertDispatch();
  const { filterOptions, findUniqueOptions, setFilterOptions } =
    useFilterOptions({ initialValues: defaultFilters });

  const selectedId = query.get("service");
  const [areaName] = location.pathname.split("/").reverse();
  const areaId = AreasMap.get(areaName);

  function getServicesCount(filters = {}) {
    return API.Servicio.count({
      params: {
        area: areaId,
        "estado.id": SERVICE_OK,
        ...getQueryFilters(filters),
      },
    });
  }

  function getServices(filters = {}) {
    return API.Servicio.getAll({
      params: {
        area: areaId,
        "estado.id": SERVICE_OK,
        ...getQueryFilters(filters),
      },
    });
  }

  async function loadServices(serviceFilters = {}, refreshFilters = false) {
    try {
      let filters = { ...serviceFilters };
      setLoadingServices(true);

      if (!filters?.pagination && !refreshFilters) {
        await loadCount(filters);
        filters = { ...filters, ...default_pagination };
      }
      const serviceResult = await getServices(filters);
      setServices(serviceResult);

      if (!refreshFilters) return;
      Reflect.deleteProperty(filters, "pagination");
      await loadCount(filters);

      // Find unique options for the filters
      const options = findUniqueOptions(serviceResult, defaultFilters);
      setFilterOptions(options);
    } catch (error) {
      console.error(error);
      openAlert({ variant: "error", message: "Oops! Algo salió mal" });
    } finally {
      setLoadingServices(false);
    }
  }

  function cleanState() {
    setServiceCount(0);
    setFilterOptions(defaultFilters);
    setSearchOptions([]);
    setSearchValue(null);
  }

  async function loadArea() {
    try {
      setLoadingArea(true);
      cleanState();
      const areaResult = await API.Area.get(areaId);
      setSelectedArea(areaResult);
      setLoadingArea(false);
      loadServices(default_pagination, true);
      loadSearchOptions();
    } catch (error) {
      console.error(error);
      openAlert({ variant: "error", message: "Oops! Algo salió mal" });
      setLoadingArea(false);
    }
  }

  async function loadCount(filters) {
    const count = await getServicesCount(filters);
    setServiceCount(count);
  }

  async function loadSearchOptions() {
    const options = await getServices({ dense: true });
    setSearchOptions(options);
  }

  const handleOpenModal = (service) => () => {
    history.push({ search: `?service=${service.id}` });
  };

  const handleCloseModal = () => {
    history.push({ search: "" });
    setSelectedService(null);
  };

  const handleOpenDossier = (service) => () => {
    setSelectedService(service);
    setShowDossier(true);
  };

  const handleCloseDossier = () => {
    setShowDossier(false);
    setSelectedService(null);
  };

  useEffect(() => {
    loadServices(default_pagination, true);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadArea();
    //eslint-disable-next-line
  }, [areaId]);

  useEffect(() => {
    if (!services) return;

    if (!selectedService && selectedId) {
      let found = services.find((s) => +s.id === +selectedId);
      found && setSelectedService(found);
    }
  }, [services, selectedService, selectedId]);

  if (loadingArea) return <Spinner />;
  if (!selectedArea) return null;

  const color = selectedArea.colorPrimario;
  const areaTheme = createTheme({
    palette: {
      primary: { main: color },
    },
  });
  const servicesToShow = searchValue ? [searchValue] : services;
  const size = showFilters ? 4 : 3;

  return (
    <Grid
      pt={4}
      px={0}
      container
      justifyContent="center"
      component={Box}
      style={{
        background: getAreaBackground(selectedArea),
        color: "white",
      }}
    >
      {!!showDossier && (
        <DossierModal
          open
          handleClose={handleCloseDossier}
          service={selectedService}
        />
      )}
      {!!selectedId && (
        <ServicioModal
          open
          handleClose={handleCloseModal}
          service={selectedService}
        />
      )}
      <Grid
        item
        sm={12}
        md={6}
        lg={5}
        component={Box}
        pt={1}
        pb={4}
        textAlign="center"
      >
        <Typography
          variant="h1"
          align="center"
          component="strong"
          gutterBottom
          style={{
            color: "white",
            backgroundColor: areaTheme.palette.primary.dark,
            padding: "0 1.5rem",
            fontSize: isSmall ? 14 : 24,
          }}
        >
          {selectedArea.nombre.toUpperCase()}
        </Typography>
        <Typography
          paragraph
          gutterBottom
          align="center"
          className={classes.titleAccent}
        >
          {selectedArea.slogan.split(" ").map((x, i) => {
            const sloganStyle = {
              fontWeight: i === 0 ? "500" : "900",
              fontSize: isSmall ? 48 : i === 0 ? 64 : 72,
              lineHeight: 1.15,
              textShadow: "rgba(255 255 255 / 60%) -4px 4px 4px",
              fontStyle: "italic",
            };

            return (
              <Typography key={i} style={sloganStyle}>
                {x}
              </Typography>
            );
          })}
        </Typography>
        <Typography
          align="center"
          component="h6"
          style={{
            color: "white",
            backgroundColor: areaTheme.palette.primary.dark,
            lineHeight: 1.15,
            padding: "0.5rem",
            fontSize: isSmall ? 14 : 18,
          }}
        >
          {selectedArea.descripcion}
        </Typography>
      </Grid>
      <Filters
        color={color}
        data={servicesToShow}
        loading={loadingServices}
        maxCount={serviceCount}
        onSearchChange={setSearchValue}
        onFilterChange={loadServices}
        searchOptions={searchOptions}
        filterOptions={[
          {
            label: "Formatos",
            name: "formatos",
            options: getFilterOptions(filterOptions.formatos),
          },
          {
            label: "Técnicas Artísticas",
            name: "tecnica_artisticas",
            options: getFilterOptions(filterOptions.tecnica_artisticas),
          },
          {
            label: "Ocasiones",
            name: "ocasions",
            options: getFilterOptions(filterOptions.ocasions),
          },
          {
            label: "Públicos Objetivos",
            name: "publico_objetivos",
            options: getFilterOptions(filterOptions.publico_objetivos),
          },
        ]}
      >
        <Grid
          container
          component={Box}
          my={0}
          m={0}
          p={0}
          alignContent="center"
          alignItems="center"
          minHeight={400}
        >
          {servicesToShow.map((s) => (
            <Grid
              xs={12}
              sm={6}
              md={size}
              lg={size}
              xl={size}
              component={Box}
              m={0}
              p={0}
              item
              key={s.id}
            >
              <Card
                service={s}
                color={color}
                handleClickPrimary={handleOpenModal(s)}
                handleClickSecundary={handleOpenDossier(s)}
              />
            </Grid>
          ))}
        </Grid>
      </Filters>
    </Grid>
  );
}

export const useStyles = makeStyles((theme) => ({
  titleAccent: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "center",
    textShadow: "4px 4px 2px " + theme.palette.grey[600],
    fontSize: "48px",
    [theme.breakpoints.down("md")]: {
      fontSize: "38px",
    },
  },
  slogan: { fontSize: "24em" },
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default memo(Areas);
