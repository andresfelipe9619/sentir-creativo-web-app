import React, { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router'
import API from '../../api'
import Spinner from '../spinner/Spinner'

export default function AreaDetail () {
  const [area, setArea] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const init = useCallback(async () => {
    try {
      let result = await API.Area.get(id)
      setArea(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [id])
  useEffect(() => {
    init()
    //eslint-disable-next-line
  }, [])
  if (loading) return <Spinner />

  return <div></div>
}
