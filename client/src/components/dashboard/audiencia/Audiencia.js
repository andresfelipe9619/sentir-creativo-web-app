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
    }
  },
  {
    name: 'apellido',
    label: 'Apellido',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'impacto',
    label: 'Impacto',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'celular',
    label: 'Celular',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'estado',
    label: 'Estado',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'AudienceState'
    }
  },
  {
    name: 'cargo',
    label: 'Cargo',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'departamento',
    label: 'Departamento',
    options: {
      filter: true,
      sort: false
    }
  }
]

export default function Audiencia () {
  const master = {
    columns,
    title: 'Audiencia'
  }
  const detail = {}
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Audience'
      />
    </Grid>
  )
}
