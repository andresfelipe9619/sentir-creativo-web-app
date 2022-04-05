import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import Grid from "@material-ui/core/Grid";
import columns from "./columns";
import LazyCards from "../../card/LazyCards";
import AdminAudienceCard from "../../card/AdminAudienceCard";

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
        renderMaster={(props) => (
          <LazyCards
            data={props.data}
            itemRenderer={(item) => <AdminAudienceCard audience={item} />}
          />
        )}
        masterProps={master}
        detailProps={detail}
        service="Audiencia"
      />
    </Grid>
  );
}
