import React from 'react'
import ReactDOM from 'react-dom'

import './main.scss'
import App from './App'

import * as serviceWorker from './serviceWorker'

import { Router } from 'react-router-dom'
import history from './Helpers/History'

import Firebase, {
  FirebaseContext,
  FirebaseContextInterface
} from './components/Firebase'

const FirebaseContextInterfaceLocal: FirebaseContextInterface = {
  value: new Firebase()
}

ReactDOM.render(
  <Router history={history}>
    <FirebaseContext.Provider value={FirebaseContextInterfaceLocal}>
      <App />
    </FirebaseContext.Provider>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
