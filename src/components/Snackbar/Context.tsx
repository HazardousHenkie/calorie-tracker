import React, { useContext, createContext } from 'react'

interface Snackbar {
  message: string
  variant: string
}

interface SnackbarState {
  snackbar: Snackbar
  setSnackbarState: React.Dispatch<React.SetStateAction<Snackbar>>
}

const defaultSnackbar: Snackbar = {
  message: '',
  variant: ''
}

const defaultSnackbarState: SnackbarState = {
  snackbar: defaultSnackbar,
  setSnackbarState: (): void => {}
}

export const SnackbarContext = createContext<SnackbarState>(
  defaultSnackbarState
)

export const useProfileContext = (): SnackbarState => {
  return useContext(SnackbarContext)
}

// export interface Snackbar {
//   snackbarState: { message: string; variant: string }
//   setSnackbarState: React.Dispatch<React.SetStateAction<Snackbar>>
// }

// const defaultSnackbar = {
//   snackbarState: { message: '', variant: '' }
//   // setSnackbarState: React.Dispatch<React.SetStateAction<Snackbar>>
// }

// const SnackbarContext = React.createContext(defaultSnackbar)

// export default SnackbarContext
