import React from 'react'
import AdminAudienceCard from '../../card/AdminAudienceCard'
import MasterDetail, {
  customBodyRender
} from '../../master-detail/MasterDetail'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
// import ReactList from 'react-list'
// import LazyLoading from 'react-list-lazy-load'
// import { useState } from 'react'

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
      dependency: 'Antiguedad'
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
      dependency: 'CuponDescuento'
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
      dependency: 'Cercania'
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
      dependency: 'Origen'
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
      dependency: 'Motivacion'
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

// const randBetween = (min, max) => Math.floor(min + Math.random() * (max - min))

function useResponsiveCard () {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const length = isSmall ? 1 : isMedium ? 2 : 3

  return length
}

export default function Audiencia () {
  const master = {
    columns,
    title: 'Audiencia'
  }
  const detail = {
    columns
  }
  const length = useResponsiveCard()

  return (
    <Grid item md={12}>
      <MasterDetail
        toggle
        renderMaster={({ data }) => (
          <Grid item container md={12}>
            {data.map(a => (
              <Grid item key={a.id} md={12 / length}>
                <AdminAudienceCard audience={a} />
              </Grid>
            ))}
          </Grid>
        )}
        masterProps={master}
        detailProps={detail}
        service='Audiencia'
      />
    </Grid>
  )
}

// function LazyCards ({ data, pageSize = 10 }) {
//   const length = useResponsiveCard()
//   const [items, setItems] = useState()
//   // Simulate a network request for `limit` items
//   const lazyFetch = (page, cb) => {
//     setTimeout(() => {
//       // Generate a new page of items
//       // let data = cb(data.slice())
//     }, randBetween(250, 1250))
//   }

//   const handleRequestPage = (page, cb) => {
//     // Simulate a network request or other async operation
//     lazyFetch(page, data => {
//       // Merge the new page into the current `items` collection and rerender
//       // this.setState({
//       //   items: mergePage(this.state.items, data, page * pageSize)
//       // })

//       // Tell LazyList that the page was loaded
//       cb()
//     })
//   }

//   return (
//     <Grid item container md={12}>
//       <LazyLoading
//         pageSize={pageSize}
//         length={data.length}
//         items={data.slice(0, 10)}
//         onRequestPage={handleRequestPage}
//       >
//         <ReactList
//           itemRenderer={(idx, key) =>
//             // If `items[index] == null`, the page is still being loaded.
//             data[idx] != null ? (
//               <Grid key={idx} item md={12 / length}>
//                 <AdminAudienceCard audience={data[idx]} />
//               </Grid>
//             ) : (
//               <div key={key}>Loading …</div>
//             )
//           }
//           type='uniform'
//           length={data.length}
//         />
//       </LazyLoading>
//     </Grid>
//   )
// }

// function mergePage (items, newItems, offset) {
//   const merged = items.slice()
//   newItems.forEach((item, idx) => {
//     merged[idx + offset] = item
//   })
//   return merged
// }
