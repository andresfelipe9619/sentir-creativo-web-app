import { Grid } from '@material-ui/core'
import React from 'react'
import MasterDetail, {
  customBodyRender
} from '../../master-detail/MasterDetail'

const columns = [
  {
    name: 'prefijo',
    label: 'Prefijo',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Prefijo'
    }
  },
  {
    name: 'nombre',
    label: 'Nombre',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'apellido',
    label: 'Apellido',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'celular',
    label: 'Celular',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'impacto',
    label: 'Impacto',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'input'
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
      dependency: 'AudienceState'
    }
  },
  {
    name: 'cargo',
    label: 'Cargo',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'departamento',
    label: 'Departamento',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
  {
    name: 'ciudad',
    label: 'Ciudad',
    options: {
      filter: true,
      sort: true
    },
    form: {
      size: 6,
      type: 'input'
    }
  },
    {
    name: 'antiguedad',
    label: 'Antiguedad',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Antiguedad',
    }
  },
    {
    name: 'cuponDescuento',
    label: 'Cupon Descuento',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'CuponDescuento',
    }
  },
    {
    name: 'cercania',
    label: 'Cercania',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Cercania',
    }
  },
    {
    name: 'origen',
    label: 'Origen',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Origen',
    }
  },
    {
    name: 'motivacion',
    label: 'Motivacion',
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender()
    },
    form: {
      size: 6,
      type: 'select',
      dependency: 'Motivacion',
    }
  },
  //   {
  //   name: 'proyectos',
  //   label: 'Proyectos',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Proyectos'
  //   }
  // },
  //   {
  //   name: 'bitacoras',
  //   label: 'Bitacoras',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Bitacora'
  //   }
  // },
  //   {
  //   name: 'notas',
  //   label: 'Notas',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Notas'
  //   }
  // },
  //   {
  //   name: 'comentarios',
  //   label: 'Comentarios',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Comentarios'
  //   }
  // },
  //   {
  //   name: 'intereses',
  //   label: 'Interes',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Interes'
  //   }
  // },
  //   {
  //   name: 'tags',
  //   label: 'Tags',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Tag'
  //   }
  // },
  //   {
  //   name: 'difusiones',
  //   label: 'Difusiones',
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  //   form: {
  //     size: 6,
  //     type: 'select',
  //     dependency: 'Difusion'
  //   }
  // },
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

export default function Audiencia () {
  const master = {
    columns,
    title: 'Audiencia'
  }
  const detail = {
    columns
  }
  return (
    <Grid item md={12}>
      <MasterDetail
        masterProps={master}
        detailProps={detail}
        service='Audiencia'
      />
    </Grid>
  )
}
