import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AuthUserContext from './context'
import { addUser } from '../../Redux/Actions'

import Firebase from '../Firebase'

interface ReduxProvider {
  userId: string
  loggedIn: boolean
}

export interface FirebaseInterface {
  firebase: Firebase
}

const withAuthentication = <Props extends object>(
  Component: React.ComponentType<Props>
): React.ComponentType<Props & FirebaseInterface> =>
  class WithAuthentication extends React.Component<Props & FirebaseInterface> {
    private listener: (() => void) | null = null

    render(): React.ReactNode {
      const { firebase, ...props } = this.props
      const dispatch = useDispatch()
      const [authenticated, setAuthenticated] = useState(false)
      const { userId, loggedIn } = useSelector(
        (state: Record<string, ReduxProvider>) => state.user
      )

      useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(authUser => {
          if (authUser) {
            if (!loggedIn) {
              firebase.user(userId).once('value', snapshot => {
                dispatch(
                  addUser({
                    loggedIn: true,
                    userName: snapshot.val().username,
                    userDescription:
                      snapshot.val().description !== null
                        ? snapshot.val().description
                        : '',
                    countries:
                      snapshot.val().countries !== undefined
                        ? snapshot.val().countries
                        : null,
                    userId: authUser.uid
                  })
                )
              })
            }

            setAuthenticated(true)
          } else {
            dispatch(
              addUser({
                loggedIn: false,
                userName: '',
                userDescription: '',
                userId: '',
                countries: []
              })
            )

            setAuthenticated(false)
          }
        })

        return (): void => {
          listener()
        }
      }, [setAuthenticated, firebase, dispatch, loggedIn, userId])
      return (
        <AuthUserContext.Provider value={authenticated}>
          <Component {...(props as Props)} />
        </AuthUserContext.Provider>
      )
    }
  }

// return withFirebase(WithAuthentication)

export default withAuthentication
