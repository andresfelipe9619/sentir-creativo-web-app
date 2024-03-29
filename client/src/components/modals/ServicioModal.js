import React, { useEffect, useState } from "react";
import GenericModal from "./GenericModal";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Formik } from "formik";
import clsx from "clsx";
import API from "../../api";
import PublicoObjetivo from "../publico-objetivo/PublicoObjetivo";
import Spinner from "../spinner/Spinner";
import RadioGroup from "../radio";
import useAPI from "../../providers/hooks/useAPI";
import { useAlertDispatch } from "../../providers/context/Alert";
import {
  columns,
  serviceSchema,
  serviceValues,
  horarioAgendaColumns,
} from "./schema";
import FormItem from "../master-detail/FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";
import FinishForm from "../finish-form";

const fieldsByStep = [
  ["impacto", "publicoObjetivo"],
  ["formato"],
  ["fechaInicio", "fechaFin"],
  ["nombre", "email"],
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function getSteps() {
  return [
    "Info Servicio",
    "Formato Servicio",
    "Horario y agenda",
    "Datos Contacto",
  ];
}

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <Info {...props} />;
    case 1:
      return <Format {...props} />;
    case 2:
      return <HorarioAgenda {...props} />;
    case 3:
      return <Contact {...props} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function ServicioModal({
  open,
  service,
  handleClose,
  ...props
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { openAlert } = useAlertDispatch();

  const handleFormSubmit = async (values) => {
    try {
      if (values.coupon?.trim()?.length) {
        values.coupon = await validateCoupon(values.coupon);
      }

      values.fechaInicio = new Date(values.fechaInicio).toISOString();
      values.fechaFin = new Date(
        new Date(values.fechaInicio).valueOf() + values.fechaFin
      );

      console.log(`values`, values);
      const result = await API.Proyecto.start({
        ...values,
        servicio: service,
      });
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
    await handleClose();
    setActiveStep(0);
  };

  return (
    <GenericModal
      open={open}
      hideConfirmButton
      hideCloseButton={sent}
      title={service?.nombre}
      handleClose={handleCloseModal}
      {...props}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={serviceValues}
        validationSchema={serviceSchema}
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
                  <FinishForm
                    title="¡Genialístico!"
                    text="un email con el detalle de su cotización"
                    handleClick={handleCloseModal}
                  />
                ) : (
                  <div>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep, { ...formikProps, service })}
                    </div>
                    <div>
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
  );
}

const useInfoStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

function Info({ values, errors, touched, service, handleChange, handleBlur }) {
  const classes = useInfoStyles();
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h4" paragraph>
          ¿Para cuántas personas?
        </Typography>
        <Typography>
          Responde esta pregunta y recibe un TICKET con los detalles del
          presupuesto de nuestro servicio
        </Typography>
      </Grid>
      <Grid item md={12} container alignItems="center">
        <span>Para</span>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          error={!!touched.impacto && !!errors.impacto}
        >
          <OutlinedInput
            name={"impacto"}
            type="number"
            value={values.impacto}
            onBlur={handleBlur}
            onChange={handleChange}
            labelWidth={0}
          />
          {!!touched.impacto && !!errors.impacto && (
            <FormHelperText id="my-helper-text">
              {errors.impacto}
            </FormHelperText>
          )}
        </FormControl>
        <span>Personas</span>
      </Grid>

      <Typography color="primary" variant="h5">
        Principalmente
      </Typography>
      <PublicoObjetivo values={values} handleChange={handleChange} />
    </Grid>
  );
}

function Format({ values, errors, handleChange }) {
  const { data, loading } = useAPI({ service: "Formato", map: true });
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h5">
          En Formato
        </Typography>
      </Grid>
      <Grid item md={12}>
        {!loading && (
          <RadioGroup
            name="formato"
            options={data}
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        )}
        {loading && <Spinner />}
      </Grid>
    </Grid>
  );
}

function Contact(props) {
  const contactColumns = columns(true);
  const { dependencies, loadDependencies, loadingDependencies } =
    useFormDependencies(contactColumns);
  console.log("contactColumns", contactColumns);
  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  if (loadingDependencies) return <Spinner />;
  return (
    <Grid container spacing={2}>
      {contactColumns.map((item, i) => (
        <FormItem key={i} item={item} {...props} dependencies={dependencies} />
      ))}
    </Grid>
  );
}

function HorarioAgenda({ ...formProps }) {
  const columns = horarioAgendaColumns;

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
    <Grid container spacing={6} style={{ marginBottom: 32 }}>
      {columns.map((item) => (
        <Grid item md={12}>
          <Typography color="primary" variant="h4" paragraph>
            {item.label}
          </Typography>
          <FormItem
            key={item.name}
            item={{ ...item, label: "" }}
            {...formProps}
            dependencies={{ horarios }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
