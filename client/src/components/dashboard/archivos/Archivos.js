import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail from '../../master-detail/MasterDetail'

const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
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
    name: 'path',
    label: 'Path',
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
    name: 'updated_at',
    label: 'Última Actualización',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 4,
      type: 'input'
    }
  },

  {
    name: 'created_at',
    label: 'Creado el',
    options: {
      filter: true,
      sort: false,
      type: 'array'
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
]

export default function Archivos () {
  const master = {
    columns,
    title: 'Archivos'
  }
  const detail = { columns }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Archivo'
      />
    </Grid>
  )
}
