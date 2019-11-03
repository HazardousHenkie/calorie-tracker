import React, { useEffect } from 'react'

import AuthUserContext from './context'
import Firebase from '../Firebase'

import history from '../../Helpers/History'

import * as routes from '../../constants/routes'

export interface FirebaseInterface {
  firebase: Firebase
}

const withAuthorization = <Props extends object>(
  Component: React.ComponentType<Props>
): React.ComponentType<Props & FirebaseInterface> =>
  class WithAuthorization extends React.Component<Props & FirebaseInterface> {
    render(): React.ReactNode {
      const { firebase, ...props } = this.props

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
  }
// return withFirebase(WithAuthorization)

export default withAuthorization
