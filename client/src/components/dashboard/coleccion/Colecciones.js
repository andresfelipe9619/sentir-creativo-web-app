import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail, {
  customBodyRender
} from '../../master-detail/MasterDetail'

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
    name: 'cuponDescuento',
    label: 'Cupon Descuento',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'CuponDescuento'
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
      type: 'input',
      multiline: true
    }
  },
  {
    name: 'servicios',
    label: 'Servicios',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'multiselect',
      dependency: 'Servicio'
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
