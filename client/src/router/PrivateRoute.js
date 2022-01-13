import React from 'react'
import { Route } from 'react-router-dom'
import { useUserState } from '../providers/context/User'
import AccessDenied from './AccessDenied'

export default function PrivateRoute (route) {
  let show = true
  const user = useUserState()
  if (route.private) show = !!user
  return show ? (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  ) : (
    <AccessDenied />
  )
}
