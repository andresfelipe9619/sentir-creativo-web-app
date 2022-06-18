import React from "react";
import MUIDataTable from "mui-datatables";

export default function Master({
  title,
  data,
  columns,
  onRowClick,
  onRowsDelete,
  customToolbarSelect,
}) {
  return (
    <MUIDataTable
      data={data}
      title={title}
      options={{ onRowClick, onRowsDelete, customToolbarSelect }}
      columns={columns}
    />
  );
}
