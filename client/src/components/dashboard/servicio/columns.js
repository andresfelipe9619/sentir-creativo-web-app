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
      type: "input",
    },
  },
  {
    name: "minimoParticipantes",
    label: "Mínimo Participantes",
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
    name: "maximoParticipantes",
    label: "Máximo Participantes",
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
    name: "slogan",
    label: "Slogan",
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
    name: "sintesis",
    label: "Sintesis",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "input",
      multiline: true,
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
      dependency: "ServiceState",
    },
  },
  {
    name: "area",
    label: "Area",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Area",
    },
  },
  {
    name: "prioridad",
    label: "Prioridad",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Prioridad",
    },
  },
  {
    name: "formatos",
    label: "Formatos",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Formato",
    },
  },
  {
    name: "acuerdos",
    label: "Acuerdos",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Acuerdo",
    },
  },
  {
    name: "tags",
    label: "Tags",
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Tag",
    },
  },

  {
    name: "tecnica_artisticas",
    label: "Técnicas Artísticas",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "TecnicaArtistica",
    },
  },
  {
    name: "ocasions",
    label: "Ocasiones",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Ocasion",
    },
  },
  {
    name: "condiciones",
    label: "Condiciones",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Condicion",
    },
  },
  {
    name: "sugerencias",
    label: "Sugerencias",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Sugerencia",
    },
  },
  {
    name: "propositos",
    label: "Propositos",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Proposito",
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
    name: "proyectos",
    label: "Proyectos",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Proyecto",
    },
  },
  {
    name: "colecciones",
    label: "Colecciones",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Coleccion",
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
      size: 6,
      type: "file",
    },
  },
];

export default columns;
