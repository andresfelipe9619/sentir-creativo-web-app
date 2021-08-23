import React from 'react'
import MUIDataTable from 'mui-datatables'
import Spinner from '../spinner/Spinner'

export default function Master ({ title, data, columns, loading, onRowClick }) {
  if (loading) return <Spinner />
  return (
    <MUIDataTable
      data={data}
      title={title}
      options={{ onRowClick }}
      columns={columns}
    />
  )
}
