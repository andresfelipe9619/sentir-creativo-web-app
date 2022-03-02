import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import columns from './columns'
import MasterDetail from '../../master-detail/MasterDetail'
import ProjectCard from '../../card/ProjectCard'

export default function Proyectos () {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const length = isSmall ? 1 : isMedium ? 2 : 3

  const detail = { columns }

  return (
    <MasterDetail
      create
      toggle
      masterProps={detail}
      detailProps={detail}
      service='Proyecto'
      renderMaster={({ data }) => (
        <Grid item container md={12}>
          {data.map((p, id) => (
            <Grid key={id} item xs={12 / length} md={4} xl={3}>
              <ProjectCard {...p} />
            </Grid>
          ))}
        </Grid>
      )}
    />
  )
}
