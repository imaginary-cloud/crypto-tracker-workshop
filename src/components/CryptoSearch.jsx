import React, { useEffect, useState } from 'react'
import { useCryptoSearch } from '../hooks/useCryptoSearch'

import SearchInput from './SearchInput'

function CryptoSearch() {
  const [coin, setcoin] = useState('')
  const [coinsList, setCoinsList] = useState([])

  const getCoin = useCryptoSearch()

  useEffect(async () => {
    const result = await getCoin(coin)
    setCoinsList(result)
  }, [coin])

  return (
    <>
      <SearchInput setCoin={setcoin} />
      {coinsList.map((realCoin) => (
        <span>{realCoin.name}</span>
      ))}
    </>
  )
}

export default CryptoSearch
