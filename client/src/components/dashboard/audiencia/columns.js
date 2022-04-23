import { customBodyRender } from "../../master-detail/MasterDetail";

const columns = [
  {
    name: "prefijo",
    label: "Prefijo",
    options: {
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
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 5,
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
      size: 5,
      type: "input",
    },
  },
  {
    name: "documentoIdentidad",
    label: "Documento de Identidad",
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
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
      required: true,
      inputType: "email",
    },
  },
  {
    name: "email2",
    label: "Email 2",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
      inputType: "email",
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
      size: 4,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "profesion",
    label: "Profesion",
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
    name: "impacto",
    label: "Impacto",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "input",
      inputType: "number",
    },
  },
  {
    name: "cargo",
    label: "Cargo",
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
    name: "departamento",
    label: "Departamento",
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
    name: "ciudad",
    label: "Ciudad",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 12,
      type: "city",
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
    name: "estado",
    label: "Estado",
    options: {
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
    name: "antiguedad",
    label: "Antiguedad",
    options: {
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
    name: "origen",
    label: "Origen",
    options: {
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
];

export default columns;
