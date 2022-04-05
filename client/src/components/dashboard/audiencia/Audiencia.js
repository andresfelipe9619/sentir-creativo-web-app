import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import Grid from "@material-ui/core/Grid";
import columns from "./columns";
import AdminAudienceCard from "../../card/AdminAudienceCard";
import PaginatedCards from "../../card/PaginatedCards";

export default function Audiencia() {
  const master = {
    columns,
    title: "Audiencia",
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
            renderCard={(item) => <AdminAudienceCard audience={item} />}
          />
        )}
        masterProps={master}
        detailProps={detail}
        service="Audiencia"
      />
    </Grid>
  );
}
