import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

import { FAVORITES_KEY } from '../utils/constants'
import { getStorageItem } from '../utils/storage'
import Title from './Title'
import CryptoCard from './CryptoCard'

const AlignedList = styled('div')({
  display: 'flex',
  margin: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

function FavoritesList() {
  const cryptoFavorites = getStorageItem(FAVORITES_KEY)

  return (
    <>
      <Title title="My Favorites" secondary />
      <AlignedList>
        {cryptoFavorites.map((crypto) => (
          <CryptoCard key={`fav-${crypto}`} id={crypto} />
        ))}
      </AlignedList>
      {cryptoFavorites?.length === 0 && (
        <Typography variant="h6" color="primary" textAlign="center">
          No favorites added!
        </Typography>
      )}
    </>
  )
}
export default FavoritesList
