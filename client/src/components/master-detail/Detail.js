import React, { useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
// import * as Yup from 'yup'
import API from '../../api'
import Spinner from '../spinner/Spinner'
import { Button } from '@material-ui/core'
import Tags from '../tags/Tags'

// const contactSchema = Yup.object().shape({
//   nombre: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   celular: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Required')
// })

export default function Detail ({ columns, service, match }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const entityId = match?.params?.id

  const handleFormSubmit = useCallback(
    async values => {
      try {
        const result = await API[service].update(entityId, values)
        console.log(`result`, result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [entityId, service]
  )

  const init = useCallback(async () => {
    try {
      const result = await API[service].get(entityId)
      console.log(`result`, result)
      setData(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [entityId, service])

  useEffect(() => {
    init()
    //eslint-disable-next-line
  }, [])

  const initialValues = columns.reduce((acc, col) => {
    let key = col.name
    if (!data) return acc
    acc[key] = data[key]
    return acc
  }, {})

  if (loading) return <Spinner />
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      // validationSchema={contactSchema}
    >
      {({ handleSubmit, ...formProps }) => (
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} component={Box} p={2}>
            <Grid container spacing={2}>
              {columns.map((item, i) => (
                <FormItem key={i} item={item} {...formProps} />
              ))}
              <Grid item md={12} container justify='flex-end'>
                <Button
                  type='submit'
                  color='primary'
                  variant='outlined'
                  disabled={formProps.isSubmitting}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    </Formik>
  )
}

function FormItem ({
  item,
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur
}) {
  if (!item?.form) return null
  const { size, type, ...fieldProps } = item.form
  const key = item.name
  let value = values[key]

  const canRender = name => type === name
  const content = {
    input: canRender('input') && (
      <TextField
        fullWidth
        id={key}
        label={item.label}
        disabled={isSubmitting}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        error={!!touched[key] && !!errors[key]}
        variant='outlined'
        {...fieldProps}
      />
    ),
    tag: canRender('tag') && <Tags tags={value} title={item.label} />
  }
  return (
    <Grid item md={size}>
      {content[type]}
    </Grid>
  )
}
