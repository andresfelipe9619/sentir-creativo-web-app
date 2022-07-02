import { useState } from "react";
import GenericModal from "./GenericModal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { useAlertDispatch } from "../../providers/context/Alert";
import {
  artist2Schema,
  artist2Values
} from "./schema";
import API from '../../api';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { uploadFileToS3 } from '../../utils/aws';
import ArtistExperience from '../staff-servicio/ArtistExperience';
import ActionAreas from '../staff-servicio/ActionAreas';
import ServiceIdentification from '../staff-servicio/ServiceIdentification';
import ArtistTech from '../staff-servicio/ArtistTech';
import ArtistTech2 from '../staff-servicio/ArtistTech2';
import Beneficiarios from '../staff-servicio/Beneficiarios';
import Finanzas from '../staff-servicio/Finanzas';
import Archivos from '../staff-servicio/Archivos';
import VistaPrevia from '../staff-servicio/VistaPrevia';
import FinishForm from '../staff-servicio/FinishForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const fieldsByStep = [
  ['id', 'email', 'nombreCoupon'],
  ['area'],
  ['servicioNombre', 'slogan', 'sintesis', 'trayectoria', 'formato'],
  ['tecnicasArtisticas.3', 'tags.5', 'cantidadArtistas', 'cantidadArtistasApoyo'],
  ['duracionMinima', 'duracionMaxima', 'sesionesMinimo', 'sesionesMaximas'],
  ['publicoObjetivo.3', 'minimoParticipantes', 'maximoParticipantes', 'ocasiones.3'],
  ['masFavorable', 'medianas', 'menosFavorable'],
  ['archivos', 'accept1'],
  ['accept2', 'accept3', 'accept4']
];

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#ff6c00',
  },
}))(LinearProgress);

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

let staffName = '';

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
      staffName = values.staffName;

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

          props.values.staffName = `${stafs[0]?.nombre} ${stafs[0]?.apellido}`;
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
                  <Box display="flex" alignItems="center" mt={3} mb={5}>
                    <Box width="100%" mr={1}>
                      <BorderLinearProgress variant="determinate" value={(activeStep / steps.length) * 100} />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="textSecondary">
                        {`${Math.floor((activeStep / steps.length) * 100)}%`}
                      </Typography>
                    </Box>
                  </Box>
                )}
                <div>
                  {sent ? (
                    <FinishForm handleCloseModal={handleClose}
                      handleReset={() => {
                        formikProps.resetForm();
                        setActiveStep(0);
                      }}
                      staffName={staffName} />
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
