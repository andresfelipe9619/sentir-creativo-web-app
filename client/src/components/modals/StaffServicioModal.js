import { useState, useEffect } from "react";
import GenericModal from "./GenericModal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Spinner from "../spinner/Spinner";
import { Formik } from "formik";
import { useAlertDispatch } from "../../providers/context/Alert";
import { artist2Schema, artist2Values } from "./schema";
import FormItem from "../master-detail/FormItem";
import API from '../../api';
import * as IO5 from "react-icons/io5";
import * as GI from "react-icons/gi";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import { createTheme, useTheme } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import green from '@material-ui/core/colors/green';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import ServiceCard from "../card/ServiceCard";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useFormDependencies from "../../providers/hooks/useFormDependencies";
import { uploadFileToS3 } from '../../utils/aws';

const fieldsByStep = [
  ['id', 'email', 'nombreCoupon'],
  ['area'],
  ['servicioNombre', 'slogan', 'sintesis', 'trayectoria', 'formato'],
  ['tecnicasArtisticas.3', 'tags.5', 'cantidadArtistas', 'cantidadArtistasApoyo'],
  ['duracionMinima', 'duracionMaxima', 'sesionesMinimo', 'sesionesMaximas', 'duracionMontaje', 'duracionDesmontaje'],
  ['publicoObjetivo.3', 'minimoParticipantes', 'maximoParticipantes', 'ocasiones.3'],
  ['masFavorable', 'medianas', 'menosFavorable'],
  ['archivos', 'accept1'],
  ['accept2', 'accept3', 'accept4']
];

const useStyles = makeStyles((theme) => ({
  buttonColorful: {
    position: "relative",
    whiteSpace: "nowrap",
    borderRadius: "50px",
    padding: theme.spacing(1.5, 3),
    textTransform: "none",
    marginBottom: theme.spacing(4),
    color: "#fff",
    fontSize: "1.25rem",
    backgroundSize: "1rem 1rem",
    backgroundImage:
      "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
    "&:before": {
      content: "",
      position: "absolute",
      width: "calc(100% - 0.5rem)",
      height: "calc(100% - 0.5rem)",
      border: "1px solid #ffffff9c",
      "border-radius": "50px",
    },
  }
}));

const artistExperienceColumns = [
  {
    name: "id",
    label: "Id Staff",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 2,
      required: true,
      type: "input",
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      required: true,
      type: "input",
    },
  },
  {
    name: "nombreCoupon",
    label: "Código",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 2,
      required: true,
      type: "input",
    },
  }
];

const serviceIdentificationColumns = [
  {
    name: "servicioNombre",
    label: "Nombre de experiencia",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      required: true,
      type: "input",
    },
  },
  {
    name: "slogan",
    label: "Slogan",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      required: true,
      type: "input",
    },
  },
  {
    name: "sintesis",
    label: "Sintesis",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 12,
      required: true,
      type: "input",
      multiline: true
    },
  },
  {
    name: "trayectoria",
    label: "Trayectoria",
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: "select",
      required: true,
      dependency: 'Trayectoria'
    },
  },
  {
    name: "formato",
    label: "Formato(s) disponible(s)",
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'Formato'
    },
  },
];

const artistsTechColumns = [
  {
    name: "tecnicasArtisticas",
    label: "Técnica(s) artística(s) presentes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'TecnicaArtistica'
    },
  },
  {
    name: "tags",
    label: "Tags o palabras claves",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'Tag'
    },
  },
  {
    name: "cantidadArtistas",
    label: "Cantidad de Artistas en ejecución",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      required: true
    },
  },
  {
    name: "cantidadArtistasApoyo",
    label: "Cantidad de Artistas de apoyo",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      required: true
    },
  }
];

const artistsTech2Columns = [
  {
    name: "duracionMinima",
    label: "Duración mínima (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "duracionMaxima",
    label: "Duración máxima (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "sesionesMinimo",
    label: "Sesiones mínima (cantidad)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input"
    },
  },
  {
    name: "sesionesMaximas",
    label: "Sesiones máxima (cantidad)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input"
    },
  },
  {
    name: "duracionMontaje",
    label: "Duración en montaje (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "duracionDesmontaje",
    label: "Duración en desmontaje (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  }
];

const beneficiariosColumns = [
  {
    name: "publicoObjetivo",
    label: "Público Objetivo",
    options: {
      filter: false,
      sort: false
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "PublicoObjetivo"
    },
  },
  {
    name: "minimoParticipantes",
    label: "Cantidad mínima de participantes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      multiline: true
    },
  },
  {
    name: "maximoParticipantes",
    label: "Cantidad máxima de participantes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      multiline: true
    },
  },
  {
    name: "ocasiones",
    label: "¿En qué ocasiones?",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Ocasion"
    },
  }
];

const storagesDeeps = {};

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <ArtistExperience {...props} />;
    case 1:
      return <ActionAreas {...props} />;
    case 2:
      return <ServiceIdentification {...props} />;
    case 3:
      return <ArtistTech {...props} />;
    case 4:
      return <ArtistTech2 {...props} />;
    case 5:
      return <Beneficiarios {...props} />;
    case 6:
      return <Finanzas {...props} />;
    case 7:
      return <Archivos {...props} />;
    case 8:
      return <VistaPrevia {...props} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function StaffServicioModal({ handleClose, open }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    '¡Sube tu experiencia artística!',
    'La experiencia artística corresponde a:',
    'Identificación del servicio',
    'Ficha artística',
    'Ficha técnica',
    'Beneficiarios',
    'Finanzas',
    'Archivos',
    'Vista previa'
  ];
  const { openAlert } = useAlertDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFormSubmit = async (value) => {
    if (!lastStep) {
      handleNext();
      return;
    }

    try {
      const values = Object.assign({}, value);
      console.log('VALUES ->', values);

      const service = await API.Servicio.upload(values);
      const parent = 'servicio';
      const parentId = service.id;

      const comentarios = [
        `Condiciones más favorables: $${values.masFavorable || 0}`,
        `Condiciones Medianas: $${values.medianas || 0}`,
        `Condiciones menos favorables: $${values.menosFavorable || 0}`
      ];
      const comentariosCreados = await Promise.all(comentarios.map(async x => await API.Comentarios.create({
        comentario: x
      })));

      await API.Servicio.update(parentId, {
        ...service,
        comentarios: comentariosCreados
      });

      const paths = await Promise.all(values.archivos?.map(async ({ file, tipo }) => {
        return uploadFileToS3({
          name: (tipo === 28 ? 'Portada_' : 'Detalle_') + Date.now().toString(16),
          file,
          parent,
          parentId
        });
      }));

      const creations = await Promise.all(values.archivos?.map(async ({ tipo }, i) => {
        const path = paths[i].Location;
        return await API.Archivo.create({
          path,
          nombre: (tipo === 28 ? 'Portada_' : 'Detalle_') + Date.now().toString(16),
          tipo_archivo: tipo,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        });
      }));

      await API.Archivo.addFiles2Entity(parentId, parent, creations.map(x => x.id));

      openAlert({ variant: "success", message: "Servicio creado con éxito" });
      handleNext();
    } catch (error) {
      console.error(error);
      openAlert({
        variant: "error",
        message:
          error?.message || "Algo salió mal. Vuelve a intentarlo más tarde",
      });
    }
  };

  const handleNext = (props) => {
    if (activeStep === 0) {
      const params = {
        id: props.values.id,
        email: props.values.email,
        'cuponDescuento.codigo': props.values.nombreCoupon
      };
      API.Staf.getAll({ params })
        .then((stafs) => {
          if (!stafs?.length) {
            return Promise.reject();
          }

          setActiveStep((prevActiveStep) => ++prevActiveStep);
        })
        .catch(() => openAlert({
          variant: "error",
          message: "No existe el staf id proporcionado",
        }))
      return;
    }

    setActiveStep((prevActiveStep) => ++prevActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => --prevActiveStep);
  };

  const lastStep = activeStep === steps.length - 1;
  const sent = activeStep === steps.length;

  return (
    <>
      <GenericModal
        open={open}
        hideConfirmButton
        hideCloseButton={sent}
        title="Únete a la red"
        handleClose={handleClose}
        backgroundColor="#ffeb12"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={artist2Values}
          validationSchema={artist2Schema}
        >
          {({ handleSubmit, ...formikProps }) => {
            const disableButton =
              formikProps.isSubmitting ||
              (!sent &&
                fieldsByStep[activeStep].some((field) => {
                  const [fieldName, min] = field.split('.');
                  const value = formikProps.values[fieldName];
                  const hasError =
                    !!formikProps.touched[field] && !!formikProps.errors[field];
                  const isEmpty = Array.isArray(value) ? !value.length : !value;

                  if (min) {
                    return value?.length < parseInt(min);
                  }

                  const disabled = isEmpty || hasError;
                  return disabled;
                }));

            return (
              <form onSubmit={handleSubmit}>
                {!isSmall && (
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{''}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                <div>
                  {sent ? (
                    <FinishForm handleCloseModal={handleClose}
                      handleReset={() => {
                        formikProps.resetForm();
                        setActiveStep(0);
                      }} />
                  ) : (
                    <div>
                      <div className={classes.instructions}>
                        {getStepContent(activeStep, { ...formikProps })}
                      </div>
                      <div style={{ marginTop: 24 }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Atrás
                        </Button>
                        {lastStep ? (
                          <Button
                            type="submit"
                            disabled={disableButton}
                            variant="contained"
                            color="primary"
                          >
                            Enviar
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={disableButton}
                            onClick={() => handleNext({ ...formikProps })}
                          >
                            Siguiente
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </GenericModal>
    </>
  );
}

function FinishForm({ handleCloseModal, handleReset }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Lo lograste!
        </Typography>

        <Typography gutterBottom style={{ fontWeight: 700 }}>
          ¡Felicitaciones! Ya has subido una experiencia artística.
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          <strong>nombreStaff</strong> gracias por confiar en nuestra propuesta.
          La siguiente etapa es una revisión final, ajustes fotográficos y la creación del dossier.
          Estamos muy cerca de <strong>conectarte con oportunidades laborales.</strong>
        </Typography>

        <Typography gutterBottom style={{ fontWeight: 700 }}>
          ¡Se paciente, nos comunicaremos a la brevedad!
        </Typography>
      </Grid>

      <Grid item md={12}>
        <img
          width="100%"
          src="https://live.staticflickr.com/7132/26854237651_480cff5e7b_k.jpg"
          alt="portada"
        />
      </Grid>

      <Grid item md={12} style={{ marginLeft: "auto", textAlign: "right" }}>
        <Button
          color="primary"
          variant="text"
          style={{ margin: 14 }}
          onClick={handleReset}
        >
          Subir otro servicio
        </Button>

        <Button
          color="primary"
          variant="contained"
          style={{ margin: 14 }}
          onClick={handleCloseModal}
        >
          Ir a ver catálogo
        </Button>
      </Grid>
    </Grid>
  );
}

function ArtistExperience(props) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Sube tu experiencia artística!
        </Typography>

        <Typography gutterBottom>
          Rellena este formulario por cada experiencia y recibe oportunidades laborales.
          Recuerda tener a disposición fotografías en la mejor calidad posible.
        </Typography>
      </Grid>

      {artistExperienceColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} />
      ))}

      <Grid item md={12}>
        <Typography gutterBottom>
          Ésta convocatoria estará disponible hasta el 30 de Junio 2022
        </Typography>
      </Grid>
    </Grid>
  );
}

function ActionAreas(props) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(props.values?.area || null);

  const tecnicas = {
    "Creaciones Cuánticas": ['Espectáculo', 'Obra de Teatro', 'Show escénico'],
    "Felicidad Organizacional": ['Autocuidado', 'Pausa activa', 'Terapias'],
    "Universidad Creativa": ['Taller artístico', 'Taller de oficio', 'Charlas y Seminarios'],
    "Galaxia Musical": ['Mi propuesta musical', 'Banda musical', 'Orquestas']
  };

  const onSelectArea = area => {
    setSelectedArea(area);
    const event = { target: { name: 'area', value: area } };
    props.handleChange(event);
  }

  useEffect(() => {
    (async () => {
      try {
        let result = await API.Area.getAll();
        result = await Promise.all(
          result.map(async (area) => {
            let icono = null;

            if (/\//.test(area.icono)) {
              let [prefix, name] = area.icono.split("/");

              if (prefix === "gi") icono = GI[name];
              if (prefix === "io5") icono = IO5[name];
            }

            const serviceResult = await API.Servicio.getAll({
              params: { area: area.id, "estado.id": 12 },
            });

            const tecnicas = new Set(
              serviceResult
                ?.reduce(
                  (acc, curr) => [...acc, ...curr.tecnica_artisticas],
                  []
                )
                ?.map((x) => x.nombre)
            );

            return {
              ...area,
              tecnicas,
              icon: icono,
            };
          })
        );
        setAreas(result);
        storagesDeeps['Area'] = result;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          La experiencia artística corresponde a:
        </Typography>

        <Typography gutterBottom>
          Elige una área, según el servicio que deseas subir al catálogo:
        </Typography>
      </Grid>

      {areas.map(x => {
        const areaTheme = createTheme({
          palette: {
            primary: { main: x.colorPrimario },
          },
        });

        const CheckIcon = selectedArea?.id === x.id ? CheckCircleIcon : CheckCircleOutlineIcon;
        const active = selectedArea?.id === x.id;

        return (
          <Grid item xs={8} md={3} key={x.id}>
            <Card>
              <CardActionArea onClick={() => onSelectArea(x)}>
                <CardContent style={{ backgroundColor: areaTheme.palette.primary.dark }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box style={{ flexBasis: '80%' }}>
                      <Typography style={{ color: '#fff', lineHeight: 1, fontWeight: 700 }}>
                        Quiero subir:
                      </Typography>

                      {tecnicas[x.nombre].map(tecnica => (
                        <Typography
                          key={tecnica}
                          style={{
                            color: '#fff',
                            lineHeight: 1
                          }}>
                          {tecnica}
                        </Typography>
                      ))}
                    </Box>

                    <CheckIcon style={{ color: active ? green[500] : '#fff' }} />
                  </Box>
                </CardContent>
                <CardContent style={{ backgroundColor: areaTheme.palette.primary.main }}>
                  {x.icon && <x.icon size={"2rem"} style={{ color: '#fff' }} />}

                  {x.nombre.split(/\s/).map((text, i) => (
                    <Typography
                      key={i}
                      style={{
                        color: '#fff',
                        lineHeight: 1,
                        fontSize: i > 0 ? 22 : 18,
                        marginTop: i === 0 ? 8 : 0
                      }}>
                      <strong>{text}</strong>
                    </Typography>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

function ServiceIdentification(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(serviceIdentificationColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  Object.keys(dependencies || {}).forEach(key => storagesDeeps[key] = dependencies[key]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Identificación del servicio
        </Typography>
      </Grid>

      {serviceIdentificationColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={dependencies} />
      ))}
    </Grid>
  );
}

function ArtistTech(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(artistsTechColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  Object.keys(dependencies || {}).forEach(key => storagesDeeps[key] = dependencies[key]);

  const labels = [
    'Seleccionar mínimo 3',
    'Seleccionar mínimo 5',
    '¿Cuántas personas desarrollarán la experiencia?',
    '¿Cuántas personas se necesitan de apoyo para desarrollar la experiencia? (Técnicos, etc.)'
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Ficha artística
        </Typography>
      </Grid>

      {artistsTechColumns.map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom>{labels[i]}</Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function ArtistTech2(props) {
  const oneHour = 1000 * 60 * 60;

  const horarios = [
    { label: "30 minutos", value: oneHour / 2 },
    { label: "1 hora", value: oneHour },
    { label: "1 hora y 30 minutos", value: oneHour + oneHour / 2 },
    { label: "2 horas", value: oneHour * 2 },
    { label: "3 horas", value: oneHour * 3 },
    { label: "4 horas", value: oneHour * 4 },
    { label: "5 horas", value: oneHour * 5 },
    { label: "Más tiempo", value: oneHour * 6 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Ficha artística
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography gutterBottom>Duración en ejecución:</Typography>
      </Grid>
      {artistsTech2Columns.slice(0, 2).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={{ horarios }} />)}

      <Grid item md={12}>
        <Typography>
          Cantidad de sesiones:

          <Typography gutterBottom color="textSecondary">
            ¿Cuantas sesiones mínimas y máximas para que sus Servicio se realice correctamente?
          </Typography>
        </Typography>
      </Grid>
      {artistsTech2Columns.slice(2, 4).map((item, i) => <FormItem key={i} item={item} {...props} />)}

      <Grid item md={12}>
        <Typography gutterBottom>Duración en montaje y desmontaje, si lo hubiere:</Typography>
      </Grid>
      {artistsTech2Columns.slice(4).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={{ horarios }} />)}

    </Grid>
  );
}

function Beneficiarios(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(beneficiariosColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  Object.keys(dependencies || {}).forEach(key => storagesDeeps[key] = dependencies[key]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Beneficiarios
        </Typography>

        <Typography gutterBottom>
          Elija el público objetivo que se dirige su experiencia artística:
        </Typography>
      </Grid>

      {beneficiariosColumns.slice(0, 1).map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom>Seleccionar mínimo 3</Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}

      {beneficiariosColumns.slice(1, 3).map((item, i) => <FormItem key={i} item={item} {...props} dependencies={dependencies} />)}

      {beneficiariosColumns.slice(3).map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom>Seleccionar mínimo 3</Typography>
            <FormItem item={item} {...props} dependencies={dependencies} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function Finanzas(props) {

  const getLiquido = (amount) => {
    if (!amount) return 0;

    amount = parseFloat((''+amount).replace(/\D/g, ''));

    if (isNaN(amount)) return 0;

    const percent = amount * (12.56 / 100);
    return (amount - percent)?.toFixed(2);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Finanzas
        </Typography>

        <Typography gutterBottom>
          Elije un valor mínimo para tus honorarios ( No contemple materiales o insumos ), para realizar la
          experiencia artística en estas condiciones:
        </Typography>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones más favorables
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='masFavorable'
              value={props.values.masFavorable}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.masFavorable)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones Medianas
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='medianas'
              value={props.values.medianas}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.medianas)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item container md={12} justifyContent="space-around" alignItems="center">
        <Grid item md={3}>
          <Typography color="textSecondary" variant="subtitle">
            Condiciones menos favorables
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" p={2} style={{ border: '1px solid #000', borderRadius: 10, margin: '0 auto' }}>
            <Typography variant="subtitle">
              <strong>Referencia: </strong>
            </Typography>

            <input
              style={{
                width: 100,
                marginLeft: 8,
                border: 0,
                outline: 0,
                fontSize: 16,
                color: '#808080',
                textAlign: 'right'
              }}
              type="number"
              onChange={props.handleChange}
              name='menosFavorable'
              value={props.values.menosFavorable}
              placeholder='$0'
              min='0'
            />
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box display="flex" alignItems="center" style={{ textAlign: 'right' }}>
            <Typography variant="subtitle">
              Referencia<br />
              Líquido:
            </Typography>
            <Typography variant="subtitle" color="textSecondary" style={{ marginRight: 'auto', marginLeft: 8 }}>
              ${getLiquido(props.values.menosFavorable)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Typography gutterBottom>
          El valor referencial Líquido, se ha calculado con el 12,25% del impuesto del SII, Mayo 2022, a las boletas
          de honorarios
        </Typography>

        <Typography gutterBottom>
          Y recuerda que recibirás un contrato antes de cualquier proyecto artístico, con el detalle económico.
        </Typography>
      </Grid>
    </Grid>
  );
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200]
  },
}))(TableRow);

function Archivos(props) {
  const [data, setData] = useState(props?.values?.archivos || []);
  const { openAlert } = useAlertDispatch();

  const handleUpload = ({ target }) => {
    if (!target?.files?.length) {
      return;
    }

    const tipo = data.length < 1 ? 28 : 45;
    const file = target.files[0];
    target.value = '';
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const dimensions = [img.width, img.height];
        if (dimensions[0] < 2560 || dimensions[1] < 1706) {
          openAlert({
            variant: "error",
            message: "Debe colocar una imagen con tamaño adecuado",
          });

          return;
        }

        const item = {
          tipo,
          dimensions,
          name: file.name,
          file,
          img,
          ajuste: false
        };

        console.log(item)

        const event = { target: { name: 'archivos', value: [...data, item] } };
        props.handleChange(event);
        setData([...data, item]);
      };

      img.src = fileReader.result;
    }

    fileReader.readAsDataURL(file);
  }

  const handleAjustar = (index) => {
    const item = data[index];
    item.ajuste = !item.ajuste;
    const items = [...data];
    items.splice(index, 1, item);
    setData(items);
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Archivos
        </Typography>

        <Typography gutterBottom>
          Suba fotografías en la más alta calidad posible, de la experiencia artística:
        </Typography>
      </Grid>

      <Grid item md={8}>
        <Box display="flex">
          <Box px={2} py={.5} bgcolor="primary.main" style={{ color: 'white' }}>
            Fotografía de Portada
          </Box>
          <Box px={2} py={.5} bgcolor="gray" style={{ color: 'white' }}>
            Fotografía detalle
          </Box>
          <Box px={2} py={.5} bgcolor="#808080c2" style={{ color: 'white' }}>
            Video
          </Box>
        </Box>
        <Box bgcolor="#8080801f" p={3}>
          <Typography variant="subtitle" gutterBottom paragraph>
            Es la fotografía principal de la experiencia, se utilizará en catálogo, colecciones, en la
            confeccción del Dossier, en ventas y en campañas de difusión. Por lo tanto le
            sugerimos que sea muy representativa de su trabajo
          </Typography>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            multiple
            onChange={handleUpload}
          />

          <label htmlFor="contained-button-file">
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: 16 }}
              component="span"
            >
              Subir
            </Button>
          </label>
        </Box>
      </Grid>

      <Grid item md={4} style={{ alignSelf: "center" }}>
        <Typography variant="subtitle">
          <strong>Requerimientos ideales:</strong><br />
        </Typography>

        <Typography variant="subtitle">
          Tamaño: 2560px x 1706px<br />
        </Typography>

        <Typography variant="subtitle">
          Formato: Raw, CR2, jpeg.
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom>
          Archivos cargados:
        </Typography>

        <Box style={{ maxHeight: 300, overflow: 'auto' }}>
          <Table aria-label="Table">
            <TableHead>
              <TableRow style={{ backgroundColor: '#eeeeee' }}>
                <TableCell></TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Dimensiones</TableCell>
                <TableCell style={{ color: '#a00' }}>
                  ¿Requiere ajustes?
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((x, i) => {
                const rowStyle = { backgroundColor: '#80808033', border: '1px solid #80808054' };

                return (
                  <StyledTableRow key={i}>
                    <TableCell>
                      <Box style={{ width: 50, height: 50, backgroundColor: '#dddce1', margin: '0 auto' }}>
                        <img src={x.img.src} style={{ width: 50, height: 50 }} alt="pic" />
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.name}
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.tipo === 28 ? 'Portada' : 'Detalle'}
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.dimensions[0]}px x {x?.dimensions[0]}px
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox checked={x?.ajuste} onChange={() => handleAjustar(i)} />}
                        label="Sí"
                      />
                    </TableCell>
                  </StyledTableRow>
                );
              })}

              {!data?.length && (
                <StyledTableRow>
                  <TableCell colSpan="99">
                    <Typography align="center" variant="h6">
                      No existen archivos
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept1} onChange={props.handleChange} name="accept1" />}
          label="Acepto el uso de los archivos."
        />
      </Grid>
    </Grid>
  );
}

function VistaPrevia(props) {
  const mapWithName = (x) => ({ ...x, nombre: x.label });
  console.log(props.values);
  const servicio = {
    area: storagesDeeps.Area?.find(x => x.id === props.values.area.id),
    tags: props.values.tags?.map(x => mapWithName(storagesDeeps.Tag?.find(y => y.value === x))),
    sintesis: props.values.sintesis,
    archivos: [{ path: props.values.archivos[0].img.src }],
    ocasions: props.values.ocasiones?.map(x => mapWithName(storagesDeeps.Ocasion?.find(y => y.value === x))),
    nombre: props.values.servicioNombre,
    tecnica_artisticas: props.values.tecnicasArtisticas?.map(x => mapWithName(storagesDeeps.TecnicaArtistica?.find(y => y.value === x))),
    slogan: props.values.slogan,
    formatos: props.values.formato?.map(x => mapWithName(storagesDeeps.Formato?.find(y => y.value === x))),
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" style={{ marginBottom: '2rem' }}>
          Vista Previa
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Box style={{ marginTop: '-2.5rem' }}>
          <ServiceCard
            service={servicio}
            color={props.values.area.colorPrimario || '#304ffe'}
            handleClickPrimary={() => { }}
            handleClickSecundary={() => { }}
          />
        </Box>
      </Grid>

      <Grid container item md={6} component={Box} bgcolor="#8080801f" alignItems="center"
        style={{ maxHeight: 400, overflow: 'auto', padding: '1rem' }}>
        <Grid item md={12}>
          <Typography variant="h5" gutterBottom style={{ fontStyle: 'italic' }}>
            <strong>Resumen</strong>
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Nombre experiencia:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.nombre}
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Slogan:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.slogan}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Técnicas artísticas:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.tecnica_artisticas?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Descripción:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.sintesis}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Área:</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.area.nombre}
        </Grid>


        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Tags</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.tags?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>

        <Grid item md={6}>
          <Box bgcolor="#fff" p={.25} mt={1} style={{ width: '95%' }}>
            <Typography><strong>Formato</strong></Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          {servicio.formatos?.map((x, i) => (
            <Chip
              key={i}
              label={x.nombre}
              size="small"
              style={{ marginTop: 4 }}
            />
          ))}
        </Grid>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <Box mt={3}>
          <FormControlLabel
            control={<Checkbox checked={props.values.accept2} onChange={props.handleChange} name="accept2" />}
            label="Acepto enviar mi servicio artístico para recibir oportunidades laborales"
          />
        </Box>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept3} onChange={props.handleChange} name="accept3" />}
          label="Conozco y me resuena los Principios de Sentir Creativo."
        />
        <a href="https://www.sentircreativo.com/somos" target="_blank" rel="noreferrer">
          <Chip label={'Leer'} size="small" />
        </a>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept4} onChange={props.handleChange} name="accept4" />}
          label="Acepto las Políticas para ejecutar un servicio artístico con Sentir Creativo."
        />
        <a href="https://drive.google.com/file/d/11RKoIEmR4pi61rfOdEcP31IhRl99koMA/view?usp=sharingt" target="_blank" rel="noreferrer">
          <Chip label={'Leer'} size="small" />
        </a>
      </Grid>
    </Grid>
  );
}
