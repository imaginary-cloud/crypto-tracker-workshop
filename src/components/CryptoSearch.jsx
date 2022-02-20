import React, { useEffect, useState } from 'react'
import { useCryptoSearch } from '../hooks/useCryptoSearch'

import SearchInput from './SearchInput'
import CoinSpinner from './CoinSpinner'

function CryptoSearch() {
  const [coin, setcoin] = useState('')
  const [coinsList, setCoinsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCoin = useCryptoSearch()

  useEffect(async () => {
    try {
      setError(null)
      setIsLoading(true)
      const result = await getCoin(coin)
      setIsLoading(false)
      setCoinsList(result)
    } catch (e) {
      setIsLoading(false)
      setError('Error during request for: ', coin)
      setCoinsList([])
    }
  }, [coin])

  return (
    <>
      <SearchInput setCoin={setcoin} />
      {isLoading && <CoinSpinner />}
      {coinsList.map((realCoin) => (
        <span>{realCoin.name}</span>
      ))}
      {error && <span>{error}</span>}
    </>
  )
}

export default CryptoSearch
