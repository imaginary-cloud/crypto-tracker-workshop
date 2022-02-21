import React, { useState } from 'react'
import { styled } from '@mui/system'

import { useCryptoSearch } from '../hooks/useCryptoSearch'
import SearchInput from './SearchInput'
import CoinSpinner from './CoinSpinner'
import CryptoCard from './CryptoCard'

const AlignedSearch = styled('div')({
  display: 'flex',
  margin: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

function CryptoSearch() {
  const [coin, setcoin] = useState('')

  const { isLoading, data: coinsList, error } = useCryptoSearch(coin)

  return (
    <>
      <SearchInput setCoin={setcoin} />
      {isLoading && <CoinSpinner />}
      {coinsList && (
        <AlignedSearch>
          {coinsList.map((currency) => (
            <CryptoCard id={currency.id} data={currency} key={currency.id} />
          ))}
        </AlignedSearch>
      )}
      {error && <span>{error}</span>}
    </>
  )
}

export default CryptoSearch
