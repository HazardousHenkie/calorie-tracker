import React from 'react'

export interface Snackbar {
  snackbarState: { message: string; variant: string }
  setSnackbarState: React.Dispatch<React.SetStateAction<Snackbar>>
}

const defaultSnackbar = {
  snackbarState: { message: '', variant: '' }
  // setSnackbarState: React.Dispatch<React.SetStateAction<Snackbar>>
}

const SnackbarContext = React.createContext(defaultSnackbar)

export default SnackbarContext
