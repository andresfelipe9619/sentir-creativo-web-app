import { useState, useEffect } from "react";
import GenericModal from "./GenericModal";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Spinner from "../spinner/Spinner";
import { Formik } from "formik";
import { useAlertDispatch } from "../../providers/context/Alert";
import { artistSchema, artistValues } from "./schema";
import { customBodyRender } from "../master-detail/MasterDetail";
import FormItem from "../master-detail/FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";
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
import CheckboxesGroup from "../checkbox";
import useAPI from "../../providers/hooks/useAPI";
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const fieldsByStep = [
  ["nombre", "apellido", "fechaNacimiento", "nacionalidad"],
  ["areas"],
  ["oficio", "tecnicas"],
  [],
  ["ciudad", "email", "reunion"],
];

const COLORS = {
  purple: "#b522b4",
  blue: "#3b53b3",
  text: "#4f4f4f",
  bg: "#ffeb12",
  orange: "#ff6c00",
};

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

const pInformationColumns = [
  {
    name: "prefijo",
    label: "Prefijo",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 3,
      type: "select",
      dependency: "Prefijo"
    },
  },
  {
    name: "nombre",
    label: "Nombre",
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
    name: "apellido",
    label: "Apellido",
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
    name: "fechaNacimiento",
    label: "Fecha de nacimiento",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 7,
      type: "date",
      format: 'dd/MM/yyyy',
      views: ['date'],
      maxDate: Date.now()
    },
  },
  {
    name: "nacionalidad",
    label: "Nacionalidad",
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
    name: "nombreArtistico",
    label: "Nombre artistico",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
];

const contactColumns = [
  {
    name: "ciudad",
    label: "Ciudad",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 12,
      type: "city",
      required: true,
    },
  },
  {
    name: "celular",
    label: "Celular",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "phone"
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
      size: 6,
      type: "input",
      required: true
    },
  },
  {
    name: "reunion",
    label: "Prefieres una reunión",
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: "select",
      required: true,
      dependency: 'reunion'
    },
  },
  {
    name: "coupon",
    label: "Cupón",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "extra",
    label: "",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 12,
      type: "input",
      multiline: true
    },
  }
];

const socialColumns = [
  {
    name: "instagram",
    label: "Instagram",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 8,
      type: "input",
    },
  },
  {
    name: "tiktok",
    label: "Tiktok",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 8,
      type: "input",
    },
  },
  {
    name: "youtube",
    label: "Youtube",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 8,
      type: "input",
    },
  },
  {
    name: "spotify",
    label: "Spotify",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 8,
      type: "input",
    },
  },
  {
    name: "otherLink",
    label: "Otros links",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 8,
      type: "input"
    },
  },
];

const socialIcons = {
  instagram: 'https://microsoft-store.azurewebsites.net/store/detail/9NBLGGH5L9XT/image',
  tiktok: 'http://store-images.s-microsoft.com/image/apps.47495.13634052595610511.c45457c9-b4af-46b0-8e61-8d7c0aec3f56.a8b71481-8a43-465d-88d6-e63add92c112',
  youtube: 'https://play-lh.googleusercontent.com/Qolm5gr9jnabjk-0z79srjYC1XPVExribNz5kbDmGJeEtmRlo0UQoQEIkKMHRyt5paw',
  spotify: 'https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM',
  otherLink: 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/95-512.png'
}

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <PersonalInformation {...props} />;
    case 1:
      return <ActionAreas {...props} />;
    case 2:
      return <Talented {...props} />;
    case 3:
      return <CurriculumVirtual {...props} />;
    case 4:
      return <Contact {...props} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function ArtistModal() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState(false);
  const steps = [
    'Infomación personal',
    '¿Cuál es tu area?',
    'Infomación artisticas',
    'Redes sociales',
    'Para comunicarnos'
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
      let comentarios = [];

      if (values.coupon?.trim()?.length) {
        values.coupon = await validateCoupon(values.coupon);
        comentarios.push({ comentario: 'Viene de staff con cupón ' + values.coupon.codigo });
      }

      values.fechaNacimiento = new Date(values.fechaNacimiento).toISOString();

      values.areas.forEach(x => comentarios.push({ comentario: x.nombre }));
      values.areas = values.areas.map(x => x.id);

      comentarios.push({ comentario: values.reunion });

      if (values.extra?.length) {
        comentarios.push({ comentario: values.extra });
      }

      let archivos = [
        { tipo_archivo: 37, path: values.instagram, nombre: 'Instagram', updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
        { tipo_archivo: 38, path: values.tiktok, nombre: 'Tiktok', updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
        { tipo_archivo: 39, path: values.youtube, nombre: 'Youtube', updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
        { tipo_archivo: 40, path: values.spotify, nombre: 'Spotify', updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
        { tipo_archivo: 41, path: values.otherLink, nombre: 'Otras redes sociales', updated_at: new Date().toISOString(), created_at: new Date().toISOString() }
      ].filter(x => !!x.path);

      const result = await API.Staf.createNew(values);

      comentarios = await Promise.all(comentarios.filter(x => !!x.comentario?.length).map(async x => await API.Comentarios.create(x)));
      await API.Staf.update(result.id, { comentarios });

      archivos = await Promise.all(archivos.map(async x => await API.Archivo.create(x)));
      archivos.length && await API.Archivo.addFiles2Entity(result.id, 'staf', [archivos.map(x => x.id)]);

      openAlert({ variant: "success", message: "Postulación exitosa" });
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

  const validateCoupon = async (coupon) => {
    const coupons = await API.CuponDescuento.getAll();
    const currCoupon = coupons?.find((x) => x.codigo === coupon);

    if (!currCoupon) throw new Error("Cupón inválido");

    return currCoupon;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => ++prevActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => --prevActiveStep);
  };

  const lastStep = activeStep === steps.length - 1;
  const sent = activeStep === steps.length;

  const handleCloseModal = async () => {
    setShow(false);
    setActiveStep(0);
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        className={classes.buttonColorful}
        style={{ backgroundColor: COLORS.purple, fontSize: "1.5rem" }}
        onClick={() => setShow(true)}
      >
        Únete a la red
      </Button>

      <GenericModal
        open={show}
        hideConfirmButton
        hideCloseButton={sent}
        title="Únete a la red"
        handleClose={handleCloseModal}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={artistValues}
          validationSchema={artistSchema}
        >
          {({ handleSubmit, ...formikProps }) => {
            const disableButton =
              formikProps.isSubmitting ||
              (!sent &&
                fieldsByStep[activeStep].some((field) => {
                  const value = formikProps.values[field];
                  const hasError =
                    !!formikProps.touched[field] && !!formikProps.errors[field];
                  const isEmpty = Array.isArray(value) ? !value.length : !value;
                  const disabled = isEmpty || hasError;
                  return disabled;
                }));

            return (
              <form onSubmit={handleSubmit}>
                {!isSmall && (
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                <div>
                  {sent ? (
                    <FinishForm handleCloseModal={handleCloseModal} />
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
                            onClick={handleNext}
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

function FinishForm({ handleCloseModal }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Fantástico!
        </Typography>

        <Typography gutterBottom style={{ fontWeight: 700 }}>
          Nos comunicaremos con usted para conocer más sobre su propuesta artística, disciplina y/o terapia.
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          Sugerimos ir reuniendo fotografías, links de interés, videos de su trabajo. Y si es posible disponga de su
          curriculum o breve sintesis de sus años en el oficio-profesión.
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          Por nuestra parte te contaremos como conectamos los talentos artísticos con oportunidades laborales,
          durante todo el año, donde se valora el arte, oficio y /o profesión.
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

      <Grid item md={4} style={{ marginLeft: "auto", textAlign: "right" }}>
        <Button
          color="primary"
          variant="contained"
          style={{ margin: 14 }}
          onClick={handleCloseModal}
        >
          Seguir explorando
        </Button>
      </Grid>
    </Grid>
  );
}

function PersonalInformation(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(pInformationColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Convocatoria de artistas!
        </Typography>

        <Typography gutterBottom>
          Ingresa estos datos y nos comunicaremos con usted para conocer más sobre su propuesta artística,
          disciplina y/o terapia. ¡Y así conectarte con Proyectos Artísticos!
        </Typography>
      </Grid>

      {pInformationColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={dependencies} />
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
  const [selectedAreas, setSelectedAreas] = useState(props.values?.areas || []);

  const tecnicas = {
    "Creaciones Cuánticas": ['Espectáculo', 'Obra de Teatro', 'Show escénico'],
    "Felicidad Organizacional": ['Autocuidado', 'Pausa activa', 'Terapias'],
    "Universidad Creativa": ['Taller artístico', 'Taller de oficio', 'Charlas y Seminarios'],
    "Galaxia Musical": ['Mi propuesta musical', 'Banda musical', 'Orquestas']
  };

  const onSelectArea = area => {
    const exists = selectedAreas.find(x => x.id === area.id);

    const values = exists
      ? selectedAreas.filter(x => x.id !== area.id)
      : [...selectedAreas, area]

    setSelectedAreas(values);
    const event = { target: { name: 'areas', value: values } };
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
              icono,
            };
          })
        );
        setAreas(result);
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
          Nuestras áreas de acción:
        </Typography>

        <Typography gutterBottom>
          Elige una o más áreas, según el o los servicios que desearías subir al catálogo:
        </Typography>
      </Grid>

      {areas.map(x => {
        const areaTheme = createTheme({
          palette: {
            primary: { main: x.colorPrimario },
          },
        });

        const CheckIcon = selectedAreas.find(y => y.id === x.id) ? CheckCircleIcon : CheckCircleOutlineIcon;
        const active = selectedAreas.find(y => y.id === x.id);

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
                  {x.icono && <x.icono size={"2rem"} style={{ color: '#fff' }} />}

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

function Talented(props) {
  const { data, loading } = useAPI({ service: "TecnicaArtistica", map: true });

  if (loading) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Cuéntenos de su talento!
        </Typography>
      </Grid>

      <FormItem
        item={{
          name: "oficio",
          label: "Su oficio o profesión",
          form: {
            size: 4,
            required: true,
            type: "input",
          }
        }}

        {...props}
      />

      <Grid item md={12}>
        <Typography variant="h5" style={{ marginTop: 24 }}>
          Seleccione las técnicas que dominas:
        </Typography>
        <Box style={{ maxHeight: 200, overflow: 'auto' }}>
          <CheckboxesGroup
            legend=""
            name="tecnicas"
            options={data}
            {...props}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function CurriculumVirtual(props) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          ¡Curriculum virtual!
        </Typography>

        <Typography gutterBottom>
          Escribe las redes sociales que utilizas para que podamos conocer más de ti y tu arte:
        </Typography>
      </Grid>

      {socialColumns.map((item, i) => (
        <Grid item md={12} key={i}>
          <Box display="flex">
            <Avatar
              src={socialIcons[item.name]}
              style={{ width: 65, height: 65, marginRight: 16, objectFit: 'contain' }}
            />

            <FormItem item={item} {...props} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function Contact(props) {
  const { dependencies, loadDependencies, loadingDependencies } = useFormDependencies(contactColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;

  const meetType = ['Reunión presencial', 'Reunión virtual'].map(x => ({ label: x, value: x }));

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Para comunicarnos y encontrarnos.
        </Typography>

        <Typography gutterBottom>
          ¿En que ciudad vives actualmente?
        </Typography>
      </Grid>

      <Grid container item md={12}>
        {[contactColumns[0]].map((item, i) => (
          <FormItem key={i} item={item} {...props} dependencies={dependencies} />
        ))}
      </Grid>

      {contactColumns.slice(1, 5).map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={{ ...dependencies, reunion: meetType }} />
      ))}

      <Grid item md={12}>
        <Typography variant="h4" gutterBottom>
          Comentarios o información que consideres relevante:
        </Typography>

        <Typography variant="body2" gutterBottom>
          <Typography display="inline" style={{ fontWeight: 700 }}>Ejemplos:</Typography> Taller de esculturas indígenas con greda, obra de teatro “Volcán”, Autocuidado con origami, banda regional: “Volcantallica” , links.com.
        </Typography>
      </Grid>

      {contactColumns.slice(-1).map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={dependencies} />
      ))}
    </Grid>
  );
}
