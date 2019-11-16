import React from './node_modules/react'
import Grid from './node_modules/@material-ui/core/Grid'

import Paper from './node_modules/@material-ui/core/Paper'
import { makeStyles } from './node_modules/@material-ui/core/styles'

import ForgotPassword from '../../components/forgotPassword'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const ForgotPasswordPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={5}>
        <div className="sign_up">
          <div className="sign_up__form">
            <Paper className={`${classes.root} center-content`}>
              <ForgotPassword />
            </Paper>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default React.memo(ForgotPasswordPage)
