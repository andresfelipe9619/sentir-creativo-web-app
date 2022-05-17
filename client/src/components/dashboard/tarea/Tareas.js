import { Grid } from "@material-ui/core";
import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import TaskCard from "../../card/TaskCard";
import columns from "./columns";
import PaginatedCards from "../../card/PaginatedCards";

export default function Tareas() {
  const master = {
    columns,
    title: "Tareas",
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
            renderCard={(item) => <TaskCard {...item} />}
          />
        )}
        masterProps={master}
        detailProps={detail}
        service="Tarea"
      />
    </Grid>
  );
}
