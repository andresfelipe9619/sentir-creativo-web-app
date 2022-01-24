import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail, {
  customBodyRender
} from '../../master-detail/MasterDetail'
import Card from '../../card/ServiceCard'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'

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
      sort: true
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
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'input',
      multiline: true
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
      dependency: 'ServiceState'
    }
  },
  {
    name: 'tags',
    label: 'Tags',
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },

  {
    name: 'tecnica_artisticas',
    label: 'Técnicas Artísticas',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },
  {
    name: 'ocasions',
    label: 'Ocasiones',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },
  {
    name: 'publico_objetivos',
    label: 'Público Objetivo',
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 12,
      type: 'tag'
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

export default function Servicios () {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const length = isSmall ? 1 : isMedium ? 2 : 3
  const history = useHistory()
  const master = {
    columns,
    title: 'Servicios'
  }
  const detail = {
    columns
  }

  const handleClick = id => () => {
    history.push(`/admin/servicios/${id}`)
  }

  return (
    <MasterDetail
      create
      toggle
      masterProps={master}
      detailProps={detail}
      service='Servicio'
      renderMaster={({ data }) => (
        <Grid item container md={12}>
          {data.map((s, i) => (
            <Grid key={i} item md={12 / length}>
              <Card service={s} handleClickPrimary={handleClick(s.id)} />
            </Grid>
          ))}
        </Grid>
      )}
    />
  )
}
