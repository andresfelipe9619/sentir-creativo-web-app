import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function Master ({ title, data, columns, onRowClick }) {
  return (
    <MUIDataTable
      data={data}
      title={title}
      options={{ onRowClick }}
      columns={columns}
    />
  )
}
