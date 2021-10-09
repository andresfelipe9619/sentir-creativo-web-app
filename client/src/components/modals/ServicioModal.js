import React, { useState } from 'react'
import GenericModal from './GenericModal'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
import useAPI from '../../providers/hooks/useAPI'

const initialValues = {
  nombre: '',
  email: '',
  celular: '',
  comentario: '',
  organizacion: '',
  rubro: '',
  publicoObjetivo: '',
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
  celular: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

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

  const handleFormSubmit = async values => {
    try {
      const result = await API.Audience.create(values)
      console.log(`result`, result)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <GenericModal open={open} hideConfirmButton {...props}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={contactSchema}
      >
        {({ handleSubmit, ...formikProps }) => (
          <form onSubmit={handleSubmit}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography
                    variant='h4'
                    color='primary'
                    className={classes.instructions}
                  >
                    Enviado!
                  </Typography>
                  <Typography className={classes.instructions}>
                    Prontamente recibirás un Ticket con todos los detalles
                  </Typography>
                  <Button onClick={props.handleClose}>
                    Volver al Catalago
                  </Button>
                  <Button onClick={props.handleClose}>
                    Leer articulos relacionados
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
                      Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                      <Button type='submit' variant='contained' color='primary'>
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </GenericModal>
  )
}

function Format ({
  values,
  errors,
  service,
  touched,
  handleChange,
  handleBlur,
  isSubmitting
}) {
  const { data, loading } = useAPI('Format', true)

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color='primary' variant='h5'>
          En Formato
        </Typography>
      </Grid>
      <Grid item md={12}>
        {!loading && <CheckboxesGroup legend='' options={data} />}
        {loading && <Spinner />}
      </Grid>
    </Grid>
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

function Info ({
  values,
  errors,
  service,
  touched,
  handleChange,
  handleBlur,
  isSubmitting
}) {
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
        >
          <OutlinedInput
            id='outlined-adornment-weight'
            value={values.weight}
            onChange={handleChange('weight')}
            aria-describedby='outlined-weight-helper-text'
            inputProps={{
              'aria-label': 'weight'
            }}
            labelWidth={0}
          />
        </FormControl>
        <span>Personas</span>
      </Grid>

      <Typography color='primary' variant='h5'>
        Principalmente
      </Typography>
      <PublicoObjetivo />
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
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
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
      <Grid item md={6}>
        <TextField
          required
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
      <Grid item md={6}>
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
      <Grid item md={6}>
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
      <Grid item md={6}>
        <TextField
          required
          fullWidth
          id='organizacion'
          label='Organizacion'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.organizacion}
          error={!!touched.organizacion && !!errors.organizacion}
          variant='outlined'
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          required
          fullWidth
          multiline
          rows={6}
          id='comentario'
          label='Message'
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
