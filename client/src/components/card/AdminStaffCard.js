import React from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import StarIcon from '@material-ui/icons/Star'
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
function AdminStaffCard ({ staff }) {
  const {
    id,
    email,
    celular,
    estado,
    nombre,
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
  const history = useHistory()
  const rows = [
    createData('Edad', fechaNacimiento),
    createData('Nacionalidad', nacionalidad),
    createData('Rol', rol?.nombre),
    createData('Origen', origen?.nombre),
    createData('Cupón', cuponDescuento)
  ]

  const handleViewClick = () => {
    history.push(`/admin/audiencia/${id}`)
  }

  return (
    <AdminCard
      color={yellow}
      statusColor={estado?.color}
      chips={[email, celular]}
      status={estado?.nombre}
      title={nombre}
      avatar={photo}
      handleViewClick={handleViewClick}
      subheaderChip={organizacion?.nombre}
      superheader={prefijo?.nombre}
      subheader={tecnica_artisticas
        .slice(0, 3)
        .map(t => t.nombre)
        .join(' * ')}
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
            <AccountCircleIcon fontSize='large' style={{ color: '#1a72e5' }} />
          ),
          label: 'Google Contacts'
        },
        {
          icon: <WhatsAppIcon fontSize='large' style={{ color: '#25d366' }} />,
          label: 'Whatsapp'
        },
        {
          icon: <StarIcon fontSize='large' style={{ color: '#ffab00' }} />,
          label: 'Destacar'
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
