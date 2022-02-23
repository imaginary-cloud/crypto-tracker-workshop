import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

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

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Home />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
