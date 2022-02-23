import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail from '../../master-detail/MasterDetail'
import AdminStaffCard from '../../card/AdminStaffCard'
import useResponsiveCard from '../../../providers/hooks/useResponsiveCard'
import columns from  "./columns"

export default function Staf () {
  const master = {
    columns,
    title: 'Staf'
  }
  const detail = {
    columns
  }
  const length = useResponsiveCard()
  return (
    <Grid item md={12}>
      <MasterDetail
        toggle
        renderMaster={({ data }) => (
          <Grid item container md={12}>
            {data.map(a => (
              <Grid item key={a.id} md={12 / length}>
                <AdminStaffCard staff={a} />
              </Grid>
            ))}
          </Grid>
        )}
        masterProps={master}
        detailProps={detail}
        service='Staf'
      />
    </Grid>
  )
}
