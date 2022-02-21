import { useQuery } from 'react-query'

import { getCoin } from '../api'

export const useGetCryptoInfo = (coin) =>
  useQuery(
    ['crypto-detail', coin],
    async () => {
      const { data: result } = await getCoin(coin)
      return result
    },
    {
      // Refetch the data every half second
      refetchInterval: 30000,
      retry: false,
    },
  )
