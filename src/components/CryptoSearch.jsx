import React, { useEffect, useState } from 'react'
import { useCryptoSearch } from '../hooks/useCryptoSearch'

import SearchInput from './SearchInput'

function CryptoSearch() {
  const [coin, setcoin] = useState('')

  const getCoin = useCryptoSearch()

  useEffect(async () => {
    const result = await getCoin(coin)
    console.log(result)
  }, [coin])

  return <SearchInput setCoin={setcoin} />
}

export default CryptoSearch
