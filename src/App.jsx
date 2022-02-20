import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import logo from './logo.svg'
import './App.css'

import colors from './assets/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.white,
    },
    secondary: {
      main: colors.gold,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
