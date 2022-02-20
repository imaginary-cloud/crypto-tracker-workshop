import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'

import colors from '../assets/colors'
import CoinSpinner from '../components/CoinSpinner'
import Title from '../components/Title'
import CryptoSearch from '../components/CryptoSearch'

const StyledApp = styled('section')({
  padding: '2rem',
  backgroundColor: colors.darkBlue,
  minHeight: 'calc(100vh - 4rem)',
  textAlign: 'center',
})

function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Just to show our amazing loader!
    setTimeout(() => setIsLoading(false), 600)
  }, [])
  return (
    <StyledApp className="App">
      <Title title="Crypto Tracker" />
      <CryptoSearch />
      {isLoading && <CoinSpinner fullscreen />}
    </StyledApp>
  )
}

export default Home
