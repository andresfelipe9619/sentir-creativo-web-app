import React from 'react'
import { Route } from 'react-router-dom'
import API from '../api'
import AccessDenied from './AccessDenied'

export default function PrivateRoute (route) {
  let show = true
  const token = API.getToken()
  console.log('Private Route Token: ', token)
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
