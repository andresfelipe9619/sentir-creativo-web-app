import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import LockIcon from '@material-ui/icons/Lock'

export default function AccessDenied () {
  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      mt={8}
      fontSize={100}
      alignItems='center'
      justifyContent='center'
    >
      <LockIcon fontSize='inherit' />
      <Typography variant='h1' align='center'>Accesso Denegado</Typography>
    </Box>
  )
}
