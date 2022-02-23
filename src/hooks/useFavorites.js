import { useMemo, useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { cryptoFavoritesList } from '../state/atoms'
import { setStorageItem } from '../utils/storage'
import { FAVORITES_KEY } from '../utils/constants'

const useFavorites = (id) => {
  const [cryptoFavorites, setCryptoFavorites] =
    useRecoilState(cryptoFavoritesList)

  const isFavorite = useMemo(
    () => !!cryptoFavorites.find((crypto) => crypto === id),
    [cryptoFavorites, id],
  )

  const handleToggle = useCallback(() => {
    const newFav = isFavorite
      ? cryptoFavorites.filter((crypto) => crypto !== id)
      : [...cryptoFavorites, id]

    setCryptoFavorites(newFav)
    setStorageItem(FAVORITES_KEY, newFav)
  }, [cryptoFavorites, id, isFavorite, setCryptoFavorites])

  return [isFavorite, handleToggle]
}

export default useFavorites
