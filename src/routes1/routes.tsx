import React from 'react'
import { Switch, Route } from 'react-router-dom'

import * as routes from '../constants/routes'

import Home from '../pages/Home1'
import LogOut from '../pages/LogOut1'
import ForgotPassword from '../pages/forgotPassword'
import SignUp from '../pages/signUp1'
import Error from '../pages/error'

const Routes: React.FC = () => {
  return (
    <div className="Routes">
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.signOut} exact component={LogOut} />
        <Route path={routes.signUp} exact component={SignUp} />
        <Route path={routes.forgotPassword} exact component={ForgotPassword} />
        <Route component={Error} />
      </Switch>
    </div>
  )
}

export default Routes
