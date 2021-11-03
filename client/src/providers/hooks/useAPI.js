import { useCallback, useEffect, useState } from 'react'
import API from '../../api'

export default function useAPI (service, map = false) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const init = useCallback(async () => {
    try {
      let result = await API[service].getAll()
      if (map) {
        result = result
          .map(({ id, nombre }) => ({
            value: id,
            label: nombre
          }))
          .filter(i => i.label)
      }
      setData(result || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [service, map])

  useEffect(() => {
    init()
  }, [init])

  return { data, loading, init }
}
