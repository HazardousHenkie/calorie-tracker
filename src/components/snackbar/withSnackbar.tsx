import React, { useState } from 'react'

import { SnackbarContext } from './Context2'
import CustomSnackbar from './Snackbar2'

const withSnackbar = <Props extends object>(
  Component: React.ComponentType<Props>
): React.FC<Props> => {
  const WithSnackbar: React.FC<Props> = props => {
    const [snackbarState, setSnackbarState] = useState({
      message: '',
      variant: ''
    })

    return (
      <SnackbarContext.Provider
        value={{
          snackbarState,
          setSnackbarState
        }}
      >
        {snackbarState.message !== '' && <CustomSnackbar />}

        <Component {...(props as Props)} />
      </SnackbarContext.Provider>
    )
  }

  return WithSnackbar
}

export default withSnackbar
