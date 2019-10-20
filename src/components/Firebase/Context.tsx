import React from 'react'

export interface FirebaseContextInterface {
  value: object
}

const FirebaseContext = React.createContext<FirebaseContextInterface | null>(
  null
)

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
