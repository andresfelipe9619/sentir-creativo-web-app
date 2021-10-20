import React, { useState } from 'react'
import GenericModal from './GenericModal'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { Formik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import API from '../../api'
import PublicoObjetivo from '../publico-objetivo/PublicoObjetivo'
import CheckboxesGroup from '../checkbox'
import Spinner from '../spinner/Spinner'
import RadioGroup from '../radio'
import useAPI from '../../providers/hooks/useAPI'
import { useAlertDispatch } from '../../providers/context/Alert'

const initialValues = {
  nombre: '',
  apellido: '',
  email: '',
  prefijo: '',
  celular: '',
  comentario: '',
  organizacion: '',
  rubro: '',
  publicoObjetivo: [],
  ciudad: '',
  formato: '',
  impacto: '',
  departamento: ''
}

const contactSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  impacto: Yup.number().required('Required'),
  formato: Yup.array().required('Required'),
  publicoObjetivo: Yup.array().required('Required')
})

const fieldsByStep = [
  ['impacto', 'publicoObjetivo'],
  ['formato'],
  ['nombre', 'email']
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))
function getSteps () {
  return ['Info Servicio', 'Formato Servico', 'Datos Contacto']
}

function getStepContent (stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <Info {...props} />
    case 1:
      return <Format {...props} />
    case 2:
      return <Contact {...props} />
    default:
      return 'Unknown stepIndex'
  }
}

export default function ServicioModal ({ open, service, ...props }) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const { openAlert } = useAlertDispatch()

  const handleFormSubmit = async values => {
    try {
      console.log(`values`, values)
      // const result = await API.Proyecto.start({
      //   ...values,
      //   servicio: { id: service.id, nombre: service.nombre }
      // })
      // console.log(`result`, result)
      openAlert({ variant: 'success', message: 'Ticket creado con éxito' })
    } catch (error) {
      console.error(error)
      openAlert({
        variant: 'error',
        message: 'Algo salió mal. Vuelve a intentarlo más tarde'
      })
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => ++prevActiveStep)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => --prevActiveStep)
  }

  return (
    <GenericModal open={open} hideConfirmButton {...props}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={contactSchema}
      >
        {({ handleSubmit, ...formikProps }) => {
          const disableButton =
            formikProps.isSubmitting ||
            fieldsByStep[activeStep].some(field => {
              const value = formikProps.values[field]
              const hasError =
                !!formikProps.touched[field] && !!formikProps.errors[field]
              const isEmpty = Array.isArray(value) ? !value.length : !value
              const disabled = isEmpty || hasError
              return disabled
            })
          const lastStep = activeStep === steps.length - 1
          const sent = activeStep === steps.length
          return (
            <form onSubmit={handleSubmit}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {sent ? (
                  <div>
                    <Typography
                      variant='h4'
                      color='primary'
                      className={classes.instructions}
                    >
                      Envíado!
                    </Typography>
                    <Typography className={classes.instructions}>
                      Prontamente recibirás un Ticket con todos los detalles
                    </Typography>
                    <Button onClick={props.handleClose}>
                      Volver al Catálago
                    </Button>
                    <Button onClick={props.handleClose}>
                      Leer artículos relacionados
                    </Button>
                  </div>
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
                          type='submit'
                          disabled={disableButton}
                          variant='contained'
                          color='primary'
                        >
                          Enviar
                        </Button>
                      ) : (
                        <Button
                          variant='contained'
                          color='primary'
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
          )
        }}
      </Formik>
    </GenericModal>
  )
}

const useInfoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: '25ch'
  }
}))

function Info ({ values, errors, touched, service, handleChange, handleBlur }) {
  const classes = useInfoStyles()
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color='primary' variant='h4'>
          Para cuántas personas?
        </Typography>
        <Typography paragraph>
          Responde esta pregunta y recibe un TICKET con los detalles del
          presupuesto de nuestro servicio de:
        </Typography>
        <Typography paragraph color='primary' variant='h5'>
          {service?.nombre}
        </Typography>
      </Grid>
      <Grid item md={12} container alignItems='center'>
        <span>Para</span>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant='outlined'
          error={!!touched.impacto && !!errors.impacto}
        >
          <OutlinedInput
            name={'impacto'}
            type='number'
            value={values.impacto}
            onBlur={handleBlur}
            onChange={handleChange}
            labelWidth={0}
          />
          {!!touched.impacto && !!errors.impacto && (
            <FormHelperText id='my-helper-text'>
              {errors.impacto}
            </FormHelperText>
          )}
        </FormControl>
        <span>Personas</span>
      </Grid>

      <Typography color='primary' variant='h5'>
        Principalmente
      </Typography>
      <PublicoObjetivo values={values} handleChange={handleChange} />
    </Grid>
  )
}

function Format ({ values, errors, handleChange }) {
  const { data, loading } = useAPI('Formato', true)
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color='primary' variant='h5'>
          En Formato
        </Typography>
      </Grid>
      <Grid item md={12}>
        {!loading && (
          <RadioGroup
            name='formato'
            options={data}
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        )}
        {loading && <Spinner />}
      </Grid>
    </Grid>
  )
}

function Contact ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting
}) {
  const { data, loading } = useAPI('Rubro', true)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id='email'
          label='Email'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          error={!!touched.email && !!errors.email}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id='celular'
          label='Celular'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.celular}
          error={!!touched.celular && !!errors.celular}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id='nombre'
          label='Nombre'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.nombre}
          error={!!touched.nombre && !!errors.nombre}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id='apellido'
          label='Apellido'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.apellido}
          error={!!touched.apellido && !!errors.apellido}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id='ciudad'
          label='Desde la ciudad'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.ciudad}
          error={!!touched.ciudad && !!errors.ciudad}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id='organizacion'
          label='Organización'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.organizacion}
          error={!!touched.organizacion && !!errors.organizacion}
          variant='outlined'
        />
      </Grid>
      <Grid item md={12}>
        {!loading && values.organizacion && (
          <RadioGroup
            name='rubro'
            options={data}
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        )}
        {loading && <Spinner />}
      </Grid>
      <Grid item md={12}>
        <TextField
          fullWidth
          multiline
          rows={6}
          id='comentario'
          label='Comentarios'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.comentario}
          error={!!touched.comentario && !!errors.comentario}
          variant='outlined'
        />
      </Grid>
    </Grid>
  )
}
