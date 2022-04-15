import { Grid } from "@material-ui/core";
import React from "react";
import MasterDetail, {
  customBodyRender,
} from "../../master-detail/MasterDetail";

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "website",
    label: "Web Site",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "facebook",
    label: "Facebook",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "instagram",
    label: "Instagram",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "twitter",
    label: "Twitter",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "historial",
    label: "historial",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "email",
    label: "email",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      inputType: "email",
    },
  },
  {
    name: "telefono",
    label: "telefono",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      inputType: "tel",
    },
  },
  {
    name: "tamano",
    label: "Tamaño",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Tamano",
    },
  },
  {
    name: "rubro",
    label: "Rubro",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Rubro",
    },
  },
];

export default function Organizaciones() {
  const master = {
    columns,
    title: "Organizaciones",
  };
  const detail = {
    columns,
  };
  return (
    <Grid item md={12}>
      <MasterDetail
        create
        masterProps={master}
        detailProps={detail}
        service="Organizacion"
      />
    </Grid>
  );
}
