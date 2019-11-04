import React from 'react'
import Firebase from './Firebase'

const FirebaseContext = React.createContext({})

interface FirebaseProps {
  firebase: Firebase
}

export const withFirebase = <Props extends { firebase: Firebase }>(
  Component: React.ComponentType<Props & FirebaseProps>
): React.ComponentType<Props & FirebaseProps> =>
  class WithFirebase extends React.Component<Props & FirebaseProps> {
    render(): React.ReactNode {
      return (
        <FirebaseContext.Consumer>
          {(firebase): React.ReactNode => (
            <Component {...this.props} firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
      )
    }
  }

export default FirebaseContext
