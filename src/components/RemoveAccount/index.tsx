import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import { addUser } from '../../Redux/Actions'
import Firebase, { withFirebase } from '../Firebase'
import SnackbarContext from '../Snackbar/Context'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

export interface FirebaseInterface {
  firebase: Firebase
}

export const CustomizedDialogs: React.FC<FirebaseInterface> = ({
  firebase
}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const { userId } = useSelector((state: Record<string, object>) => state.user)
  const { setSnackbarState } = useContext(SnackbarContext)

  const HandleClickOpen = (): void => {
    setOpen(true)
  }

  const HandleClose = (): void => {
    setOpen(false)
  }

  const HandleDelete = (): void => {
    let lastLogin

    if (
      firebase.auth.currentUser &&
      firebase.auth.currentUser.metadata.lastSignInTime
    ) {
      lastLogin = moment(firebase.auth.currentUser.metadata.lastSignInTime)
    }
    const currentDateMinusOneWeek = moment().subtract(1, 'minutes')

    if (lastLogin && lastLogin.isBefore(currentDateMinusOneWeek)) {
      setSnackbarState({
        message: 'To remove your account you to logout and login again.',
        variant: 'error'
      })
    } else {
      firebase
        .locations()
        .child(userId)
        .once('value')
        .then(async snapshot => {
          if (snapshot.exists()) {
            const promises: Array<Promise<void>> = []

            snapshot.forEach(element => {
              if (element.val().downloadURL) {
                promises.push(
                  firebase
                    .firebase()
                    .storage()
                    .refFromURL(element.val().downloadURL)
                    .delete()
                )
              }
            })

            Promise.all(promises).then(() => {
              firebase
                .locations()
                .child(userId)
                .remove()
            })
          }
        })
        .catch(removeError => {
          setSnackbarState({ message: removeError.message, variant: 'error' })
        })

      firebase
        .messages()
        .orderByChild('userId')
        .equalTo(userId)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(element => {
              element.ref.remove()
            })
          }
        })
        .catch(removeError => {
          setSnackbarState({ message: removeError.message, variant: 'error' })
        })
      firebase
        .user(userId)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists() && snapshot.val().downloadURL) {
            firebase
              .firebase()
              .storage()
              .refFromURL(snapshot.val().downloadURL)
              .delete()
          }
        })
        .then(() => {
          firebase.user(userId).remove()
        })
        .catch(removeError => {
          setSnackbarState({ message: removeError.message, variant: 'error' })
        })

      if (firebase.auth.currentUser) {
        firebase.auth.currentUser
          .delete()
          .then(() => {
            dispatch(addUser({ loggedin: false, userName: '', userId: '' }))
            setSnackbarState({
              message: 'Account was deleted!',
              variant: 'error'
            })
          })
          .catch(removeError => {
            setSnackbarState({ message: removeError.message, variant: 'error' })
          })
      }
    }
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        aria-label="Delete Account"
        onClick={HandleClickOpen}
      >
        Delete Account
      </Button>

      <Dialog
        onClose={HandleClose}
        aria-labelledby="delete account"
        open={open}
      >
        <DialogTitle id="delete-account" onClose={HandleClose}>
          Remove Account
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you want to delete your account and all your data?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={HandleDelete} color="secondary">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withFirebase(CustomizedDialogs)
