import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import Grid from "@material-ui/core/Grid";
import columns from "./columns";
import AdminAudienceCard from "../../card/AdminAudienceCard";
import PaginatedCards from "../../card/PaginatedCards";

const filters = [
  // {
  //   label: "Destacado",
  //   name: "destacado",
  //   type: "boolean",
  // },
  // {
  //   label: "Fecha Creacion",
  //   name: "created_at",
  //   type: "date",
  // },
  {
    label: "Origen",
    name: "origen",
  },
  {
    label: "Estado Proyectos",
    name: "estado",
  },
  {
    label: "Difusiones",
    name: "difusiones",
  },
  {
    label: "Ciudad",
    name: "ciudad",
  },
  {
    label: "Antiguedad",
    name: "antiguedad",
  },
  {
    label: "Cercania",
    name: "cercania",
  },
  {
    label: "Motivación",
    name: "motivacion",
  },
];

export default function Audiencia() {
  const master = {
    filters,
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
            showPagination={false}
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
