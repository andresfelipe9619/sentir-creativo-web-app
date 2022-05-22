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
import { createTheme } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckboxesGroup from "../checkbox";
import useAPI from "../../providers/hooks/useAPI";
import Avatar from '@material-ui/core/Avatar';

const fieldsByStep = [
  ["nombre", "apellido", "fechaNacimiento", "nacionalidad"],
  [],
  ["oficio"],
  [],
  ["pais", "email", 'reunion'],
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
    name: "pais",
    label: "País",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 3,
      type: "select",
      dependency: "Pais",
      required: true
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
      type: "input",
      inputType: "number"
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
    label: "Prefiers una reunión",
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

  const handleFormSubmit = async (values) => {
    if (!lastStep) {
      handleNext();
      return;
    }

    console.log('VALUES ->', values)
    try {
      const comentarios = [];

      if (values.coupon?.trim()?.length) {
        values.coupon = await validateCoupon(values.coupon);
        comentarios.push({ comentario: 'Viene de staff con cupón ' + values.coupon });
      }

      values.fechaNacimiento = new Date(values.fechaNacimiento).toISOString();

      values.areas.forEach(x => comentarios.push({ comentario: x.nombre }));
      values.areas = values.areas.map(x => x.id);

      comentarios.push({ comentario: values.reunion });

      if (values.extra) {
        comentarios.push({ comentario: values.extra });
      }

      values.comentarios = comentarios;
      const result = await API.Staf.createNew(values);
      console.log(`result`, result);
      openAlert({ variant: "success", message: "Ticket creado con éxito" });
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
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
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
  const [selectedAreas, setSelectedAreas] = useState([]);

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
        onSelectArea(result[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSelectArea = (area) => {
    const exists = selectedAreas.find(x => x.id === area.id);

    if (exists && selectedAreas.length === 1) {
      return;
    }

    const values = exists
      ? selectedAreas.filter(x => x.id !== area.id)
      : [...selectedAreas, area]

    setSelectedAreas(values);
    console.log('SELECT AREA ->', area, values)
    props.values['areas'] = values;
  }

  if (loading) return <Spinner />;

  return (
    <Grid container spacing={2}>
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

        return (
          <Grid item md={3} key={x.id}>
            <Card>
              <CardActionArea onClick={() => onSelectArea(x)}>
                <CardContent style={{ backgroundColor: areaTheme.palette.primary.dark }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box style={{ flexBasis: '80%' }}>
                      <Typography style={{ color: '#fff', lineHeight: 1, fontWeight: 700 }}>
                        Quiero subir:
                      </Typography>

                      {[...x.tecnicas].sort((a, b) => a.length - b.length).slice(0, 3).map(tecnica => (
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

                    <CheckIcon style={{ color: '#fff' }} />
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
  const { data, loading } = useAPI({ service: "PublicoObjetivo", map: true });

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
        <CheckboxesGroup
          legend=""
          name="tecnicas"
          options={data}
          {...props}
        />
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
              src="https://w7.pngwing.com/pngs/275/474/png-transparent-android-google-play-social-work-service-work-service-heart-logo.png"
              style={{ width: 65, height: 65, marginRight: 16 }}
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
