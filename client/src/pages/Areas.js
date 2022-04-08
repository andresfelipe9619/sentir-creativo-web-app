import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import API from "../api";
import Card from "../components/card/ServiceCard";
import { useHistory, useParams } from "react-router-dom";
import ServicioModal from "../components/modals/ServicioModal";
import DossierModal from "../components/modals/DossierModal";
import { useTheme, createTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Spinner from "../components/spinner/Spinner";
import { getAreaBackground, getQueryFilters, map2select } from "../utils";
import Filters from "../components/filters/Filters";
import { useAlertDispatch } from "../providers/context/Alert";
import useQuery from "../providers/hooks/useQuery";

const SERVICE_OK = 12;
const PAGE_SIZE = 6;
const default_pagination = { pagination: { page: 1, pageSize: PAGE_SIZE } };

const defaultFilters = {
  formatos: {},
  ocasions: {},
  tecnica_artisticas: {},
  publico_objetivos: {},
};

export default function Areas() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showDossier, setShowDossier] = useState(false);
  const [serviceCount, setServiceCount] = useState(0);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingArea, setLoadingArea] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [filterOptions, setFilterOptions] = useState(defaultFilters);

  const history = useHistory();
  const query = useQuery();
  const { breakpoints } = useTheme();
  const isSmall = useMediaQuery(breakpoints.down("xs"));
  const isMedium = useMediaQuery(breakpoints.down("md"));
  const classes = useStyles();
  const { id: areaId } = useParams();
  const { openAlert } = useAlertDispatch();

  const selectedId = query.get("service");

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
      console.log("ah filters", filters);
      const serviceResult = await getServices(filters);
      setServices(serviceResult);

      if (!refreshFilters) return;
      Reflect.deleteProperty(filters, "pagination");
      await loadCount(filters);

      // Find unique options for the filters
      const options = serviceResult.reduce((acc, s) => {
        const keys = Object.keys(acc);
        const result = keys.reduce((accFilters, filterKey) => {
          let currentOptions = (s[filterKey] || [])
            .filter((t) => !acc[filterKey][t.id])
            .reduce(
              (accT, t) => ({ ...accT, [t.id]: t.nombre }),
              acc[filterKey]
            );

          return {
            ...accFilters,
            [filterKey]: currentOptions,
          };
        }, defaultFilters);

        return result;
      }, defaultFilters);

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

  const length = isSmall ? 1 : isMedium ? 2 : 3;
  if (loadingArea) return <Spinner />;
  if (!selectedArea) return null;

  const color = selectedArea.colorPrimario;
  const areaTheme = createTheme({
    palette: {
      primary: { main: color },
    }
  })
  const servicesToShow = searchValue ? [searchValue] : services;

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
        py={4}
        textAlign="center"
      >
        <Typography
          variant="h1"
          align="center"
          component="strong"
          gutterBottom
          style={{
            color: "white",
            backgroundColor: color,
            padding: "0 1.5rem",
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
              fontWeight: i === 0 ? "300" : "900",
              fontSize: 64,
              lineHeight: 1.15,
              textShadow: "rgba(255 255 255 / 60%) -4px 4px 4px",
            };

            return <Typography style={sloganStyle}>{x}</Typography>;
          })}
        </Typography>
        <Typography
          align="center"
          component="h6"
          style={{
            color: "white",
            backgroundColor: areaTheme.palette.primary.dark,
            lineHeight: 1.15,
            padding: '0.5rem',
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
              xs={12 / length}
              md={4}
              xl={3}
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

function getFilterOptions(filter) {
  return Object.entries(filter).map(map2select);
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
