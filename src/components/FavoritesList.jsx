import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

import { useRecoilValue } from 'recoil'
import { cryptoFavoritesList } from '../state/atoms'
import Title from './Title'
import CryptoCard from './CryptoCard'

const AlignedList = styled('div')({
  display: 'flex',
  margin: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

function FavoritesList() {
  const cryptoFavorites = useRecoilValue(cryptoFavoritesList)

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
