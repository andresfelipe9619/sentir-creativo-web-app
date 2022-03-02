import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail from '../../master-detail/MasterDetail'
import Card from '../../card/ServiceCard'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import columns from './columns'

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
            <Grid key={i} item xs={12 / length} md={4} xl={3}>
              <Card service={s} handleClickPrimary={handleClick(s.id)} />
            </Grid>
          ))}
        </Grid>
      )}
    />
  )
}
