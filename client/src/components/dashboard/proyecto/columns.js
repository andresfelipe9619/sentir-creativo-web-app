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
    name: 'formato',
    label: 'Formato',
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
    name: 'descripcion',
    label: 'Descripcion',
    options: {
      filter: true,
      sort: false
    },
    form: {
      size: 8,
      type: 'input',
      multiline: true
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
