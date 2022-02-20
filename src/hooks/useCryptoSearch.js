import { useQuery } from 'react-query'

import { getSearchCoins } from '../api'

export const useCryptoSearch = (coin) =>
  useQuery(
    ['crypto-search', coin],
    async () => {
      const { data: result } = await getSearchCoins(coin)
      return result?.currencies || []
    },
    {
      enabled: !!coin,
    },
  )
