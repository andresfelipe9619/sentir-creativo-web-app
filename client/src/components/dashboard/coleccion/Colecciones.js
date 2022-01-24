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
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'archivos',
    label: 'Archivos',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'file'
    }
  }
]

export default function Coleccion () {
  const master = {
    columns,
    title: 'Coleccion'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        create
        masterProps={master}
        detailProps={detail}
        service='Coleccion'
      />
    </Grid>
  )
}
