import React from 'react'
import Chip from '@material-ui/core/Chip'

export default function Tags ({ tags }) {
  return (tags || []).map(t => <Chip key={t.nombre} label={t.nombre} />)
}
