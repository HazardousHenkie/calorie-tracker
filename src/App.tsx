import React from 'react'

import { Router } from 'react-router-dom'
import Routes from './routes/Routes'
import history from './Helpers/History'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { WithAuthentication } from './components/Authentication'

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#343434'
    }
  }
})

theme = responsiveFontSizes(theme)

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Router history={history}>
        <div className="content">
          <ThemeProvider theme={theme}>
            <Container fixed>
              <Routes />
            </Container>
          </ThemeProvider>
        </div>
      </Router>
    </div>
  )
}

export default WithAuthentication(App)
