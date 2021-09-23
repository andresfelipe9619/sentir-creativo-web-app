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
      sort: false
    },
    form: {
      size: 8,
      type: 'input'
    }
  },
  {
    name: 'tipoArchivos',
    label: 'Tipos Archivo',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'tag'
    }
  }
]

export default function Archivos () {
  const master = {
    columns,
    title: 'Archivos'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='File'
      />
    </Grid>
  )
}
