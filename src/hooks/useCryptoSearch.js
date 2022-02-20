import { getSearchCoins } from '../api'

export const useCryptoSearch = () => {
  const getCoin = async (coin) => {
    const { data: result } = await getSearchCoins(coin)
    return result?.currencies || []
  }

  return getCoin
}
