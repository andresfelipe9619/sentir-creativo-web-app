import React, { useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import API from '../../api'
import Spinner from '../spinner/Spinner'
import { Button } from '@material-ui/core'
import FormItem from './FormItem'

export default function Detail ({ columns, service, match }) {
  const [data, setData] = useState(null)
  const [dependencies, setDependencies] = useState(null)
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

  const loadDependencies = useCallback(async () => {
    try {
      let dependencyColumns = columns.reduce((acc, col) => {
        let dependency = col?.form?.dependency
        if (dependency) {
          acc = acc.concat(dependency)
        }
        return acc
      }, [])
      await Promise.all(
        dependencyColumns.map(async dependecy => {
          let result = await API[dependecy].getAll()
          setDependencies(prev => ({
            ...prev,
            [dependecy]: result.map(item => ({
              label: item.nombre,
              value: item.id
            }))
          }))
        })
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
    //eslint-disable-next-line
  }, [])

  const init = useCallback(async () => {
    try {
      const result = await API[service].get(entityId)
      console.log(`result`, result)
      setData(result)
      await loadDependencies()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [entityId, service, loadDependencies])

  useEffect(() => {
    init()
    //eslint-disable-next-line
  }, [])

  const initialValues = columns.reduce((acc, col) => {
    let key = col.name
    if (!data) return acc
    let value = data[key]
    if (col?.form?.type === 'select') {
      value = value?.id
      console.log(`value`, value)
    }
    acc[key] = value
    return acc
  }, {})

  console.log(`initialValues`, initialValues)
  if (loading) return <Spinner />
  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      // validationSchema={contactSchema}
    >
      {({ handleSubmit, ...formProps }) => (
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} component={Box} p={2}>
            <Grid container spacing={4}>
              {columns.map((item, i) => (
                <FormItem
                  key={i}
                  item={item}
                  {...formProps}
                  dependencies={dependencies}
                />
              ))}
              <Grid item md={12} container justifyContent='flex-end'>
                <Button
                  type='submit'
                  color='primary'
                  variant='outlined'
                  disabled={formProps.isSubmitting}
                >
                  {formProps.isSubmitting ? 'Guardando ...' : 'Guardar'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    </Formik>
  )
}
