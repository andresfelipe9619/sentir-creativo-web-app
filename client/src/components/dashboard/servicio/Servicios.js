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
    name: 'slogan',
    label: 'Slogan',
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
    name: 'sintesis',
    label: 'Sintesis',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 12,
      type: 'input',
      multiline: true
    }
  },
  {
    name: 'tags',
    label: 'Tags',
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

export default function Servicios () {
  const master = {
    columns,
    title: 'Servicios'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Service'
      />
    </Grid>
  )
}
