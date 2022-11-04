import { customBodyRender } from "../../master-detail/MasterDetail";

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      sort: true,
    },
    form: {
      size: 0,
      type: "id",
    },
  },
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
    name: "apellido",
    label: "Apellido",
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
    name: "created_at",
    label: "Fecha Creacion",
    options: {
      display: true,
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "date",
    },
  },
  {
    name: "estado",
    label: "Estado",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "AudienceState",
    },
  },
  {
    name: "organizacion",
    label: "Organización",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Organizacion",
    },
  },
  {
    name: "celular",
    label: "Celular",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      required: true,
      inputType: "email",
    },
  },
  {
    name: "email2",
    label: "Email 2",
    options: {
      display: false,
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
    name: "ciudad",
    label: "Ciudad",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "city",
    },
  },
  {
    name: "documentoIdentidad",
    label: "Documento de Identidad",
    options: {
      display: false,
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "profesion",
    label: "Profesion",
    options: {
      display: false,
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "impacto",
    label: "Impacto",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "cargo",
    label: "Cargo",
    options: {
      display: false,
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "departamento",
    label: "Departamento",
    options: {
      display: false,
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
    },
  },
  {
    name: "antiguedad",
    label: "Antiguedad",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Antiguedad",
    },
  },
  {
    name: "cercania",
    label: "Cercania",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Cercania",
    },
  },
  {
    name: "difusiones",
    label: "Difusiones",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Difusion",
    },
  },
  {
    name: "cuponDescuento",
    label: "Cupones Descuentos",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "CuponDescuento",
    },
  },
  {
    name: "origen",
    label: "Origen",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Origen",
    },
  },
  {
    name: "motivacion",
    label: "Motivacion",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Motivacion",
    },
  },
  {
    name: "tags",
    label: "Tags",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "tag",
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
  {
    name: "prefijo",
    label: "Prefijo",
    options: {
      display: false,
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 2,
      type: "select",
      dependency: "Prefijo",
    },
  },
];

export default columns;
