import React, { useEffect } from 'react'
import GenericModal from './GenericModal'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import * as Yup from 'yup'
import API from '../../api'
import { useAlertDispatch } from '../../providers/context/Alert'
import FormItem from '../master-detail/FormItem'
import useFormDependencies from '../../providers/hooks/useFormDependencies'
import Spinner from '../spinner/Spinner'

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
    .max(50, 'Demasiado largo!')
    .required('¡Reflautillas! El nombre es requerido'),
  email: Yup.string()
    .email('¡Reflautillas! Un email correcto por favor.')
    .required('¡Reflautillas! Un email es requerido')
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
      initialValues={initialValues}
      validationSchema={contactSchema}
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

const columns = [
  {
    name: 'prefijo',
    label: 'Prefijo',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 2,
      type: 'select',
      required: true,
      dependency: 'Prefijo'
    }
  },
  {
    name: 'nombre',
    label: 'Nombre',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 5,
      type: 'input',
      required: true
    }
  },
  {
    name: 'apellido',
    label: 'Apellido',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 5,
      type: 'input'
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: 'input',
      required: true
    }
  },
  {
    name: 'celular',
    label: 'Celular',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: 'input',
      inputType: 'number'
    }
  },
  {
    name: 'ciudad',
    label: 'Desde la ciudad',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
  {
    name: 'comentario',
    label: 'Comentarios',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 12,
      type: 'input',
      multiline: true,
      rows: 6
    }
  }
]

function Contact (formProps) {
  const {
    dependencies,
    loadDependencies,
    loadingDependencies
  } = useFormDependencies(columns)

  useEffect(() => {
    loadDependencies()
    //eslint-disable-next-line
  }, [])

  if (loadingDependencies) return <Spinner />
  return (
    <Grid container spacing={2}>
      {columns.map((item, i) => (
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
