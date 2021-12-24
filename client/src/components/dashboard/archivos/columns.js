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
    name: 'path',
    label: 'Path',
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
    name: 'updated_at',
    label: 'Última Actualización',
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
    name: 'created_at',
    label: 'Creado el',
    options: {
      filter: true,
      sort: false,
      type: 'array'
    },
    form: {
      size: 4,
      type: 'date'
    }
  }
]

export default columns
