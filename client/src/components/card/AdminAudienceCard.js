import React from 'react'
import AdminCard from './AdminCard'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import StarIcon from '@material-ui/icons/Star'
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import yellow from '@material-ui/core/colors/yellow'
import { withStyles } from '@material-ui/core'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'

export default function AdminAudienceCard ({ audience }) {
  if (!audience) return null
  const {
    email,
    email2,
    estado,
    nombre,
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
    antiguedad
  } = audience
  const rows = [
    createData('Antigüedad', antiguedad?.nombre),
    createData('Cercanía', cercania?.nombre),
    createData('Motivación', motivacion?.nombre),
    createData('Origen', origen?.nombre),
    createData('Ciudad', ciudad)
  ]

  return (
    <AdminCard
      color={yellow}
      statusColor={estado?.color}
      chips={[email, email2]}
      status={estado?.nombre}
      title={nombre}
      avatar={photo}
      subheaderChip={organizacion?.nombre}
      superheader={prefijo?.nombre}
      subheader={`${cargo} - ${departamento}`}
      floatingHeader={{
        icon: EmojiPeopleIcon,
        label: 'Audiencia',
        score: 6.5
      }}
      renderContent={() => (
        <Grid container item md={12} spacing={3}>
          <Stat
            label={'Nuevos\n Tickets'}
            value={proyectos.length}
            color={orange[800]}
          />
          <Stat
            label={'Proyectos Activos'}
            value={proyectos.length}
            color={green['A700']}
          />
          <Stat
            label={'Proyectos Terminados'}
            value={proyectos.length}
            color={grey[700]}
          />
        </Grid>
      )}
      renderHighlights={() => (
        <DenseTable rows={rows} nombre={nombre} color={yellow} />
      )}
      buttonActions={[
        {
          icon: <AccountCircleIcon fontSize='large' />,
          label: 'Google Contacts'
        },
        { icon: <WhatsAppIcon fontSize='large' />, label: 'Whatsapp' },
        { icon: <StarIcon fontSize='large' />, label: 'Destacar' }
      ]}
    />
  )
}

function Stat ({ label, value, color }) {
  return (
    <Grid
      item
      md={4}
      container
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Typography align='center' variant='caption'>
        {label}
      </Typography>
      <Box
        my={1}
        display='flex'
        borderRadius='50%'
        color='white'
        width={50}
        height={50}
        justifyContent='center'
        alignItems='center'
        bgcolor={color}
      >
        {value}
      </Box>
    </Grid>
  )
}

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: props => props.color
    }
  }
}))(TableRow)

function DenseTable ({ nombre, rows, color }) {
  return (
    <Box p={1} my={2}>
      <TableContainer>
        <Table aria-label={`${nombre} highlights`} size='small'>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.label} color={color[50]}>
                <TableCell component='th' scope='row'>
                  {row.label}
                </TableCell>
                <TableCell align='right'>{row.value}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

function createData (label, value) {
  return { label, value }
}
