import { customBodyRender } from "../../master-detail/MasterDetail";

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
    },
  },
  {
    name: "path",
    label: "Path",
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
    name: "tipo_archivo",
    label: "Tipo Archivo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      required: true,
      dependency: "TipoArchivo",
    },
  },
  {
    name: "updated_at",
    label: "Última Actualización",
    options: {
      filter: true,
      sort: false,
    },
    form: {
      size: 4,
      type: "date",
    },
  },

  {
    name: "created_at",
    label: "Creado el",
    options: {
      filter: true,
      sort: false,
      type: "array",
    },
    form: {
      size: 4,
      type: "date",
    },
  },
];

export default columns;
