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
    name: "impacto",
    label: "Impacto",
    options: {
      filter: true,
      sort: false,
    },
    form: {
      size: 4,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "avance",
    label: "Avance",
    options: {
      filter: true,
      sort: false,
    },
    form: {
      size: 4,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "tipo_proyecto",
    label: "Tipo Proyecto",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "select",
      dependency: "TipoProyecto",
    },
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
    name: "descripcion",
    label: "Descripcion",
    options: {
      display: false,
      filter: true,
      sort: false,
    },
    form: {
      size: 8,
      type: "input",
      multiline: true,
    },
  },
  {
    name: "cupon_descuentos",
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
    name: "ciudad",
    label: "Ciudad",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 12,
      type: "city",
    },
  },
  {
    name: "formatos",
    label: "Formatos",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Formato",
    },
  },
  {
    name: "estado_proyecto",
    label: "Estado",
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "EstadoProyecto",
    },
  },
  {
    name: "audiencia",
    label: "Audiencia",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "select",
      renderLabel: (i) => `${i.nombre} • ${i?.organizacion?.nombre || ""}`,
      dependency: "Audiencia",
    },
  },
  {
    name: "staf",
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
    name: "servicios",
    label: "Servicios",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Servicio",
    },
  },
  {
    name: "publico_objetivos",
    label: "Público Objetivo",
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "PublicoObjetivo",
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
    name: "comentarios",
    label: "Comentarios",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "comments",
    },
  },
];
export default columns;
