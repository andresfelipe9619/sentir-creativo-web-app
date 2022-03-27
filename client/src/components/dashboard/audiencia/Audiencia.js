import React from "react";
import AdminAudienceCard from "../../card/AdminAudienceCard";
import MasterDetail, {
  customBodyRender,
} from "../../master-detail/MasterDetail";
import Grid from "@material-ui/core/Grid";
// import ReactList from 'react-list'
// import LazyLoading from 'react-list-lazy-load'
// import { useState } from 'react'
import useResponsiveCard from "../../../providers/hooks/useResponsiveCard";

const columns = [
  {
    name: "prefijo",
    label: "Prefijo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 2,
      type: "select",
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
      inputType: "email",
    },
  },
  {
    name: "email2",
    label: "Email 2",
    options: {
      filter: true,
      sort: true,
    },
    form: {
      size: 4,
      type: "input",
      inputType: "email",
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
      type: "input",
      inputType: "tel",
    },
  },
  {
    name: "profesion",
    label: "Profesion",
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
    name: "impacto",
    label: "Impacto",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "input",
    },
  },
  {
    name: "cargo",
    label: "Cargo",
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
    name: "departamento",
    label: "Departamento",
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
    name: "ciudad",
    label: "Ciudad",
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
    name: "organizacion",
    label: "Organización",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Organizacion",
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
      dependency: "AudienceState",
    },
  },
  {
    name: "antiguedad",
    label: "Antiguedad",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Antiguedad",
    },
  },
  {
    name: "difusiones",
    label: "Difusiones",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "multiselect",
      dependency: "Difusion",
    },
  },
  {
    name: "cuponDescuento",
    label: "Cupones Descuentos",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 4,
      type: "multiselect",
      dependency: "CuponDescuento",
    },
  },
  {
    name: "cercania",
    label: "Cercania",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Cercania",
    },
  },
  {
    name: "origen",
    label: "Origen",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Origen",
    },
  },
  {
    name: "motivacion",
    label: "Motivacion",
    options: {
      filter: true,
      sort: true,
      customBodyRender: customBodyRender(),
    },
    form: {
      size: 6,
      type: "select",
      dependency: "Motivacion",
    },
  },
  {
    name: "tags",
    label: "Tags",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "tag",
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
      size: 12,
      type: "file",
    },
  },
  {
    name: "bitacoras",
    label: "Bitácoras",
    options: {
      display: false,
      filter: false,
      sort: false,
    },
    form: {
      size: 12,
      type: "bitacora",
    },
  },
];

export default function Audiencia() {
  const master = {
    columns,
    title: "Audiencia",
  };
  const detail = {
    columns,
  };
  const length = useResponsiveCard();

  return (
    <Grid item md={12}>
      <MasterDetail
        toggle
        renderMaster={({ data }) => (
          <Grid item container md={12}>
            {data.map((a) => (
              <Grid item key={a.id} xs={12 / length} md={4} xl={3}>
                <AdminAudienceCard audience={a} />
              </Grid>
            ))}
          </Grid>
        )}
        masterProps={master}
        detailProps={detail}
        service="Audiencia"
      />
    </Grid>
  );
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
