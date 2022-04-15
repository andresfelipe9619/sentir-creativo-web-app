import { Grid } from "@material-ui/core";
import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import columns from "./columns";

export default function Archivos() {
  const master = {
    columns,
    title: "Archivos",
  };
  const detail = { columns };
  return (
    <Grid item md={12}>
      <MasterDetail
        create
        masterProps={master}
        detailProps={detail}
        service="Archivo"
      />
    </Grid>
  );
}
