import React, { useEffect } from 'react'
import GenericModal from './GenericModal'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import API from '../../api'
import { useAlertDispatch } from '../../providers/context/Alert'
import FormItem from '../master-detail/FormItem'
import useFormDependencies from '../../providers/hooks/useFormDependencies'
import Spinner from '../spinner/Spinner'
import { columns, dossiersSchema, dossierValues } from './schema'

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
      const result = await API.Audiencia.dossier({
        ...values,
        servicio: service
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
      initialValues={dossierValues}
      validationSchema={dossiersSchema}
    >
      {({ handleSubmit, ...formikProps }) => {
        return (
          <GenericModal
            {...props}
            open={open}
            handleConfirm={handleSubmit}
            title={service?.nombre || ''}
            isSubmitting={formikProps.isSubmitting}
          >
            <form>
              <div className={classes.instructions}>
                <Contact {...formikProps} />
              </div>
            </form>
          </GenericModal>
        )
      }}
    </Formik>
  )
}

function Contact (formProps) {
  const contactColumns = columns()
  const {
    dependencies,
    loadDependencies,
    loadingDependencies
  } = useFormDependencies(contactColumns)

  useEffect(() => {
    loadDependencies()
    //eslint-disable-next-line
  }, [])

  if (loadingDependencies) return <Spinner />
  return (
    <Grid container spacing={2}>
      {contactColumns.map((item, i) => (
        <FormItem
          key={i}
          item={item}
          {...formProps}
          dependencies={dependencies}
        />
      ))}
    </Grid>
  )
}
