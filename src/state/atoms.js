import { atom } from 'recoil'
import { FAVORITES_KEY } from '../utils/constants'
import { getStorageItem } from '../utils/storage'

export const cryptoFavoritesList = atom({
  key: 'crypto-favorites',
  default: getStorageItem(FAVORITES_KEY) || [],
})
