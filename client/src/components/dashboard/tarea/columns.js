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
    name: "duracion",
    label: "Duración (horas)",
    options: {
      display: false,
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: "input",
      inputType: "number"
    }
  },
  {
    name: "direccion",
    label: "Dirección",
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
  {
    name: "estado_tarea",
    label: "Estado",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "EstadoTarea",
    },
  },
  {
    name: "tipo_tarea",
    label: "Tipo",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "TipoTarea",
    },
  },
  {
    name: "sprint",
    label: "Sprint",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Sprint",
    },
  },
  {
    name: "prioridad",
    label: "Prioridad",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Prioridad",
    },
  },
  {
    name: "proyecto",
    label: "Proyecto",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      required: true,
      dependency: "Proyecto"
    },
  },
  {
    name: "stafs",
    label: "Staff",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Staf",
    },
  },
  {
    name: "archivos",
    label: "Archivos",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "file",
    },
  },
  {
    name: "bitacoras",
    label: "Bitácoras",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "bitacora",
    },
  }
];
export default columns;
