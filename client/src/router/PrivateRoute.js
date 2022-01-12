import React from 'react'
import { Route } from 'react-router-dom'
import AccessDenied from './AccessDenied'

export default function PrivateRoute (route) {
  let show = true
  let token = sessionStorage.getItem('colibri-token')
  if (route.private) show = !!token
  return show ? (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  ) : (
    <AccessDenied />
  )
}
