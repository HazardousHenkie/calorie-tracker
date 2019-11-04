import React from 'react'
import Firebase from './Firebase'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

const FirebaseContext = React.createContext({})

type FirebaseProviderProps = {
  firebase: Firebase
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  firebase,
  children
}) => (
  <FirebaseContext.Provider value={firebase}>
    {children}
  </FirebaseContext.Provider>
)

type WithFirebaseProps = {
  firebase: Firebase
}

// check displayname error
export const withFirebase = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof WithFirebaseProps>> => props => (
  <FirebaseContext.Consumer>
    {(firebase): React.ReactNode => (
      <Component {...(props as P)} firebase={firebase} />
    )}
  </FirebaseContext.Consumer>
)

// import { Subtract } from 'utility-types'
// import Firebase from './Firebase'

// const FirebaseContext = React.createContext({})

// interface FirebaseProp {
//   firebase: Firebase
// }

// // export const withFirebase = <Props extends FirebaseProp>(
//   Component: React.ComponentType<Props>
// ) =>
//   class WithFirebase extends React.Component<
//     Subtract<Props, FirebaseProp>,
//     MakeCounterState
//   >
//     render(): React.ReactNode {
//       return (
//         <FirebaseContext.Consumer>
//           {(firebase): React.ReactNode => (
//             <Component {...(this.props as Props)} firebase={firebase} />
//           )}
//         </FirebaseContext.Consumer>
//       )
//     }
//   }

export default FirebaseContext
