import React from 'react'

const SnackbarContext = React.createContext({
  setSnackbarState: Object,
  snackbarState: { message: '', variant: '' }
})

export default SnackbarContext
