import React, { useState } from 'react'
import { useCryptoSearch } from '../hooks/useCryptoSearch'

import SearchInput from './SearchInput'
import CoinSpinner from './CoinSpinner'

function CryptoSearch() {
  const [coin, setcoin] = useState('')

  const { isLoading, data: coinsList, error } = useCryptoSearch(coin)

  return (
    <>
      <SearchInput setCoin={setcoin} />
      {isLoading && <CoinSpinner />}
      {coinsList && coinsList.map((realCoin) => <span>{realCoin.name}</span>)}
      {error && <span>{error}</span>}
    </>
  )
}

export default CryptoSearch
