import React, { useEffect, useState, useCallback } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Master from './Master'
import Detail from './Detail'
import API from '../../api'

export default function MasterDetail ({ masterProps, detailProps, service }) {
  const match = useRouteMatch()
  const history = useHistory()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const masterPath = match.path
  const detailPath = `${masterPath}/:id`

  const init = useCallback(async () => {
    try {
      let result = await API[service].getAll()
      setData(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [service])

  const handleClickRow = (_, { dataIndex }) => {
    const entityId = data[dataIndex].id
    history.push(`${masterPath}/${entityId}`)
  }

  useEffect(() => {
    init()
    //eslint-disable-next-line
  }, [])

  return (
    <Switch>
      <Route
        exact
        strict
        path={masterPath}
        render={props => (
          <Master
            {...masterProps}
            {...props}
            data={data}
            loading={loading}
            onRowClick={handleClickRow}
          />
        )}
      />
      <Route
        path={detailPath}
        render={props => (
          <Detail {...detailProps} {...props} service={service} />
        )}
      />
    </Switch>
  )
}
