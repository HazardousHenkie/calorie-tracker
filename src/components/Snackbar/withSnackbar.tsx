import React, { useState } from 'react'

import SnackbarContext, { Snackbar } from './Context'
import CustomSnackbar from './Snackbar'

import Firebase from '../Firebase'

export interface FirebaseInterface {
  firebase: Firebase
}

const withSnackbar = <Props extends object>(
  Component: React.ComponentType<Props>
) =>
  class WithSnackbar extends React.Component<Props & FirebaseInterface> {
    render(): React.ReactNode {
      const [snackbarState, setSnackbarState] = useState<Snackbar>()

      return (
        <SnackbarContext.Provider
          value={{
            snackbarState,
            setSnackbarState
          }}
        >
          {snackbarState.message !== '' && <CustomSnackbar />}

          <Component {...(this.props as Props)} />
        </SnackbarContext.Provider>
      )
    }
  }

export default withSnackbar
