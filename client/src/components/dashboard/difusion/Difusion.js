import { Grid } from '@material-ui/core';
import React from 'react';

import MasterDetail, { customBodyRender } from '../../master-detail/MasterDetail';

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "plataforma",
    label: "Plataforma",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      dependency: "Plataforma",
    },
  },
  {
    name: "descripcion",
    label: "Descripción",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 10,
      type: "input"
    },
  },
  {
    name: "cuponDescuento",
    label: "Cupones Descuentos",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "multiselect",
      dependency: "CuponDescuento",
    },
  },
  {
    name: "coleccion",
    label: "Colección",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "multiselect",
      dependency: "Coleccion",
    },
  },
];

export default function Servicios() {
  const master = {
    columns,
    title: "Tags",
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
        service="Difusion"
      />
    </Grid>
  );
}
