import { Grid } from "@material-ui/core";
import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import AdminStaffCard from "../../card/AdminStaffCard";
import columns from "./columns";
import PaginatedCards from "../../card/PaginatedCards";
import filters from "./filters";

export default function Staf() {
  const master = {
    columns,
    filters,
    title: "Staf",
  };
  const detail = {
    columns,
  };

  return (
    <Grid item md={12}>
      <MasterDetail
        toggle
        renderMaster={({ data, loading }) => (
          <PaginatedCards
            data={data}
            loading={loading}
            renderCard={(item) => <AdminStaffCard staff={item} />}
          />
        )}
        masterProps={master}
        detailProps={detail}
        service="Staf"
      />
    </Grid>
  );
}
