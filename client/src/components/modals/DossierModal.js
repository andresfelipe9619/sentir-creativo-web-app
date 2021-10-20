import React from 'react'
import GenericModal from './GenericModal'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import API from '../../api'
import { useAlertDispatch } from '../../providers/context/Alert'

const initialValues = {
  nombre: '',
  apellido: '',
  email: '',
  celular: '',
  comentario: '',
  prefijo: '',
  ciudad: ''
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
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

export default function DossierModal ({ open, service, ...props }) {
  const classes = useStyles()
  const { openAlert } = useAlertDispatch()

  const handleFormSubmit = async values => {
    try {
      console.log(`values`, values)
      const result = await API.Audiencia.create({
        ...values
      })
      console.log(`result`, result)
      openAlert({ variant: 'success', message: 'Datos enviados con éxito!' })
    } catch (error) {
      console.error(error)
      openAlert({
        variant: 'error',
        message: 'Algo salió mal. Vuelve a intentarlo más tarde'
      })
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={contactSchema}
    >
      {({ handleSubmit, ...formikProps }) => {
        return (
          <GenericModal open={open} {...props} handleConfirm={handleSubmit}>
            <form>
              <div className={classes.instructions}>
                <Contact {...{ ...formikProps, service }} />
              </div>
            </form>
          </GenericModal>
        )
      }}
    </Formik>
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
          required
          fullWidth
          id='prefijo'
          label='Prefijo'
          disabled={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.prefijo}
          error={!!touched.prefijo && !!errors.prefijo}
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
