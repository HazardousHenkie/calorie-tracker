import React from 'react'

const FirebaseContext = React.createContext({})

export const withFirebase = <Props extends object>(
  Component: React.ComponentType<Props>
): React.ComponentType<Props> =>
  class WithFirebase extends React.Component<Props> {
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
