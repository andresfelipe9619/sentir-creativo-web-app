import React from 'react'
import Chip from '@material-ui/core/Chip'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

export default function Tags ({ tags, title }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {!!title && <FormLabel component='legend'>{title}</FormLabel>}
      {(tags || []).map(t => (
        <Chip key={t.nombre} label={t.nombre} />
      ))}
    </div>
  )
}
