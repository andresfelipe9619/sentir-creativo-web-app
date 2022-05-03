import * as Yup from "yup";
import { customBodyRender } from "../master-detail/MasterDetail";

export const columns = (showOrganization) => [
  {
    name: "prefijo",
    label: "Prefijo",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 2,
      type: "select",
      required: true,
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
      required: true,
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
      required: true,
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
      type: "phone",
    },
  },
  {
    name: "coupon",
    label: "Cupón",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  ...(showOrganization
    ? [
        {
          name: "organizacion",
          label: "Organización",
          options: {
            filter: true,
            sort: true,
          },
          form: {
            size: 6,
            type: "input",
            required: true,
          },
        },
        {
          name: "rubro",
          label: "Rubro",
          options: {
            filter: true,
            sort: true,
          },
          form: {
            size: 6,
            type: "select",
            required: true,
            visibleWith: "organizacion",
            dependency: "Rubro",
          },
        },
      ]
    : []),
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
      required: true,
    },
  },
  {
    name: "comentario",
    label: "Comentarios",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 12,
      type: "input",
      multiline: true,
      rows: 6,
    },
  },
];

export const horarioAgendaColumns = [
  {
    name: "fechaInicio",
    label: "Fecha de ejecución",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "date"
    },
  },
  {
    name: "fechaFin",
    label: "¿Tiempo disponible para la experiencia?",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "select",
      dependency: 'horarios'
    },
  },
];

export const dossierValues = {
  nombre: "",
  apellido: "",
  email: "",
  celular: "",
  comentario: "",
  prefijo: "",
  ciudad: "",
};

export const serviceValues = {
  ...dossierValues,
  organizacion: "",
  rubro: "",
  publicoObjetivo: [],
  formato: "",
  impacto: "",
  departamento: "",
};

const contactSchema = {
  nombre: Yup.string()
    .max(50, "Demasiado largo!")
    .required("¡Reflautillas! El nombre es requerido"),
  apellido: Yup.string()
    .max(50, "Demasiado largo!")
    .required("¡Reflautillas! El apellido es requerido"),
  ciudad: Yup.string().required("¡Reflautillas! La ciudad es requerido"),
  email: Yup.string()
    .email("¡Reflautillas! Un email correcto por favor.")
    .required("¡Reflautillas! Un email es requerido"),
};

export const serviceSchema = Yup.object().shape({
  ...contactSchema,
  impacto: Yup.number().required(
    "¡Reflautillas! El # de personas es requerido"
  ),
  formato: Yup.number().required("¡Reflautillas! El formato es requerido"),
  publicoObjetivo: Yup.array().required(
    "¡Reflautillas! Almenos un publico objetivo  es requerido"
  ),
});

export const dossiersSchema = Yup.object().shape(contactSchema);
