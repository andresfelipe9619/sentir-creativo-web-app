import React from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Master from './Master'
import Detail from './Detail'
import useAPI from '../../providers/hooks/useAPI'
import Spinner from '../spinner/Spinner'

export default function MasterDetail ({
  masterProps,
  detailProps,
  service,
  renderMaster
}) {
  const match = useRouteMatch()
  const history = useHistory()
  const masterPath = match.path
  const detailPath = `${masterPath}/:id`
  const { data, loading, init } = useAPI(service)

  const handleClickRow = (_, { dataIndex }) => {
    const entityId = data[dataIndex].id
    history.push(`${masterPath}/${entityId}`)
  }

  const defaultRender = props => (
    <Master
      {...masterProps}
      {...props}
      data={data}
      loading={loading}
      onRowClick={handleClickRow}
    />
  )
  if (loading) return <Spinner />

  return (
    <Switch>
      <Route
        exact
        strict
        path={masterPath}
        render={
          renderMaster
            ? props => renderMaster({ data, handleClickRow, ...props })
            : defaultRender
        }
      />
      <Route
        path={detailPath}
        render={props => (
          <Detail {...detailProps} {...props} service={service} reloadMaster={init}/>
        )}
      />
    </Switch>
  )
}

const isObject = item => !!item && typeof item === 'object'

export function customBodyRender (type) {
  return value => {
    if (type) return bodyType(type, value)
    if (Array.isArray(value)) {
      return value.map(i => i.nombre).join(', ')
    }
    if (isObject(value)) {
      return value.nombre
    }
  }
}

function bodyType (type, value) {}
