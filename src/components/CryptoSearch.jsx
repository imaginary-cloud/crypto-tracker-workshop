import React, { useEffect, useState } from 'react'

import SearchInput from './SearchInput'

function CryptoSearch() {
  const [coin, setcoin] = useState('')

  useEffect(() => {
    console.log('searched coin: ', coin)
  }, [coin])

  return <SearchInput setCoin={setcoin} />
}

export default CryptoSearch
