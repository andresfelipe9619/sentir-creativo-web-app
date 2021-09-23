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
    name: 'color',
    label: 'Color',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
 
 
]

export default function Servicios () {
  const master = {
    columns,
    title: 'Tags'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Tag'
      />
    </Grid>
  )
}
