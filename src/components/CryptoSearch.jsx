import React, { useState } from 'react'
import { styled } from '@mui/system'

import { useCryptoSearch } from '../hooks/useCryptoSearch'
import SearchInput from './SearchInput'
import CoinSpinner from './CoinSpinner'
import CryptoCard from './CryptoCard'
import ErrorMessage from './ErrorMessage'
import EmptyListMessage from './EmptyListMessage'

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
      {coinsList && coinsList.length !== 0 && (
        <AlignedSearch>
          {coinsList.map((currency) => (
            <CryptoCard id={currency.id} data={currency} key={currency.id} />
          ))}
        </AlignedSearch>
      )}
      {coinsList && coinsList.length === 0 && <EmptyListMessage id={coin} />}
      {error && <ErrorMessage id={coin} error={error.message} />}
    </>
  )
}

export default CryptoSearch
