import React, { useState } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Master from './Master'
import Detail from './Detail'
import useAPI from '../../providers/hooks/useAPI'
import Spinner from '../spinner/Spinner'
import SpeedDial from '../speed-dial/SpeedDial'
import CreateEntity from '../modals/CreateEntity'

export default function MasterDetail ({
  masterProps,
  detailProps,
  service,
  create,
  renderMaster
}) {
  const match = useRouteMatch()
  const history = useHistory()
  const masterPath = match.path
  const detailPath = `${masterPath}/:id`
  const [open, setOpen] = useState(false)
  const { data, loading, init, create: createEntity } = useAPI(service)

  const handleClickRow = (_, { dataIndex }) => {
    const entityId = data[dataIndex].id
    history.push(`${masterPath}/${entityId}`)
  }

  const handleOpenModal = () => setOpen(true)

  const handleCloseModal = () => setOpen(false)

  const defaultRender = props => (
    <Master
      {...masterProps}
      {...props}
      data={data}
      loading={loading}
      onRowClick={handleClickRow}
    />
  )

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
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
              <Detail
                {...detailProps}
                {...props}
                service={service}
                reloadMaster={init}
              />
            )}
          />
        </Switch>
      )}
      <CreateEntity
        open={open}
        entity={service}
        handleClose={handleCloseModal}
        handleCreate={createEntity}
        loading={loading}
        {...detailProps}
      />
      {create && <SpeedDial service={service} handleCreate={handleOpenModal} />}
    </>
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
      if(value.codigo) return value.codigo
      return value.nombre
    }
  }
}

function bodyType (type, value) {}
