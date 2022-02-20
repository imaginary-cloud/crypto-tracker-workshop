import React, { useEffect, useState } from 'react'
import { useCryptoSearch } from '../hooks/useCryptoSearch'

import SearchInput from './SearchInput'
import CoinSpinner from './CoinSpinner'

function CryptoSearch() {
  const [coin, setcoin] = useState('')
  const [coinsList, setCoinsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCoin = useCryptoSearch()

  useEffect(async () => {
    setIsLoading(true)
    const result = await getCoin(coin)
    setIsLoading(false)
    setCoinsList(result)
  }, [coin])

  return (
    <>
      <SearchInput setCoin={setcoin} />
      {isLoading && <CoinSpinner />}
      {coinsList.map((realCoin) => (
        <span>{realCoin.name}</span>
      ))}
    </>
  )
}

export default CryptoSearch
