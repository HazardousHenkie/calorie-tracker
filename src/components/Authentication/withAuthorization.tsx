import React, { useEffect } from 'react'

import AuthUserContext from './context'

import { withFirebase, FirebaseProviderProps } from '../Firebase'

import history from '../../Helpers/History'

import * as routes from '../../constants/routes'

const withAuthorization = <Props extends object>(
  Component: React.ComponentType<Props>
) => {
  const WithAuthorization: React.FC<Props & FirebaseProviderProps> = props => {
    const { firebase } = props

    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged(
        authUser => {
          if (!authUser) {
            history.push(routes.home)
          }
        },
        () => history.push(routes.home)
      )

      return (): void => {
        unsubscribe()
      }
    }, [firebase])
    return (
      <AuthUserContext.Consumer>
        {(authenticated): React.ReactNode =>
          authenticated === true ? <Component {...(props as Props)} /> : ''
        }
      </AuthUserContext.Consumer>
    )
  }

  return withFirebase(WithAuthorization)
}

export default withAuthorization
