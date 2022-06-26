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

export const artistValues = {};

export const artistSchema = Yup.object().shape({
  nombre: Yup.string()
    .max(50, "Demasiado largo!")
    .required("¡Reflautillas! El nombre es requerido"),
  apellido: Yup.string()
    .max(50, "Demasiado largo!")
    .required("¡Reflautillas! El apellido es requerido"),
  nacionalidad: Yup.string().required("¡Reflautillas! La nacionalidad es requerido"),
  oficio: Yup.string().required("¡Reflautillas! El oficio o profesión es requerido"),
  ciudad: Yup.string().required("¡Reflautillas! La ciudad es requerido"),
  reunion: Yup.string().required("¡Reflautillas! Este campo es requerido"),
  email: Yup.string()
    .email("¡Reflautillas! Un email correcto por favor.")
    .required("¡Reflautillas! Un email es requerido"),
});

export const artist2Values = {
  accept1: false,
  accept2: false,
  accept3: false,
  accept4: false,
  id: '',
  email: '',
  nombreCoupon: '',
  area: {},
  servicioNombre: '',
  slogan: '',
  sintesis: '',
  trayectoria: '',
  formato: [],
  tecnicasArtisticas: [],
  tags: [],
  cantidadArtistas: '',
  cantidadArtistasApoyo: '',
  duracionMinima: 1800000,
  duracionMaxima: 1800000,
  sesionesMinimo: '',
  sesionesMaximas: '',
  duracionMontaje: 1800000,
  duracionDesmontaje: 1800000,
  publicoObjetivo: [],
  minimoParticipantes: '',
  maximoParticipantes: '',
  ocasiones: [],
  archivos: [],
  storagesDeeps: {},
  staffName: ''
};

export const artist2Schema = Yup.object().shape({
  id: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  nombreCoupon: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  servicioNombre: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  slogan: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  sintesis: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  formato: Yup.array()
    .required("¡Reflautillas! Este campo es requerido"),
  cantidadArtistas: Yup.number()
    .required("¡Reflautillas! Este campo es requerido"),
  cantidadArtistasApoyo: Yup.number()
    .required("¡Reflautillas! Este campo es requerido"),
  email: Yup.string()
    .email("¡Reflautillas! Un email correcto por favor.")
    .required("¡Reflautillas! Este campo es requerido"),
  tecnicasArtisticas: Yup.array().required("¡Reflautillas! Este campo es requerido"),
  tags: Yup.array().required("¡Reflautillas! Este campo es requerido"),
  duracionMinima: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  duracionMaxima: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  sesionesMinimo: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  sesionesMaximas: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  duracionMontaje: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  duracionDesmontaje: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  publicoObjetivo: Yup.array().required("¡Reflautillas! Este campo es requerido"),
  minimoParticipantes: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  maximoParticipantes: Yup.string()
    .required("¡Reflautillas! Este campo es requerido"),
  ocasiones: Yup.array().required("¡Reflautillas! Este campo es requerido"),
  masFavorable: Yup.number()
    .integer("¡Reflautillas! Este campo debe ser numerico")
    .required("¡Reflautillas! Este campo es requerido"),
  medianas: Yup.number()
    .integer("¡Reflautillas! Este campo debe ser numerico")
    .required("¡Reflautillas! Este campo es requerido"),
  menosFavorable: Yup.number()
    .integer("¡Reflautillas! Este campo debe ser numerico")
    .required("¡Reflautillas! Este campo es requerido")
});

export const artistExperienceColumns = [
  {
    name: "id",
    label: "Id Staff",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 2,
      required: true,
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
      required: true,
      type: "input",
    },
  },
  {
    name: "nombreCoupon",
    label: "Código",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 2,
      required: true,
      type: "input",
    },
  }
];

export const serviceIdentificationColumns = [
  {
    name: "servicioNombre",
    label: "Nombre de experiencia",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      required: true,
      type: "input",
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
      required: true,
      type: "input",
    },
  },
  {
    name: "sintesis",
    label: "Sintesis",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 12,
      required: true,
      type: "input",
      multiline: true
    },
  },
  {
    name: "trayectoria",
    label: "Trayectoria",
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: "select",
      required: true,
      dependency: 'Trayectoria'
    },
  },
  {
    name: "formato",
    label: "Formato(s) disponible(s)",
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'Formato'
    },
  },
];

export const artistsTechColumns = [
  {
    name: "tecnicasArtisticas",
    label: "Técnica(s) artística(s) presentes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'TecnicaArtistica'
    },
  },
  {
    name: "tags",
    label: "Tags o palabras claves",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      required: true,
      dependency: 'Tag'
    },
  },
  {
    name: "cantidadArtistas",
    label: "Cantidad de Artistas en ejecución",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      required: true
    },
  },
  {
    name: "cantidadArtistasApoyo",
    label: "Cantidad de Artistas de apoyo",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      required: true
    },
  }
];

export const artistsTech2Columns = [
  {
    name: "duracionMinima",
    label: "Duración mínima (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "duracionMaxima",
    label: "Duración máxima (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "sesionesMinimo",
    label: "Sesiones mínima (cantidad)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input"
    },
  },
  {
    name: "sesionesMaximas",
    label: "Sesiones máxima (cantidad)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input"
    },
  },
  {
    name: "duracionMontaje",
    label: "Duración en montaje (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  },
  {
    name: "duracionDesmontaje",
    label: "Duración en desmontaje (minutos)",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "select",
      dependency: 'horarios',
      required: true
    },
  }
];

export const beneficiariosColumns = [
  {
    name: "publicoObjetivo",
    label: "Público Objetivo",
    options: {
      filter: false,
      sort: false
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "PublicoObjetivo"
    },
  },
  {
    name: "minimoParticipantes",
    label: "Cantidad mínima de participantes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      multiline: true
    },
  },
  {
    name: "maximoParticipantes",
    label: "Cantidad máxima de participantes",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "input",
      multiline: true
    },
  },
  {
    name: "ocasiones",
    label: "¿En qué ocasiones?",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Ocasion"
    },
  }
];
