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
    name: 'formato',
    label: 'Formato',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Formato'
    }
  },
  {
    name: 'estado_proyecto',
    label: 'Estado',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'EstadoProyecto'
    }
  },
  {
    name: 'fechaInicio',
    label: 'Fecha Inicio',
    options: {
      filter: true,
      sort: false
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
      sort: false
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
