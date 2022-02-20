import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import './App.css'
import colors from './assets/colors'
import Home from './pages/Home'

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
      <Home />
    </ThemeProvider>
  )
}

export default App
