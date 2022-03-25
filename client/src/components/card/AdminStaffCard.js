import React from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import StarIcon from '@material-ui/icons/Star'
import PhoneIcon from '@mui/icons-material/Phone';
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import yellow from '@material-ui/core/colors/yellow'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import AdminCard, { Stat, DenseTable, createData } from './AdminCard'
import { useHistory } from 'react-router-dom'
import { brown } from '@material-ui/core/colors'

export default function Card (props) {
  if (!props.staff) return null
  return <AdminStaffCard {...props} />
}

const getAge = birthDate => {
  if (!birthDate) return 'N/A'
  return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10)
}

function AdminStaffCard ({ staff }) {
  const {
    id,
    email,
    celular,
    estado,
    nombre,
    apellido,
    photo,
    origen,
    rol,
    prefijo,
    nacionalidad,
    proyectos,
    organizacion,
    fechaNacimiento,
    cuponDescuento,
    tecnica_artisticas
  } = staff

  const archivoGoogleContact = staff.archivos.filter(a => a.tipo_archivo === 25);
  const archivoGoogleContactUrl = archivoGoogleContact.length > 0 ? archivoGoogleContact[0].path : null;
  const disableGoogleContact = archivoGoogleContactUrl === null;
  const colorGoogleContact = disableGoogleContact ? "#1a72e580" : ' #1a72e5';


  const history = useHistory()
  const rows = [
    createData('Edad', getAge(fechaNacimiento)),
    createData('Nacionalidad', nacionalidad),
    createData('Rol', rol?.nombre),
    createData('Origen', origen?.nombre),
    createData('Cupón', cuponDescuento?.codigo)
  ]

  const handleViewClick = () => {
    history.push(`/admin/staff/${id}`)
  }

  return (
    <AdminCard
      id={id}
      color={yellow}
      statusColor={estado?.color}
      chips={[email, celular]}
      status={estado?.nombre}
      title={nombre + ' ' + apellido}
      avatar={photo}
      handleViewClick={handleViewClick}
      subheaderChip={organizacion?.nombre}
      superheader={prefijo?.nombre}
      subheader={tecnica_artisticas
        .slice(0, 3)
        .map(t => t.nombre)
        .join(' • ')}
      floatingHeader={{
        color: brown[600],
        icon: EmojiPeopleIcon,
        label: 'STAFF',
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
            <AccountCircleIcon fontSize='large' style={{ width:'0.88em', color: colorGoogleContact }} />
          ),
          label: 'Google Contacts',
          disabled: disableGoogleContact,
          handleClick: () => {
            if (disableGoogleContact) return
            window.open('https://contacts.google.com/person/'+archivoGoogleContactUrl, '_blank')
          }
        },
        {
          icon: <WhatsAppIcon fontSize='large' style={{ width:'0.88em', color: '#25d366' }} />,
          label: 'Whatsapp',
          handleClick: () => {
            window.open("https://wa.me/" + celular, '_blank');
          }
        },
        {
          icon: <StarIcon fontSize='large' style={{ width:'0.88em', color: '#ffab00' }} />,
          label: 'Destacar'
        },
        {
          icon: <PhoneIcon fontSize='large' style={{ width:'0.88em', color: 'black' }} />,
          label: 'Llamar',
          url: 'tel:' + celular
        }
      ]}
    />
  )
}

function getRandomArbitrary (min, max) {
  let number = Math.random() * (max - min) + min
  return +number.toFixed(1)
}

function countState (items, id) {
  return items.filter(p => p?.estado_proyecto === id).length
}
