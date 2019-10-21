import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
}

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

class Firebase {
  app: firebase.app.App
  auth: firebase.auth.Auth

  googleProvider: firebase.auth.GoogleAuthProvider

  // private db: object
  // private storage: object
  // private app: object
  // private googleProvider: object

  constructor() {
    this.app = firebase.initializeApp(config)
    this.auth = firebase.auth(this.app)

    this.auth = app.auth()
    this.db = app.database()
    this.storage = app.storage()
    this.app = app
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
  }

  doSignInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
    this.auth.signInWithPopup(this.googleProvider)

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  doSignOut = () => this.auth.signOut()

  user = uid => this.db.ref(`users/${uid}`)

  message = uid => this.db.ref(`messages/${uid}`)

  messages = () => this.db.ref('messages')

  locations = () => this.db.ref('locations')

  imagesUser = () => this.db.ref('images_user')

  getStorage = () => this.storage.ref()

  firebase = () => this.app
}

export default Firebase
