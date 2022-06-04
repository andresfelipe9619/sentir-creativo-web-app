import React from "react";
import MasterDetail from "../../master-detail/MasterDetail";
import Card from "../../card/ServiceCard";
import { useHistory } from "react-router-dom";
import columns from "./columns";
import PaginatedCards from "../../card/PaginatedCards";
import filters from "./filters";

export default function Servicios() {
  const history = useHistory();
  const master = {
    columns,
    filters,
    title: "Servicios",
  };
  const detail = {
    columns,
  };

  const handleClick = (id) => () => {
    history.push(`/admin/servicios/${id}`);
  };

  return (
    <MasterDetail
      create
      toggle
      masterProps={master}
      detailProps={detail}
      service="Servicio"
      renderMaster={({ data, loading }) => (
        <PaginatedCards
          data={data}
          loading={loading}
          renderCard={(item) => (
            <Card service={item} handleClickPrimary={handleClick(item?.id)} />
          )}
        />
      )}
    />
  );
}
