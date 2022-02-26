import { customBodyRender } from '../../master-detail/MasterDetail'

const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
  {
    name: 'impacto',
    label: 'Impacto',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
  {
    name: 'avance',
    label: 'Avance',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 4,
      type: 'input'
    }
  },
  {
    name: 'formatos',
    label: 'Formatos',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'multiselect',
      dependency: 'Formato'
    }
  },
  {
    name: 'estado_proyecto',
    label: 'Estado',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'EstadoProyecto'
    }
  },
  {
    name: 'tipo_proyecto',
    label: 'Tipo Proyecto',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'TipoProyecto'
    }
  },
  {
    name: 'fechaInicio',
    label: 'Fecha Inicio',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 4,
      type: 'date'
    }
  },
  {
    name: 'fechaFin',
    label: 'Fecha Fin',
    options: {
      filter: true,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 4,
      type: 'date'
    }
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    options: {
      display: false,
      filter: true,
      sort: false
    },
    form: {
      size: 10,
      type: 'input',
      multiline: true
    }
  },
  {
    name: 'archivos',
    label: 'Archivos',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'file'
    }
  }
]
export default columns
