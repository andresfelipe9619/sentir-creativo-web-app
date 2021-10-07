import React from 'react'
import CheckboxesGroup from '../checkbox'
import Spinner from '../spinner/Spinner'
import useAPI from '../../providers/hooks/useAPI'

export default function PublicoObjetivo () {
  const { data, loading } = useAPI('TargetAudience', true)
  if (loading) return <Spinner />
  return <CheckboxesGroup legend='' options={data} />
}
