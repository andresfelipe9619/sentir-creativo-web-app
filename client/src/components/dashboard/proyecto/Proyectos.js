import React from "react";
import columns from "./columns";
import MasterDetail from "../../master-detail/MasterDetail";
import ProjectCard from "../../card/ProjectCard";
import PaginatedCards from "../../card/PaginatedCards";
import filters from "./filters";
export default function Proyectos() {
  const detail = { columns, filters };

  return (
    <MasterDetail
      create
      toggle
      masterProps={detail}
      detailProps={detail}
      service="Proyecto"
      // DetailCpm={Detail}
      renderMaster={({ data, loading }) => (
        <PaginatedCards
          data={data}
          loading={loading}
          renderCard={(item) => <ProjectCard {...item} />}
        />
      )}
    />
  );
}
