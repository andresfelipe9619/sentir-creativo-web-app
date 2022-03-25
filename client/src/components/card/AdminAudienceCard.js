import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import StarIcon from '@material-ui/icons/Star'
import PhoneIcon from '@mui/icons-material/Phone';
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import yellow from '@material-ui/core/colors/yellow'
import AdminCard, { Stat, DenseTable, createData } from './AdminCard'
import { useHistory } from 'react-router-dom'
import { indigo } from '@material-ui/core/colors'
import RowingIcon from '@material-ui/icons/Rowing'
import useStyles from './styles'

export default function Card(props) {
  if (!props.audience) return null
  return <AdminAudienceCard {...props} />
}

function sliceItems(collection = []) {
  if (!collection) {
    return collection
  }

  if (collection?.length > 2) {
    const others = collection.slice(2).length
    return collection?.slice(0, 2).join(', ') + `, +${others}`
  }

  return collection.join(', ')
}

function AdminAudienceCard ({ audience }) {
  const {
    id,
    email,
    email2,
    estado,
    nombre,
    apellido,
    photo,
    cargo,
    origen,
    cercania,
    ciudad,
    prefijo,
    proyectos,
    organizacion,
    motivacion,
    departamento,
    antiguedad,
    celular,
    cuponDescuento
  } = audience

  const archivoGoogleContact = audience.archivos.filter(a => a.tipo_archivo === 25);
  const archivoGoogleContactUrl = archivoGoogleContact.length > 0 ? archivoGoogleContact[0].path : null;
  const disableGoogleContact = archivoGoogleContactUrl === null;
  const colorGoogleContact = disableGoogleContact ? "#1a72e580" : ' #1a72e5';

  const classes = useStyles()
  const history = useHistory()
  const rows = [
    createData('Antigüedad', antiguedad?.nombre),
    createData('Cercanía', cercania?.nombre),
    createData('Motivación', motivacion?.nombre),
    createData('Origen', origen?.nombre),
    createData('Ciudad', ciudad),
    createData('Cupón', sliceItems(cuponDescuento?.map(x => x?.codigo)))
  ]

  const handleViewClick = () => {
    history.push(`/admin/audiencia/${id}`)
  }

  return (
    <AdminCard
      id={id}
      color={yellow}
      statusColor={estado?.color}
      chips={[email, email2, celular]}
      status={estado?.nombre}
      title={nombre + ' ' + apellido}
      avatar={photo}
      handleViewClick={handleViewClick}
      subheaderChip={(
        <Typography display='inline' variant='caption' className={classes.accentText}
          onClick={() => history.push('/admin/organizaciones/' + organizacion?.id)}>
          {organizacion?.nombre}
        </Typography>
      )}
      superheader={prefijo?.nombre}
      subheader={`${cargo} - ${departamento}`}
      floatingHeader={{
        color: indigo[800],
        icon: RowingIcon,
        label: 'Audiencia',
        score: getRandomArbitrary(1, 7)
      }}
      renderContent={() => (
        <Grid container item md={12} spacing={3}>
          <Stat
            label={'Nuevos\n Tickets'}
            value={countState(proyectos, 1)}
            color={orange[800]}
          />
          <Stat
            label={'Proyectos\n Activos'}
            value={countState(proyectos, 4)}
            color={green['A700']}
          />
          <Stat
            label={'Proyectos\n Terminados'}
            value={countState(proyectos, 7)}
            color={grey[700]}
          />
        </Grid>
      )}
      renderHighlights={() => (
        <DenseTable rows={rows} nombre={nombre} color={yellow} />
      )}
      buttonActions={[
        {
          icon: (
            <AccountCircleIcon fontSize='large' style={{ color: colorGoogleContact }} />
          ),
          label: 'Google Contacts',
          disabled: disableGoogleContact,
          handleClick: () => {
            if (disableGoogleContact) return
            window.open('https://contacts.google.com/person/'+archivoGoogleContactUrl, '_blank')
          }
        },
        {
          icon: <WhatsAppIcon fontSize='large' style={{ color: '#25d366' }} />,
          label: 'Whatsapp',
          handleClick: () => {
            window.open("https://wa.me/" + celular, '_blank');
          }
        },
        {
          icon: <StarIcon fontSize='large' style={{ color: '#ffab00' }} />,
          label: 'Destacar'
        },
        {
          icon: <PhoneIcon fontSize='large' style={{ color: 'black' }} />,
          label: 'Llamar',
          url: 'tel:' + celular
        }
      ]}
    />
  )
}

function getRandomArbitrary(min, max) {
  let number = Math.random() * (max - min) + min
  return +number.toFixed(1)
}

function countState(items, id) {
  return items.filter(p => p?.estado_proyecto === id).length
}
