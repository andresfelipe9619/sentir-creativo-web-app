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
    name: 'impacto',
    label: 'Impacto',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'estado',
    label: 'Estado',
    options: {
      filter: true,
      sort: true,
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
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'departamento',
    label: 'Departamento',
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

export default function Audiencia () {
  const master = {
    columns,
    title: 'Audiencia'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Audiencia'
      />
    </Grid>
  )
}
