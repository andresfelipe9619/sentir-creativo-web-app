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
    name: 'apellido',
    label: 'Apellido',
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
    name: 'nombreArtistico',
    label: 'Nombre Artistico',
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
    name: 'email',
    label: 'Email',
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
    name: 'celular',
    label: 'Celular',
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
    name: 'nacionalidad',
    label: 'Nacionalidad',
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
    name: 'oficio',
    label: 'Oficio',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
]

export default function Staf () {
  const master = {
    columns,
    title: 'Staf'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail masterProps={master} detailProps={detail} service='Staf' />
    </Grid>
  )
}
