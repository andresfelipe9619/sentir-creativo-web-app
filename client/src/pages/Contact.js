import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import API from '../api'
const initialValues = {
  nombre: '',
  email: '',
  celular: '',
  message: '',
  organizacion: '',
  cargo: '',
  departamento: ''
}

const contactSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  celular: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

export default function Contact () {
  const classes = useStyles()

  const handleFormSubmit = async values => {
    try {
      const result = await API.Audiencia.create(values)
      console.log(`result`, result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid container item md={12}>
        <Grid container item md={6}>
          <Typography variant='h3' paragraph>
            Contactanos
          </Typography>
          <Typography variant='h6' component='p' paragraph>
            Lo mejor que encontraras en todo el mundo!
          </Typography>
        </Grid>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={contactSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    id='cargo'
                    label='Cargo'
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cargo}
                    error={!!touched.cargo && !!errors.cargo}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    id='departamento'
                    label='Departamento'
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.departamento}
                    error={!!touched.departamento && !!errors.departamento}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={6}
                    id='message'
                    label='Message'
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.message}
                    error={!!touched.message && !!errors.message}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={12} container justifyContent='flex-end'>
                  <Button
                    type='submit'
                    color='primary'
                    variant='outlined'
                    disabled={isSubmitting}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  root: { height: '100%', width: '100%' }
}))
