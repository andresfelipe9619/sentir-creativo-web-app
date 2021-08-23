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
    name: 'formato',
    label: 'Formato',
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
    name: 'impacto',
    label: 'Impacto',
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
    name: 'descripcion',
    label: 'Descripcion',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 8,
      type: 'input',
      multiline: true
    }
  },
  {
    name: 'avance',
    label: 'Avance',
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
    name: 'avance',
    label: 'Avance',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 4,
      type: 'input'
    }
  }
]

export default function Proyectos () {
  const master = {
    columns,
    title: 'Proyectos'
  }
  const detail = { columns }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Project'
      />
    </Grid>
  )
}
