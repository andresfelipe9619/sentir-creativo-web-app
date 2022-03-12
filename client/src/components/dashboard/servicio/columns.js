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
    name: 'slogan',
    label: 'Slogan',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 8,
      type: 'input'
    }
  },
  {
    name: 'sintesis',
    label: 'Sintesis',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'input',
      multiline: true
    }
  },
  {
    name: 'estado',
    label: 'Estado',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'ServiceState'
    }
  },
  {
    name: 'formatos',
    label: 'Formatos',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'multiselect',
      dependency: 'Formato'
    }
  },
  {
    name: 'tags',
    label: 'Tags',
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },

  {
    name: 'tecnica_artisticas',
    label: 'Técnicas Artísticas',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },
  {
    name: 'ocasions',
    label: 'Ocasiones',
    options: {
      display: false,
      filter: false,
      sort: false
    },
    form: {
      size: 12,
      type: 'tag'
    }
  },
  {
    name: 'publico_objetivos',
    label: 'Público Objetivo',
    options: {
      filter: false,
      sort: false,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 12,
      type: 'tag'
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
