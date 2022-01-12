import React, { memo, Suspense } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import routerConfig from './router.config'
import NotFound from '../pages/NotFound'
import Spinner from '../components/spinner/Spinner'

function RouterApp () {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routerConfig.map(route => (
          <PrivateRoute key={route.path} {...route} />
        ))}
        <Route
          exact
          path='/not-found'
          render={props => <NotFound {...props} />}
        />
        <Redirect to='/not-found' />
      </Switch>
    </Suspense>
  )
}

export default memo(RouterApp)
