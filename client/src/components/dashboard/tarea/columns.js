import { customBodyRender } from "../../master-detail/MasterDetail"

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
      required: true,
      type: "input",
    }
  },
  {
    name: "sintesis",
    label: "Sintesis",
    options: {
      display: false,
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: "input",
      multiline: true
    }
  },
  {
    name: "avance",
    label: "Avance",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
      inputType: "number"
    }
  },
  {
    name: "fechaInicio",
    label: "Fecha Inicio",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "date",
    },
  },
  {
    name: "fechaFin",
    label: "Fecha Fin",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "date",
    },
  },
];
export default columns;
