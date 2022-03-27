import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import API from "../api";
import Card from "../components/card/ServiceCard";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ServicioModal from "../components/modals/ServicioModal";
import DossierModal from "../components/modals/DossierModal";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Spinner from "../components/spinner/Spinner";
import { getAreaBackground } from "../utils";
import Filters from "../components/filters/Filters";
import { useAlertDispatch } from "../providers/context/Alert";

const SERVICE_OK = 12;
const PAGE_SIZE = 6;
const default_pagination = { pagination: { page: 1, pageSize: PAGE_SIZE } };

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getPaginationData(pagination) {
  console.log("pagination", pagination);
  const { pageSize = 6, page = 1 } = pagination;
  const _limit = pageSize;
  const _start = (page - 1) * pageSize;
  return { _limit, _start };
}

function getQueryFilters(filters) {
  const entries = Object.entries(filters);
  console.log("entries", entries);
  if (!entries.length) return null;
  return entries.reduce((acc, [key, value]) => {
    if (key === "pagination") {
      return { ...acc, ...getPaginationData(value) };
    }
    if (Array.isArray(value) && value.length) {
      return { ...acc, [`${key}.id`]: value.join() };
    }
    return { ...acc, [key]: value };
  }, {});
}

const map2select = ([value, label]) => ({ label, value });

export default function Areas() {
  const [services, setServices] = useState([]);
  const [formats, setFormats] = useState({});
  const [tecnics, setTecnics] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showDossier, setShowDossier] = useState(false);
  const [serviceCount, setServiceCount] = useState(0);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingArea, setLoadingArea] = useState(false);

  const history = useHistory();
  const query = useQuery();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const { id: areaId } = useParams();
  const { openAlert } = useAlertDispatch();

  const selectedId = query.get("service");

  function getServicesCount(filters) {
    return API.Servicio.count({
      params: {
        area: areaId,
        "estado.id": SERVICE_OK,
        ...getQueryFilters(filters),
      },
    });
  }

  function getServices(filters) {
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
      // Find unique tecnica_artisticas and formatos for the filter's options
      const { formatos, tecnica_artisticas } = serviceResult.reduce(
        (acc, s) => {
          const mTecnics = s.tecnica_artisticas
            .filter((t) => !acc.tecnica_artisticas[t.id])
            .reduce(
              (accT, t) => ({ ...accT, [t.id]: t.nombre }),
              acc.tecnica_artisticas
            );

          const mFormats = s.formatos
            .filter((f) => !acc.formatos[f.id])
            .reduce((accF, f) => ({ ...accF, [f.id]: f.nombre }), acc.formatos);

          return {
            formatos: mFormats,
            tecnica_artisticas: mTecnics,
          };
        },
        {
          formatos: {},
          tecnica_artisticas: {},
        }
      );
      setFormats(formatos);
      setTecnics(tecnica_artisticas);
    } catch (error) {
      console.error(error);
      openAlert({ variant: "error", message: "Oops! Algo salió mal" });
    } finally {
      setLoadingServices(false);
    }
  }

  async function loadArea() {
    try {
      setLoadingArea(true);
      setServiceCount(0);
      setFormats([]);
      setTecnics([]);
      const areaResult = await API.Area.get(areaId);
      setSelectedArea(areaResult);
      setLoadingArea(false);
      loadServices(default_pagination, true);
    } catch (error) {
      console.error(error);
      setLoadingArea(false);
    }
  }

  async function loadCount(filters) {
    const count = await getServicesCount(filters);
    setServiceCount(count);
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
      <Grid item sm={12} md={6} component={Box} py={4}>
        <Typography
          variant="h1"
          align="center"
          paragraph
          gutterBottom
          style={{ color: "white", backgroundColor: color }}
        >
          {selectedArea?.nombre}
        </Typography>
        <Typography
          paragraph
          gutterBottom
          align="center"
          className={classes.titleAccent}
        >
          {selectedArea?.slogan}
        </Typography>
      </Grid>
      <Filters
        color={color}
        data={services}
        loading={loadingServices}
        maxCount={serviceCount}
        onFilterChange={loadServices}
        filterOptions={[
          {
            label: "Formatos",
            name: "formatos",
            options: Object.entries(formats).map(map2select),
          },
          {
            label: "Técnicas Artísticas",
            name: "tecnica_artisticas",
            options: Object.entries(tecnics).map(map2select),
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
          {services.map((s) => (
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
